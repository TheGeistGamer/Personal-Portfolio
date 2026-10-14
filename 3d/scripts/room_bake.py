# Bake + export helpers for the room. Run inside Blender, then call the step you need:
#   bake_ao()        AO into vertex colours for new props
#   bake_floor()     2K diffuse lightmap for room_floor_inner
#   bake_walls()     1K AO lightmaps for the two walls
#   finalize_export()  bake colour*lightmap into textures, export GLB
import bpy, bmesh, os, numpy as np
from mathutils import Vector

D = bpy.data
sc = bpy.context.scene
ROOT = '/Volumes/ack - ssd/Proyectos/Portafolio Personal'
BAKE = f'{ROOT}/bake'
os.makedirs(BAKE, exist_ok=True)


def _select(objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


def bake_ao(prefixes=('det_', 'rm_', 'mug_', 'plant_', 'shf_pot')):
    targets = [o for o in sc.objects if o.type == 'MESH' and not o.hide_render and o.name.startswith(prefixes)]
    for o in targets:
        if o.data.users > 1:
            o.data = o.data.copy()
        bpy.context.view_layer.objects.active = o
        for m in list(o.modifiers):
            bpy.ops.object.modifier_apply(modifier=m.name)
        ca = o.data.color_attributes.get('bake_ao') or o.data.color_attributes.new('bake_ao', 'BYTE_COLOR', 'POINT')
        o.data.color_attributes.active_color = ca
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 48; sc.render.bake.target = 'VERTEX_COLORS'
    _select(targets)
    bpy.ops.object.bake(type='AO')
    sc.render.engine = 'BLENDER_EEVEE'
    return len(targets)


def _lightmap(o, size, axes=None):
    me = o.data
    uv = me.uv_layers.get('lightmap') or me.uv_layers.new(name='lightmap')
    me.uv_layers.active = uv
    if axes:  # planar projection along two world axes
        bm = bmesh.new(); bm.from_mesh(me); L = bm.loops.layers.uv['lightmap']
        a, b = axes; ws = [o.matrix_world @ v.co for v in bm.verts]
        mn = [min(w[i] for w in ws) for i in (a, b)]; mx = [max(w[i] for w in ws) for i in (a, b)]
        perp = 3 - a - b  # axis the projection looks along
        inside = Vector((0, 0, 5))  # a point inside the room
        for f in bm.faces:
            n = o.matrix_world.to_3x3() @ f.normal
            c = o.matrix_world @ f.calc_center_median()
            # Only the face looking into the room gets texture space; the outer face,
            # edges and caps collapse into one corner so they can't overwrite it.
            faces_in = abs(n[perp]) > 0.9 and n[perp] * (inside[perp] - c[perp]) > 0
            for l in f.loops:
                if not faces_in:
                    l[L].uv = (0.999, 0.999)
                    continue
                w = o.matrix_world @ l.vert.co
                l[L].uv = (0.005 + 0.99 * (w[a] - mn[0]) / (mx[0] - mn[0]), 0.005 + 0.99 * (w[b] - mn[1]) / (mx[1] - mn[1]))
        bm.to_mesh(me); bm.free()
    # Float buffer: bright areas must not clip at 1.0 before we pick the exposure.
    img = D.images.get(f'lm_{o.name}')
    if img and not img.is_float:
        D.images.remove(img); img = None
    img = img or D.images.new(f'lm_{o.name}', size, size, float_buffer=True)
    nt = o.data.materials[0].node_tree
    # A previous finalize wired the texture into Base Color; unplug it or the bake
    # reads its own output (circular dependency).
    b = next(x for x in nt.nodes if x.type == 'BSDF_PRINCIPLED')
    for l in list(b.inputs['Base Color'].links):
        nt.links.remove(l)
    n = nt.nodes.get('LM') or nt.nodes.new('ShaderNodeTexImage')
    n.name = 'LM'; n.image = img; nt.nodes.active = n
    return img


def _bake_images(objs, kind, samples):
    sc.render.engine = 'CYCLES'; sc.cycles.samples = samples
    b = sc.render.bake; b.target = 'IMAGE_TEXTURES'; b.margin = 8
    b.use_pass_direct = True; b.use_pass_indirect = True; b.use_pass_color = False
    _select(objs)
    bpy.ops.object.bake(type=kind)
    sc.render.engine = 'BLENDER_EEVEE'


def bake_floor():
    o = D.objects['room_floor_inner']
    img = _lightmap(o, 2048)
    _bake_images([o], 'DIFFUSE', 256)
    img.filepath_raw = f'{BAKE}/lm_room_floor_inner.exr'; img.file_format = 'OPEN_EXR'; img.save()


def bake_walls(kind='DIFFUSE'):
    wb, ws = D.objects['room_wall_back'], D.objects['room_wall_side']
    imgs = [_lightmap(wb, 1024, (0, 2)), _lightmap(ws, 1024, (1, 2))]
    _bake_images([wb, ws], kind, 192)
    for o, img in zip((wb, ws), imgs):
        img.filepath_raw = f'{BAKE}/lm_{o.name}.exr'; img.file_format = 'OPEN_EXR'; img.save()


GLOW = ('path_', 'bead_', 'port_')
SKIP = ('room_',)


def light_targets():
    """Every visible mesh that should carry baked light in its vertex colours."""
    out = []
    for o in sc.objects:
        if o.type != 'MESH' or o.hide_render or o.name.startswith(GLOW + SKIP):
            continue
        if any(m and m.name in ('mat_accent_glow', 'mat_glass') for m in o.data.materials):
            continue
        out.append(o)
    return sorted(out, key=lambda o: o.name)


def bake_light_vertex(batch=0, size=120):
    """Bake direct+indirect diffuse light (no albedo) into a float colour attribute."""
    targets = light_targets()[batch * size:(batch + 1) * size]
    if not targets:
        return 0
    for o in targets:
        if o.data.users > 1:
            o.data = o.data.copy()
        bpy.context.view_layer.objects.active = o
        for m in list(o.modifiers):
            bpy.ops.object.modifier_apply(modifier=m.name)
        ca = o.data.color_attributes.get('bake_light_f') or o.data.color_attributes.new('bake_light_f', 'FLOAT_COLOR', 'POINT')
        o.data.color_attributes.active_color = ca
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 96
    b = sc.render.bake; b.target = 'VERTEX_COLORS'
    b.use_pass_direct = True; b.use_pass_indirect = True; b.use_pass_color = False
    _select(targets)
    bpy.ops.object.bake(type='DIFFUSE')
    sc.render.engine = 'BLENDER_EEVEE'
    return len(targets)


def light_scale():
    """One exposure for the whole room, taken from the floor lightmap (95th percentile -> 1.0)."""
    lm = D.images['lm_room_floor_inner']
    px = np.array(lm.pixels[:], dtype=np.float32).reshape(-1, 4)[:, :3].mean(1)
    k = 0.92 / max(float(np.percentile(px, 95)), 1e-3)
    sc['light_scale'] = k
    return k


def pack_light():
    """Scale the float bake into an 8-bit attribute the glTF exporter writes as COLOR_0."""
    k = sc.get('light_scale') or light_scale()
    for o in light_targets():
        f = o.data.color_attributes.get('bake_light_f')
        if not f:
            continue
        c = np.empty(len(f.data) * 4, dtype=np.float32); f.data.foreach_get('color', c)
        c = c.reshape(-1, 4); c[:, :3] = np.clip(c[:, :3] * k, 0, 1); c[:, 3] = 1
        bl = o.data.color_attributes.get('bake_light') or o.data.color_attributes.new('bake_light', 'BYTE_COLOR', 'POINT')
        bl.data.foreach_set('color', c.ravel())
        o.data.color_attributes.active_color = bl
        o.data.color_attributes.render_color_index = o.data.color_attributes.active_color_index


def _finalize(objname, gain=1.0):
    o = D.objects[objname]; lm = D.images[f'lm_{objname}']; w, h = lm.size
    px = np.array(lm.pixels[:], dtype=np.float32).reshape(h, w, 4)
    nt = o.data.materials[0].node_tree
    b = next(x for x in nt.nodes if x.type == 'BSDF_PRINCIPLED')
    base = np.array(b.inputs['Base Color'].default_value[:3], dtype=np.float32)
    k = sc.get('light_scale') or 1.0
    fin = px.copy(); fin[..., :3] = np.clip(px[..., :3] * base * k * gain, 0, 1); fin[..., 3] = 1
    name = f'tex_{objname}'
    img = D.images.get(name) or D.images.new(name, w, h)
    if tuple(img.size) != (w, h):
        img.scale(w, h)
    img.pixels.foreach_set(fin.ravel())
    img.filepath_raw = f'{BAKE}/{name}.png'; img.file_format = 'PNG'; img.save()
    tn = nt.nodes['LM']; tn.image = img
    uvn = nt.nodes.get('UVLM') or nt.nodes.new('ShaderNodeUVMap'); uvn.name = 'UVLM'; uvn.uv_map = 'lightmap'
    nt.links.new(uvn.outputs['UV'], tn.inputs['Vector']); nt.links.new(tn.outputs['Color'], b.inputs['Base Color'])


def finalize_export(path=f'{ROOT}/export/portfolio_scene.glb'):
    light_scale()
    pack_light()
    # Walls get less direct light than the floor; lift them so the room reads light.
    for n, gain in (('room_floor_inner', 1.0), ('room_wall_back', 1.35), ('room_wall_side', 1.35)):
        _finalize(n, gain)
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.export_scene.gltf(
        filepath=path, export_format='GLB', use_visible=True, export_apply=True,
        export_cameras=True, export_lights=False, export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6, export_image_format='WEBP', export_yup=True,
        export_vertex_color='ACTIVE',
    )
    return round(os.path.getsize(path) / 1e6, 2)
