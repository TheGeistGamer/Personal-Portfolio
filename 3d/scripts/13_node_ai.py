"""Etapa 2.4: node_ai (ejecutar dentro de Blender)."""
import bpy, bmesh, math

m_clay, m_dark, m_acc, m_screen = (bpy.data.materials[k] for k in ("mat_clay", "mat_clay_dark", "mat_accent", "mat_screen"))
TOP = 0.6; POS = (5.2, -5.2, 0)
coll = bpy.data.collections["node_ai"]
for suf in ("", "_base", "_body", "_die", "_accent"):
    o = bpy.data.objects.get(f"node_ai{suf}")
    if o: bpy.data.objects.remove(o, do_unlink=True)

def deselect():
    for o in bpy.context.view_layer.objects: o.select_set(False)

def bevel(o, w, seg=5):
    bv = o.modifiers.new("bevel", 'BEVEL'); bv.width = w; bv.segments = seg; bv.limit_method = 'NONE'
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.modifier_apply(modifier="bevel")
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))
    return o

def box(name, sx, sy, sz, w, mat, loc):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * sz
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = loc
    return bevel(o, w)

def sparkle(name, R, d, mat, loc):
    """Chispa de 4 puntas (simbolo de IA), extruida hacia +Z."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    pts = []
    c, sn = math.cos(math.pi/4), math.sin(math.pi/4)      # girada 45 deg: se ve como + en la camara isometrica
    for i in range(96):
        t = i*2*math.pi/96
        x, y = R*math.cos(t)**3, R*math.sin(t)**3          # astroide: estrella de 4 puntas
        pts.append((x*c - y*sn, x*sn + y*c))
    f = bm.faces.new([bm.verts.new((x, y, 0)) for x, y in pts])
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, d), verts=[e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = loc
    return bevel(o, 0.035, 3)

def join(name, parts):
    deselect()
    for p in parts: p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    if len(parts) > 1: bpy.ops.object.join()
    o = bpy.context.active_object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o

CH = 2.1; CZ = TOP + 0.14; CT = 0.55
parts = [box("c_body", CH, CH, CT, 0.2, m_clay, (0, 0, CZ))]
for side in (-1, 1):
    for i in (-0.6, 0, 0.6):
        parts.append(box("c_pinx", 0.62, 0.2, 0.2, 0.07, m_dark, (side*(CH/2 + 0.14), i, CZ + 0.17)))
        parts.append(box("c_piny", 0.2, 0.62, 0.2, 0.07, m_dark, (i, side*(CH/2 + 0.14), CZ + 0.17)))
die = box("c_die", 1.5, 1.5, 0.12, 0.05, m_screen, (0, 0, CZ + CT - 0.02))
spark = sparkle("c_spark", 0.6, 0.1, m_acc, (0, 0, CZ + CT + 0.08))

root = bpy.data.objects.new("node_ai", None); root.empty_display_type = 'PLAIN_AXES'
coll.objects.link(root); root.location = POS
base = bpy.data.objects.new("node_ai_base", bpy.data.objects["kit_pedestal"].data); coll.objects.link(base); base.parent = root
for suffix, ps in (("body", parts), ("die", [die]), ("accent", [spark])):
    o = join(f"node_ai_{suffix}", ps); o.parent = root; o.location = (0, 0, 0)
tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
print({s: tris(bpy.data.objects[f"node_ai_{s}"]) for s in ("base", "body", "die", "accent")})
