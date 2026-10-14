"""Etapa 2.7: node_api + isla en banda + distribucion final (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())
S2 = math.sqrt(2)

# ================= node_api =================
key = "node_api"; clean(key); c = bpy.data.collections.get(key) or assemble(key, None, None)
W, H, DEP = 2.7, 2.2, 0.4; zc = TOP + 0.12 + H/2; FY = -DEP/2
body = rrect(c, "a_body", W, H, DEP, 0.5, 0.12, m_clay, 0, zc, DEP/2)
screen = rrect(c, "a_screen", W-0.28, H-0.28, 0.06, 0.34, 0.025, m_screen, 0, zc, FY + 0.02)
UY = FY - 0.04; top = zc + (H-0.28)/2; ui = []
ui.append(rrect(c, "a_code", 0.5, 0.17, 0.03, 0.085, 0.012, m_clay, -0.78, top - 0.3, UY, 5, 2))
ui.append(rrect(c, "a_url", 1.1, 0.1, 0.03, 0.05, 0.01, m_dark, 0.25, top - 0.3, UY, 5, 2))
ui.append(rrect(c, "a_l1", 1.5, 0.1, 0.03, 0.05, 0.01, m_dark, -0.2, zc - 0.78, UY, 5, 2))
ui.append(rrect(c, "a_l2", 0.9, 0.1, 0.03, 0.05, 0.01, m_dark, -0.5, zc - 0.96, UY, 5, 2))

def seg(pts, k=8):
    out = []
    for (x0, z0), (x1, z1) in zip(pts, pts[1:]):
        out += [(x0 + (x1-x0)*i/k, z0 + (z1-z0)*i/k) for i in range(k)]
    return out + [pts[-1]]
SYMBOL = (("a_lt", [(-0.42, 0.36), (-0.74, 0.0), (-0.42, -0.36)]),
          ("a_gt", [(0.42, 0.36), (0.74, 0.0), (0.42, -0.36)]),
          ("a_sl", [(0.15, 0.44), (-0.15, -0.44)]))
braces = []
for nm, raw in SYMBOL:
    cu = bpy.data.curves.new(nm, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.075; cu.bevel_resolution = 6
    cu.use_fill_caps = True
    pts = seg(raw); sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
    for i, (px, pz) in enumerate(pts): sp.points[i].co = (px, 0, pz, 1)
    o = bpy.data.objects.new(nm, cu); c.objects.link(o); place(o, 0, UY - 0.03, zc + 0.02)
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o = bpy.context.active_object
    o.data.materials.append(m_acc); smooth(o, 0, 0); braces.append(o)
finish(key, c, (0, 0, 0), {"body": [body], "screen": [screen], "ui": ui, "accent": braces})

# ================= isla en banda =================
old = bpy.data.objects.get("kit_island")
if old: bpy.data.objects.remove(old, do_unlink=True)
kit = bpy.data.collections["kit"]
def kbox(name, sx, sy, h, bw, mat, z):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * h
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); kit.objects.link(o); o.location = (0, 0, z); smooth(o, bw, 5); return o
VC, VL = 2.75, 42.0     # centro y largo de la banda sobre el eje de profundidad
isl = join("kit_island", [kbox("i1", 14, VL, 0.8, 0.3, m_clay, -0.8), kbox("i2", 13, VL - 1, 0.5, 0.2, m_dark, -1.3), kbox("i3", 7, VL - 12, 1.2, 0.45, m_dark, -2.5)])
isl.rotation_euler = (0, 0, -math.pi/4); deselect(); isl.select_set(True); bpy.context.view_layer.objects.active = isl
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
isl.location = (VC/S2, VC/S2, 0)

# ================= distribucion final (u = derecha en pantalla, v = profundidad) =================
LAYOUT = {
    "node_phone": (0, -14),
    "node_profile": (-3, -7), "node_ai": (3, -7),
    "node_api": (-3, 0), "node_server": (3, 0),
    "node_db": (-3, 5.2), "node_storage": (3, 5.2),
    "node_project_lens": (-3, 12.5), "node_project_landing": (3, 12.5),
    "node_messages": (-3, 19.5), "node_mail": (3, 19.5),
}
for name, (u, v) in LAYOUT.items():
    bpy.data.objects[name].location = ((v + u)/S2, (v - u)/S2, 0)
tris = sum(len(p.vertices) - 2 for o in bpy.data.objects if o.type == 'MESH' and not o.hide_render for p in o.data.polygons)
print("nodos", len(LAYOUT), "tris", tris)
