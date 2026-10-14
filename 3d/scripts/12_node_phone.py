"""Etapa 2.3: node_phone (ejecutar dentro de Blender)."""
import bpy, bmesh, math, mathutils
from mathutils import Vector

def srgb(h):
    c = [int(h[i:i+2], 16)/255 for i in (1, 3, 5)]
    f = lambda v: v/12.92 if v <= 0.04045 else ((v+0.055)/1.055)**2.4
    return (*[f(v) for v in c], 1)

m_clay, m_dark, m_acc = (bpy.data.materials[k] for k in ("mat_clay", "mat_clay_dark", "mat_accent"))
m_screen = bpy.data.materials.get("mat_screen") or bpy.data.materials.new("mat_screen")
m_screen.use_nodes = True; nt = m_screen.node_tree; nt.nodes.clear()
o_ = nt.nodes.new("ShaderNodeOutputMaterial"); b_ = nt.nodes.new("ShaderNodeBsdfPrincipled")
b_.inputs["Base Color"].default_value = srgb("#262C3F"); b_.inputs["Roughness"].default_value = 0.55
b_.inputs["Metallic"].default_value = 0
nt.links.new(b_.outputs[0], o_.inputs[0])

KEY = "phone"; POS = (0, -5, 0); TOP = 0.6; ANG = math.radians(-25)
coll = bpy.data.collections["node_phone"]
for suf in ("", "_base", "_body", "_screen", "_ui", "_accent"):
    o = bpy.data.objects.get(f"node_phone{suf}")
    if o: bpy.data.objects.remove(o, do_unlink=True)

def deselect():
    for o in bpy.context.view_layer.objects: o.select_set(False)

def rrect(name, w, h, d, R, bevel, mat, x, z, y_front, n=9, seg=4):
    """Rectangulo redondeado en plano XZ, grosor d hacia -Y desde y_front (cara trasera en y_front). Rotado ANG sobre el eje Z."""
    pts = []
    for cx, cz, a0 in ((w/2-R, h/2-R, 0), (-w/2+R, h/2-R, 90), (-w/2+R, -h/2+R, 180), (w/2-R, -h/2+R, 270)):
        for i in range(n):
            a = math.radians(a0 + i*90/(n-1))
            pts.append((cx + R*math.cos(a), cz + R*math.sin(a)))
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new((px, 0, pz)) for px, pz in pts]
    f = bm.faces.new(vs)
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    ext = [e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, -d, 0), verts=ext)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o)
    v = Vector((x, y_front, z)); v.rotate(mathutils.Euler((0, 0, ANG)))
    o.location = v; o.rotation_euler = (0, 0, ANG)
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bv = o.modifiers.new("bevel", 'BEVEL'); bv.width = bevel; bv.segments = seg; bv.limit_method = 'NONE'
    bpy.ops.object.modifier_apply(modifier="bevel")
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))
    return o

def join(name, parts):
    deselect()
    for p in parts: p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    if len(parts) > 1: bpy.ops.object.join()
    o = bpy.context.active_object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o

W, H, DEP = 1.75, 3.2, 0.42
z0 = TOP + 0.12; zc = z0 + H/2
# cuerpo: cara trasera en y=+DEP/2, frontal en y=-DEP/2
body = rrect("p_body", W, H, DEP, 0.5, 0.12, m_clay, 0, zc, DEP/2)
FY = -DEP/2                                  # cara frontal del cuerpo
screen = rrect("p_screen", W-0.26, H-0.26, 0.06, 0.38, 0.025, m_screen, 0, zc, FY + 0.02)
UY = FY - 0.04                               # plano de la UI sobre la pantalla
ui = []
top = zc + (H-0.26)/2
ui.append(rrect("u_pill", 0.5, 0.11, 0.03, 0.055, 0.012, m_dark, 0, top - 0.3, UY, n=5, seg=2))          # isla/notch
ui.append(rrect("u_avatar", 0.36, 0.36, 0.03, 0.18, 0.012, m_dark, -0.42, top - 0.85, UY, n=5, seg=2))
ui.append(rrect("u_line1", 0.62, 0.1, 0.03, 0.05, 0.012, m_dark, 0.2, top - 0.76, UY, n=5, seg=2))
ui.append(rrect("u_line2", 0.42, 0.1, 0.03, 0.05, 0.012, m_dark, 0.1, top - 0.95, UY, n=5, seg=2))
ui.append(rrect("u_card1", 1.22, 0.62, 0.03, 0.14, 0.012, m_clay, 0, zc - 0.15, UY, n=5, seg=2))
ui.append(rrect("u_card2", 1.22, 0.62, 0.03, 0.14, 0.012, m_clay, 0, zc - 0.95, UY, n=5, seg=2))
ui.append(rrect("u_c1line", 0.7, 0.09, 0.03, 0.045, 0.01, m_dark, -0.22, zc - 0.05, UY - 0.03, n=5, seg=2))
acc = [rrect("u_btn", 0.5, 0.15, 0.03, 0.075, 0.012, m_acc, -0.3, zc - 1.1, UY - 0.03, n=5, seg=2)]

root = bpy.data.objects.new("node_phone", None); root.empty_display_type = 'PLAIN_AXES'
coll.objects.link(root); root.location = POS
ped = bpy.data.objects["kit_pedestal"]
base = bpy.data.objects.new("node_phone_base", ped.data); coll.objects.link(base); base.parent = root
for suffix, parts in (("body", [body]), ("screen", [screen]), ("ui", ui), ("accent", acc)):
    o = join(f"node_phone_{suffix}", parts); o.parent = root; o.location = (0, 0, 0)
tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
print({s: tris(bpy.data.objects[f"node_phone_{s}"]) for s in ("base", "body", "screen", "ui", "accent")})
