"""Etapa 2.9b: node_monitor v2 (pantalla clara estilo referencia + nuestros iconos) (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())
S2 = math.sqrt(2)
m_mid = bpy.data.materials["mat_clay_mid"] if "mat_clay_mid" in bpy.data.materials else m_dark
scr = bpy.data.materials.get("mat_screen_light") or bpy.data.materials.new("mat_screen_light")
scr.use_nodes = True; nt = scr.node_tree; nt.nodes.clear()
o_ = nt.nodes.new("ShaderNodeOutputMaterial"); b_ = nt.nodes.new("ShaderNodeBsdfPrincipled")
b_.inputs["Base Color"].default_value = (0.87, 0.89, 0.93, 1); b_.inputs["Roughness"].default_value = 0.7
b_.inputs["Emission Color"].default_value = (0.9, 0.92, 0.96, 1); b_.inputs["Emission Strength"].default_value = 0.55
nt.links.new(b_.outputs[0], o_.inputs[0])

mpl = bpy.data.materials.get("mat_panel_light") or bpy.data.materials.new("mat_panel_light")
mpl.use_nodes = True; nt2 = mpl.node_tree; nt2.nodes.clear()
o2 = nt2.nodes.new("ShaderNodeOutputMaterial"); b2 = nt2.nodes.new("ShaderNodeBsdfPrincipled")
b2.inputs["Base Color"].default_value = (0.93, 0.94, 0.96, 1); b2.inputs["Roughness"].default_value = 0.75
b2.inputs["Emission Color"].default_value = (1, 1, 1, 1); b2.inputs["Emission Strength"].default_value = 0.4
nt2.links.new(b2.outputs[0], o2.inputs[0])
key = "node_monitor"; clean(key); c = bpy.data.collections.get(key) or assemble(key, None, None)
W, H, DEP = 5.0, 3.1, 0.4; BASE_H, NECK_H = 0.14, 0.75
zb = TOP + 0.12; zc = zb + BASE_H + NECK_H + H/2 - 0.1; FY = -DEP/2
UY = FY - 0.04; PY = UY; EY = UY - 0.04; E2 = EY - 0.03
ui, acc = [], []

def box3(name, sx, sy, sz, bw, mat, x, y, z, seg=4):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * sz
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); c.objects.link(o); place(o, x, y, z); smooth(o, bw, seg); return o
def R(nm, w, h, mat, x, z, y, rr=None, n=4, sg=1, d=0.03, bw=0.0):
    return rrect(c, nm, w, h, d, rr if rr is not None else min(w, h)/2, bw, mat, x, z, y, n, sg)
def tube(nm, pts, rad, mat, x, z, y, res=2, k=0):
    if k:
        P = [pts[0]] + pts + [pts[-1]]; out = []
        for i in range(1, len(P) - 2):
            p0, p1, p2, p3 = P[i-1], P[i], P[i+1], P[i+2]
            for j in range(k):
                t = j/k; t2, t3 = t*t, t*t*t
                out.append(tuple(0.5*((2*p1[d]) + (-p0[d] + p2[d])*t + (2*p0[d] - 5*p1[d] + 4*p2[d] - p3[d])*t2 + (-p0[d] + 3*p1[d] - 3*p2[d] + p3[d])*t3) for d in (0, 1)))
        pts = out + [pts[-1]]
    cu = bpy.data.curves.new(nm, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = rad; cu.bevel_resolution = res; cu.use_fill_caps = True
    sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
    for i, (px, pz) in enumerate(pts): sp.points[i].co = (px, 0, pz, 1)
    o = bpy.data.objects.new(nm, cu); c.objects.link(o); place(o, x, y, z)
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o = bpy.context.active_object; o.data.materials.append(mat)
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40)); return o

# ---- iconos propios (cx, cz = centro en la cara; s = tamano) ----
def ic_user(x, z, s, mat, y):
    return [R("i_uh", 0.42*s, 0.42*s, mat, x, z + 0.2*s, y, None, 6), R("i_ub", 0.86*s, 0.36*s, mat, x, z - 0.22*s, y, 0.17*s, 4)]
def ic_db(x, z, s, mat, y):
    return [R("i_d", 0.9*s, 0.24*s, mat, x, z + dz*s, y, None, 4) for dz in (0.3, 0, -0.3)]
def ic_code(x, z, s, mat, y):
    r = 0.045*s
    return [tube("i_lt", [(-0.1*s, 0.3*s), (-0.38*s, 0), (-0.1*s, -0.3*s)], r, mat, x, z, y), tube("i_gt", [(0.1*s, 0.3*s), (0.38*s, 0), (0.1*s, -0.3*s)], r, mat, x, z, y)]
def ic_spark(x, z, s, mat, y):
    pts = []
    for i in range(32):
        t = i*2*math.pi/32; pts.append((0.5*s*math.cos(t)**3, 0.5*s*math.sin(t)**3))
    return [extrude_poly(c, "i_sp", pts, 0.03, mat, 0.006, x, z, y, 1)]
def ic_inf(x, z, s, mat, y):
    pts = [(0.46*s*math.cos(t)/(1 + math.sin(t)**2), 0.46*s*math.sin(t)*math.cos(t)/(1 + math.sin(t)**2)*1.7) for t in (i*2*math.pi/24 for i in range(25))]
    return [tube("i_in", pts, 0.05*s, mat, x, z, y)]
def ic_mail(x, z, s, mat, y, bg):
    return [R("i_m", 0.95*s, 0.68*s, mat, x, z, y, 0.12*s, 4), tube("i_mv", [(-0.34*s, 0.14*s), (0, -0.08*s), (0.34*s, 0.14*s)], 0.04*s, bg, x, z, y - 0.03)]
def ic_chat(x, z, s, mat, y):
    return [R("i_c", 0.95*s, 0.66*s, mat, x, z + 0.06*s, y, 0.26*s, 5), extrude_poly(c, "i_ct", [(-0.3*s, 0.0), (0.02*s, 0.0), (-0.32*s, -0.3*s)], 0.03, mat, 0.006, x, z - 0.24*s, y, 1)]

# ---- carcasa ----
body = [rrect(c, "mo_body", W, H, DEP, 0.42, 0.12, m_dark, 0, zc, DEP/2),
        box3("mo_neck", 0.8, 0.32, NECK_H + 0.2, 0.1, m_clay, 0, 0.0, zb + BASE_H - 0.04),
        box3("mo_foot", 2.1, 1.1, BASE_H, 0.06, m_clay, 0, 0.0, zb)]
screen = rrect(c, "mo_screen", W-0.3, H-0.3, 0.06, 0.3, 0.025, scr, 0, zc, FY + 0.02)

# ---- cuadricula de la pantalla ----
hw, hh = (W-0.3)/2, (H-0.3)/2
sbx = -hw + 0.14 + 0.2                       # barra lateral
cx0 = -hw + 0.14 + 0.4 + 0.12; cx1 = hw - 0.14; cw = cx1 - cx0
ztop = zc + hh - 0.14; zbot = zc - hh + 0.14
# barra lateral
ui.append(R("sb_div", 0.025, zbot*0 + (ztop - zbot), m_dark, cx0 - 0.06, (ztop + zbot)/2, PY, None, 3, 1, 0.02))
acc.append(R("sb_av", 0.32, 0.32, m_acc, sbx, ztop - 0.17, EY, None, 8, 1)); ui += ic_user(sbx, ztop - 0.17, 0.22, m_clay, E2)
icons = [ic_db, ic_code, ic_spark, ic_inf]
for i, f in enumerate(icons):
    ui += f(sbx, ztop - 0.65 - i*0.34, 0.2, m_mid, EY)
ui += ic_mail(sbx, ztop - 0.65 - 4*0.34, 0.2, m_mid, EY, scr)
ui += ic_chat(sbx, ztop - 0.65 - 5*0.34, 0.2, m_mid, EY)
ui += ic_spark(sbx, zbot + 0.12, 0.2, m_mid, EY)
# fila superior: 5 tarjetas con icono
th = 0.44; tw = (cw - 4*0.1)/5; tz = ztop - th/2
tops = [("user", ic_user, False), ("db", ic_db, False), ("code", ic_code, False), ("spark", ic_spark, True), ("inf", ic_inf, True)]
for i, (nm, f, hot) in enumerate(tops):
    tx = cx0 + tw/2 + i*(tw + 0.1)
    ui.append(R(f"tc{i}", tw, th, mpl, tx, tz, PY, 0.1, 4, 1, 0.04, 0.01))
    bx = tx - tw/2 + 0.2
    (acc if hot else ui).append(R(f"tb{i}", 0.28, 0.28, m_acc if hot else m_dark, bx, tz, EY, None, 8, 1))
    ui += f(bx, tz, 0.2, m_clay if hot else m_mid, E2)
    ui.append(R(f"tl{i}a", 0.27, 0.055, m_mid, tx + 0.14, tz + 0.06, EY)); ui.append(R(f"tl{i}b", 0.19, 0.045, m_dark, tx + 0.1, tz - 0.06, EY))
# fila media: dos listas
mh = 0.86; mz = ztop - th - 0.1 - mh/2; lw = (cw - 0.12)/2 + 0.05; rw = cw - lw - 0.12
lx = cx0 + lw/2; rx = cx0 + lw + 0.12 + rw/2
ui.append(R("ll", lw, mh, mpl, lx, mz, PY, 0.1, 4, 1, 0.04, 0.01)); ui.append(R("lr", rw, mh, mpl, rx, mz, PY, 0.1, 4, 1, 0.04, 0.01))
for i in range(4):
    z = mz + 0.3 - i*0.2; hot = (i == 0)
    (acc if hot else ui).append(R(f"ld{i}", 0.1, 0.1, m_acc if hot else m_mid, lx - lw/2 + 0.2, z, EY, None, 6, 1))
    ui.append(R(f"ln{i}", 0.7 - 0.08*i, 0.055, m_mid, lx - lw/2 + 0.65 - 0.04*i, z, EY)); ui.append(R(f"lm{i}", 0.26, 0.045, m_dark, lx + lw/2 - 0.3, z, EY))
rows = [ic_user, ic_chat, None]
for i in range(3):
    z = mz + 0.24 - i*0.25
    ui.append(R(f"rb{i}", 0.2, 0.2, m_dark, rx - rw/2 + 0.2, z, EY, None, 8, 1))
    ui += (rows[i](rx - rw/2 + 0.2, z, 0.15, m_mid, E2) if rows[i] else ic_mail(rx - rw/2 + 0.2, z, 0.15, m_mid, E2, m_dark))
    acc.append(R(f"rd{i}", 0.13, 0.13, m_acc, rx - rw/2 + 0.5, z, EY, None, 6, 1))
    ui.append(R(f"rn{i}", 0.62, 0.055, m_mid, rx - rw/2 + 1.0, z, EY)); ui.append(R(f"rm{i}", 0.2, 0.045, m_dark, rx + rw/2 - 0.22, z + 0.0, EY))
# fila inferior: grafica de lineas + barras
bh = ztop - th - 0.1 - mh - 0.1 - zbot; bz = zbot + bh/2
ui.append(R("cl", lw, bh, mpl, lx, bz, PY, 0.1, 4, 1, 0.04, 0.01)); ui.append(R("cr", rw, bh, mpl, rx, bz, PY, 0.1, 4, 1, 0.04, 0.01))
for g in range(5): ui.append(R(f"cg{g}", 0.02, bh - 0.3, scr, lx - lw/2 + 0.3 + g*(lw - 0.6)/4, bz + 0.05, EY, None, 3, 1, 0.02))
ui.append(R("ct", 0.5, 0.06, m_mid, lx - lw/2 + 0.4, bz + bh/2 - 0.12, EY))
raw = [(-0.78, -0.22), (-0.5, -0.05), (-0.25, -0.17), (0.0, 0.08), (0.28, -0.02), (0.55, 0.2), (0.78, 0.12)]
acc.append(tube("cline", [(lx + a, bz - 0.02 + b) for a, b in raw], 0.025, m_acc, 0, 0, EY - 0.02, 3, 6))
for a, b in (raw[1], raw[3], raw[5]): acc.append(R("cp", 0.09, 0.09, m_acc, lx + a, bz - 0.02 + b, EY - 0.02, None, 6, 1))
ui.append(R("rt", 0.4, 0.06, m_mid, rx - rw/2 + 0.35, bz + bh/2 - 0.12, EY))
hs = (0.22, 0.34, 0.28, 0.48, 0.4, 0.58, 0.5)
for j, hv in enumerate(hs):
    hot = j in (3, 4, 5)
    (acc if hot else ui).append(R(f"br{j}", 0.1, hv*0.85, m_acc if hot else m_dark, rx - rw/2 + 0.3 + j*0.19, bz - bh/2 + 0.12 + hv*0.85/2, EY, 0.04, 4, 1))

root = bpy.data.objects.new(key, None); root.empty_display_type = 'PLAIN_AXES'; c.objects.link(root)
base = bpy.data.objects.new(key + "_base", bpy.data.objects["kit_pedestal"].data); c.objects.link(base); base.parent = root
base.scale = (1.95, 1.15, 1.0); base.rotation_euler = (0, 0, ANG)
groups = {"body": body, "screen": [screen], "ui": ui, "accent": acc}
for suffix, parts in groups.items():
    o = join(f"{key}_{suffix}", parts); o.parent = root; o.location = (0, 0, 0)
uv = lambda u, v: ((v + u)/S2, (v - u)/S2)
root.location = (*uv(-1.8, -15.5), 0); bpy.data.objects["node_phone"].location = (*uv(4.9, -15.5), 0)
tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
print({s: tris(bpy.data.objects[f"{key}_{s}"]) for s in groups})
