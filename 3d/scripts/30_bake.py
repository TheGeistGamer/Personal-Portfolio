"""Etapa 3b: hornear iluminacion (vertex colors en nodos + textura de suelo). Headless:
   Blender -b portfolio_v08_light.blend --python 30_bake.py -- salida.blend carpeta_texturas"""
import bpy, sys, math, time
out_blend, tex_dir = sys.argv[sys.argv.index("--") + 1: sys.argv.index("--") + 3]
SAMPLES = int(__import__("os").environ.get("BAKE_SAMPLES", "128"))
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = False
sc.cycles.device = 'CPU'
sc.render.bake.use_pass_direct = True; sc.render.bake.use_pass_indirect = True; sc.render.bake.use_pass_color = True
sc.render.bake.use_pass_emit = True   # pantallas del monitor emiten luz suave (los acentos *_accent no se hornean)
sc.cycles.bake_type = 'COMBINED'
sc.render.bake.margin = 8

def only(o):
    for x in bpy.context.view_layer.objects: x.select_set(False)
    bpy.context.view_layer.objects.active = o; o.select_set(True)

# ---------- suelo: plano sobre la cara superior de la isla ----------
S2 = math.sqrt(2); VC, VL = 2.75, 42.0
old = bpy.data.objects.get("island_top")
if old: bpy.data.objects.remove(old, do_unlink=True)
W_, L_ = 14 - 0.6, VL - 0.6
me = bpy.data.meshes.new("island_top")
me.from_pydata([(-W_/2, -L_/2, 0), (W_/2, -L_/2, 0), (W_/2, L_/2, 0), (-W_/2, L_/2, 0)], [], [(0, 1, 2, 3)])
me.uv_layers.new(name="UVMap")
for loop, uv in zip(me.polygons[0].loop_indices, ((0, 0), (1, 0), (1, 1), (0, 1))): me.uv_layers[0].data[loop].uv = uv
top = bpy.data.objects.new("island_top", me); bpy.data.collections["kit"].objects.link(top)
top.rotation_euler = (0, 0, -math.pi/4); top.location = (VC/S2, VC/S2, 0.003)
IMG_W, IMG_H = 1024, 3072
img = bpy.data.images.new("island_bake", IMG_W, IMG_H, float_buffer=False)
mat = bpy.data.materials.new("mat_island_top"); mat.use_nodes = True; nt = mat.node_tree; nt.nodes.clear()
o_ = nt.nodes.new("ShaderNodeOutputMaterial"); b_ = nt.nodes.new("ShaderNodeBsdfPrincipled")
b_.inputs["Base Color"].default_value = bpy.data.materials["mat_clay"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value if "Principled BSDF" in bpy.data.materials["mat_clay"].node_tree.nodes else (0.93, 0.94, 0.96, 1)
b_.inputs["Roughness"].default_value = 0.85
tn = nt.nodes.new("ShaderNodeTexImage"); tn.image = img; tn.select = True; nt.nodes.active = tn
nt.links.new(b_.outputs[0], o_.inputs[0]); me.materials.append(mat)
t0 = time.time(); sc.render.bake.target = 'IMAGE_TEXTURES'
only(top); bpy.ops.object.bake(type='COMBINED')
img.filepath_raw = f"{tex_dir}/island_bake.png"; img.file_format = 'PNG'; img.save()
print("island bake", round(time.time() - t0, 1), "s")

# ---------- nodos: vertex colors ----------
for o in list(bpy.data.objects):          # mallas compartidas -> unicas (cada instancia recibe su propia sombra)
    if o.type == 'MESH' and o.data.users > 1: o.data = o.data.copy()
sc.render.bake.target = 'VERTEX_COLORS'
done = 0
for o in bpy.data.objects:
    if o.type != 'MESH' or o.name in ("island_top",) or o.hide_render or o.name.endswith("_accent"):
        continue
    ca = o.data.color_attributes.get("bake") or o.data.color_attributes.new("bake", 'FLOAT_COLOR', 'POINT')
    o.data.color_attributes.active_color = ca
    only(o); bpy.ops.object.bake(type='COMBINED'); done += 1
print("baked objects", done, "total", round(time.time() - t0, 1), "s")
bpy.ops.wm.save_as_mainfile(filepath=out_blend)
print("SAVED", out_blend)
