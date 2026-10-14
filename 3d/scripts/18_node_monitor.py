"""Etapa 2.9: node_monitor (hero, junto al telefono) (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())
S2 = math.sqrt(2)
m_panel = bpy.data.materials.get("mat_panel") or bpy.data.materials.new("mat_panel")
m_panel.use_nodes = True; nt = m_panel.node_tree; nt.nodes.clear()
o_ = nt.nodes.new("ShaderNodeOutputMaterial"); b_ = nt.nodes.new("ShaderNodeBsdfPrincipled")
b_.inputs["Base Color"].default_value = (0.034, 0.046, 0.087, 1); b_.inputs["Roughness"].default_value = 0.6
nt.links.new(b_.outputs[0], o_.inputs[0])
m_mid = bpy.data.materials.get("mat_clay_mid") or m_dark

key = "node_monitor"; clean(key); c = bpy.data.collections.get(key) or assemble(key, None, None)
W, H, DEP = 5.0, 3.1, 0.4
BASE_H, NECK_H = 0.14, 0.75
zb = TOP + 0.12
zc = zb + BASE_H + NECK_H + H/2 - 0.1; FY = -DEP/2

def box3(name, sx, sy, sz, bw, mat, x, y, z, seg=4):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * sz
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); c.objects.link(o); place(o, x, y, z); smooth(o, bw, seg); return o

def catmull(pts, k=8):
    out = []
    P = [pts[0]] + pts + [pts[-1]]
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i-1], P[i], P[i+1], P[i+2]
        for j in range(k):
            t = j/k; t2, t3 = t*t, t*t*t
            out.append(tuple(0.5*((2*p1[d]) + (-p0[d] + p2[d])*t + (2*p0[d] - 5*p1[d] + 4*p2[d] - p3[d])*t2 + (-p0[d] + 3*p1[d] - 3*p2[d] + p3[d])*t3) for d in (0, 1)))
    return out + [pts[-1]]

body = [rrect(c, "mo_body", W, H, DEP, 0.42, 0.12, m_clay, 0, zc, DEP/2)]
body.append(box3("mo_neck", 0.8, 0.32, NECK_H + 0.2, 0.1, m_dark, 0, 0.0, zb + BASE_H - 0.04))
body.append(box3("mo_foot", 2.1, 1.1, BASE_H, 0.06, m_clay, 0, 0.0, zb))
screen = rrect(c, "mo_screen", W-0.3, H-0.3, 0.06, 0.3, 0.025, m_screen, 0, zc, FY + 0.02)
UY = FY - 0.04; PY = UY - 0.0; EY = UY - 0.03
ui = []; acc = []
cw = W - 0.3 - 0.36; x0 = -cw/2; ztop = zc + (H-0.3)/2 - 0.18
def R(nm, w, h, mat, x, z, y, rr=None, n=4, sg=1, d=0.03):
    return rrect(c, nm, w, h, d, rr if rr is not None else min(w, h)/2, 0.008, mat, x, z, y, n, sg)
# --- tarjetas KPI ---
kw = (cw - 0.28)/3; kh = 0.72
for i in range(3):
    kx = x0 + kw/2 + i*(kw + 0.14); kz = ztop - kh/2
    ui.append(R(f"kpi{i}", kw, kh, m_panel, kx, kz, PY, 0.12, 5, 2))
    if i == 0:
        ui.append(R("ring_o", 0.5, 0.5, m_clay, kx - 0.42, kz, EY, None, 12, 1))
        ui.append(R("ring_i", 0.3, 0.3, m_panel, kx - 0.42, kz, EY - 0.03, None, 10, 1))
        ui.append(R("k0_v", 0.55, 0.14, m_clay, kx + 0.28, kz + 0.1, EY)); ui.append(R("k0_l", 0.42, 0.08, m_mid, kx + 0.22, kz - 0.1, EY))
    elif i == 1:
        ui.append(R("k1_v", 0.75, 0.15, m_clay, kx - 0.2, kz + 0.14, EY)); ui.append(R("k1_a", 0.95, 0.08, m_mid, kx - 0.1, kz - 0.06, EY)); ui.append(R("k1_b", 0.6, 0.08, m_mid, kx - 0.28, kz - 0.22, EY))
    else:
        for j, hh in enumerate((0.14, 0.26, 0.2, 0.34)):
            ui.append(R(f"k2_b{j}", 0.1, hh, m_clay, kx - 0.45 + j*0.16, kz - 0.3 + hh/2 + 0.02, EY, 0.04, 4, 1))
        ui.append(R("k2_v", 0.5, 0.14, m_clay, kx + 0.3, kz + 0.1, EY)); ui.append(R("k2_l", 0.38, 0.08, m_mid, kx + 0.24, kz - 0.1, EY))
# --- paneles inferiores ---
ph = ztop - kh - 0.14 - (zc - (H-0.3)/2 + 0.18)
pz = ztop - kh - 0.14 - ph/2
lw = 2.7; rw = cw - lw - 0.14
lx = x0 + lw/2; rx = x0 + lw + 0.14 + rw/2
ui.append(R("pan_l", lw, ph, m_panel, lx, pz, PY, 0.14, 5, 2)); ui.append(R("pan_r", rw, ph, m_panel, rx, pz, PY, 0.14, 5, 2))
ui.append(R("t_l", 0.7, 0.1, m_clay, lx - lw/2 + 0.5, pz + ph/2 - 0.2, EY)); ui.append(R("t_r", 0.5, 0.1, m_clay, rx - rw/2 + 0.4, pz + ph/2 - 0.2, EY))
for g in range(3):   # rejilla de la grafica
    ui.append(R(f"grid{g}", lw - 0.4, 0.02, m_mid, lx, pz - 0.55 + g*0.4, EY, None, 3, 1, 0.02))
# --- linea de la grafica (acento) ---
raw = [(-1.1, -0.38), (-0.75, -0.12), (-0.45, -0.28), (-0.1, 0.1), (0.25, -0.05), (0.6, 0.28), (0.9, 0.16), (1.12, 0.46)]
pts = catmull([(lx + px, pz - 0.05 + pz_) for px, pz_ in raw])
cu = bpy.data.curves.new("mo_line", 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.04; cu.bevel_resolution = 4; cu.use_fill_caps = True
sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
for i, (px, pz_) in enumerate(pts): sp.points[i].co = (px, 0, pz_, 1)
o = bpy.data.objects.new("mo_line", cu); c.objects.link(o); place(o, 0, EY - 0.03, 0)
deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
bpy.ops.object.convert(target='MESH'); o = bpy.context.active_object; o.data.materials.append(m_acc)
bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40)); acc.append(o)
acc.append(R("mo_dot", 0.17, 0.17, m_acc, pts[-1][0], pts[-1][1], EY - 0.03, None, 10, 2))
# --- barras ---
hs = (0.35, 0.6, 0.45, 0.8, 0.62, 1.0)
for j, hh in enumerate(hs):
    bx = rx - rw/2 + 0.28 + j*0.2; bz = pz - ph/2 + 0.22 + hh/2*0.9
    (acc if j == len(hs) - 1 else ui).append(R(f"bar{j}", 0.13, hh*0.9, m_acc if j == len(hs) - 1 else m_clay, bx, bz, EY, 0.05, 4, 1))
# nodo: base ancha
root = bpy.data.objects.new(key, None); root.empty_display_type = 'PLAIN_AXES'; c.objects.link(root)
base = bpy.data.objects.new(key + "_base", bpy.data.objects["kit_pedestal"].data); c.objects.link(base); base.parent = root
base.scale = (1.95, 1.15, 1.0); base.rotation_euler = (0, 0, ANG)
groups = {"body": body, "screen": [screen], "ui": ui, "accent": acc}
for suffix, parts in groups.items():
    o = join(f"{key}_{suffix}", parts); o.parent = root; o.location = (0, 0, 0)
def uv_to_xy(u, v): return ((v + u)/S2, (v - u)/S2)
root.location = (*uv_to_xy(-1.8, -14), 0)
bpy.data.objects["node_phone"].location = (*uv_to_xy(4.9, -14), 0)
tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
print({s: tris(bpy.data.objects[f"{key}_{s}"]) for s in groups})
