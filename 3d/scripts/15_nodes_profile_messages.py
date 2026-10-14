"""Etapa 2.6: isla mas grande + node_profile + node_messages (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())

# ---- isla mas grande (24 m) ----
old = bpy.data.objects.get("kit_island")
if old: bpy.data.objects.remove(old, do_unlink=True)
kit = bpy.data.collections["kit"]
def kbox(name, s, h, bw, mat, z):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= s; v.co.y *= s; v.co.z = (v.co.z + .5) * h
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); kit.objects.link(o); o.location = (0, 0, z); smooth(o, bw, 5); return o
isl = join("kit_island", [kbox("i1", 24, 0.8, 0.3, m_clay, -0.8), kbox("i2", 23, 0.5, 0.2, m_dark, -1.3), kbox("i3", 13, 1.2, 0.45, m_dark, -2.5)])
isl.parent = None

# ================= Perfil =================
key = "node_profile"; clean(key); c = bpy.data.collections.get(key) or assemble(key, None, None)
W, H, DEP = 2.3, 2.9, 0.4; zc = TOP + 0.12 + H/2; FY = -DEP/2
body = rrect(c, "pf_body", W, H, DEP, 0.55, 0.12, m_clay, 0, zc, DEP/2)
screen = rrect(c, "pf_screen", W-0.28, H-0.28, 0.06, 0.4, 0.025, m_screen, 0, zc, FY + 0.02)
UY = FY - 0.04; top = zc + (H-0.28)/2; ui = []
ui.append(circle(c, "pf_avatar", 1.0, m_clay, 0, top - 0.75, UY, 0.03, 0.012, 20))
ui.append(circle(c, "pf_head", 0.32, m_dark, 0, top - 0.64, UY - 0.03, 0.03, 0.01, 12))
ui.append(rrect(c, "pf_body2", 0.6, 0.3, 0.03, 0.15, 0.01, m_dark, 0, top - 0.98, UY - 0.03, 8, 2))
ui.append(rrect(c, "pf_name", 1.2, 0.16, 0.03, 0.08, 0.012, m_clay, 0, top - 1.55, UY, 5, 2))
ui.append(rrect(c, "pf_role", 0.8, 0.1, 0.03, 0.05, 0.01, m_dark, 0, top - 1.8, UY, 5, 2))
for i in (-1, 0, 1):
    ui.append(rrect(c, "pf_chip", 0.4, 0.17, 0.03, 0.085, 0.01, m_dark, i*0.46, top - 2.1, UY, 5, 2))
acc = [circle(c, "pf_status", 0.2, m_acc, 0.42, top - 1.1, UY - 0.04, 0.03, 0.01, 12)]
finish(key, c, (-5.2, 5.2, 0), {"body": [body], "screen": [screen], "ui": ui, "accent": acc})

# ================= Mensajes =================
key = "node_messages"; clean(key); c = bpy.data.collections.get(key) or assemble(key, None, None)
DEP = 0.45; FY = -DEP/2; z0 = TOP + 0.12
bw, bh = 2.7, 1.65; bz = z0 + 0.4 + bh/2
big = rrect(c, "ms_big", bw, bh, DEP, 0.65, 0.13, m_clay, -0.1, bz, DEP/2)
tail = extrude_poly(c, "ms_tail", [(-0.5, bh/2 - 0.2), (0.3, bh/2 - 0.2), (-0.7, -0.5)], DEP - 0.1, m_clay, 0.06, -0.1, bz - bh/2 + 0.0, DEP/2 - 0.05, 3)
tail.location = None or tail.location
UY = FY - 0.0; ui = []
for i, w in enumerate((1.7, 1.3, 0.8)):
    ui.append(rrect(c, "ms_l", w, 0.12, 0.04, 0.06, 0.015, m_dark, -0.1 - (1.7 - w)/2 - 0.1, bz + 0.45 - i*0.28, UY, 5, 2))
sm_w, sm_h = 1.5, 0.9; sz = z0 + 0.15 + sm_h/2
small = rrect(c, "ms_small", sm_w, sm_h, 0.3, 0.4, 0.09, m_screen, 0.65, sz, FY - 0.02)
tail2 = extrude_poly(c, "ms_tail2", [(0.1, sm_h/2 - 0.1), (0.7, sm_h/2 - 0.1), (0.85, -0.45)], 0.2, m_screen, 0.05, 0.65, sz - sm_h/2 + 0.45, FY - 0.04, 3) if False else None
acc = [circle(c, "ms_dot", 0.2, m_acc, 0.65 + (i-1)*0.34, sz, FY - 0.02 - 0.3, 0.03, 0.01, 12) for i in range(3)]
finish(key, c, (-10, 0, 0), {"body": [big, tail], "screen": [small], "ui": ui, "accent": acc})
