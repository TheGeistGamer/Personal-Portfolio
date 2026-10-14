"""Etapa 2.10: escritorio de oficina + distribucion tipo referencia (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())
ANG = 0                      # los objetos del escritorio van sin giro propio
S2 = math.sqrt(2)
K = 0.9                       # compactar la distribucion
uv = lambda u, v: ((v*K + u*K)/S2, (v*K - u*K)/S2)
m_mid = bpy.data.materials["mat_clay_mid"]
kit = bpy.data.collections["kit"]
deco = bpy.data.collections.get("deco") or bpy.data.collections.new("deco")
if "deco" not in bpy.context.scene.collection.children: bpy.context.scene.collection.children.link(deco)

# ---------- distribucion (u = derecha en pantalla, v = hacia el fondo) ----------
POS = {            # cuadricula x: -5, 0, 7, 12 ; y: -8, -4, -0.5, 5.5  (separacion ~5 m, pedestal 2.9 m)
    "node_monitor": (0.0, 5.5),
    "node_phone": (-5.0, -0.5), "node_mail": (0.0, -4.0), "node_profile": (7.0, -0.5),
    "node_project_landing": (7.0, -8.0), "node_project_lens": (-5.0, -8.0),
    "node_api": (7.0, 5.5), "node_server": (12.0, -0.5), "node_db": (12.0, 5.5),
}
EXTRAS = ("node_ai", "node_storage", "node_messages")      # ocultos (recuperables), no borrados
SHELF, CLIP = (-13.7, 5.9), (-3.1, -11.8)
DECO_PTS = [(-9.0, -5.1), (16.1, 6.7), (-5.3, -8.1)]       # taza, planta, boligrafo (ver 17_decoration.py)
for n, (x_, y_) in POS.items(): bpy.data.objects[n].location = (x_, y_, 0)

def show(o, vis):
    for x in [o] + list(o.children_recursive): x.hide_render = not vis; x.hide_viewport = not vis
for n in EXTRAS: show(bpy.data.objects[n], False)
for n in POS: show(bpy.data.objects[n], True)

# ---------- pedestales mas finos y estrechos; cuerpos bajan para seguir apoyados ----------
PED_XY, PED_Z = 0.85, 0.55
DZ = 0.6*(1 - PED_Z)                                   # cuanto baja la cara superior del pedestal
for n in POS:
    root = bpy.data.objects[n]; big = (n == "node_monitor")
    root.scale = (1.6, 1.6, 1.6) if big else (1, 1, 1)
    sc_ = root.scale[0]
    for ch in root.children:
        if ch.name.endswith("_base"):
            ch.scale = (1.45, 0.9, 0.34) if big else (PED_XY, PED_XY, PED_Z)
        else:
            ch.location.z = -DZ/sc_
# ---------- limpiar la isla anterior ----------
for n in ("kit_island", "island_top"):
    o = bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o, do_unlink=True)
for n in ("desk_top", "desk_body", "desk_shelf", "desk_clipboard"):
    o = bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o, do_unlink=True)

def box(coll, name, sx, sy, sz, bw, mat, x, y, z, seg=4):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * sz
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = (x, y, z); smooth(o, bw, seg); return o

# ---------- escritorio ----------
pts = list(POS.values()) + [uv(*p) for p in DECO_PTS + [SHELF, CLIP]]
M = 3.4
MF = 2.3   # margen frontal (lado de camara) menor: las piezas llegan casi al borde como en la referencia
x0, x1 = min(p[0] for p in pts) - MF, max(p[0] for p in pts) + M
y0, y1 = min(p[1] for p in pts) - MF, max(p[1] for p in pts) + M
cx, cy, sx, sy = (x0 + x1)/2, (y0 + y1)/2, x1 - x0, y1 - y0
top = box(kit, "d_top", sx, sy, 0.7, 0.28, m_clay, cx, cy, -0.7)
apr = box(kit, "d_apron", sx - 1.4, sy - 1.4, 1.8, 0.2, m_dark, cx, cy, -2.5)
plin = box(kit, "d_plinth", sx - 3.0, sy - 3.0, 0.5, 0.15, m_dark, cx, cy, -3.0)
desk_top = join("desk_top", [top])
yf = cy - (sy - 1.4)/2          # cara frontal (-y) del cuerpo
dw = (sx - 1.4 - 1.6)/2
drw = []
for i, dx in enumerate((-1, 1)):
    xc = cx + dx*(dw/2 + 0.4)
    drw.append(rrect(kit, f"d_dr{i}", dw, 1.1, 0.07, 0.25, 0.03, m_clay, xc, -1.6, yf, 5, 2))
    drw.append(rrect(kit, f"d_hd{i}", 1.6, 0.16, 0.07, 0.08, 0.02, m_mid, xc, -1.35, yf - 0.07, 5, 2))
desk_body = join("desk_body", [apr, plin] + drw)
print("desk", round(sx, 1), "x", round(sy, 1), "centro", round(cx, 1), round(cy, 1))

# ---------- estanteria (fondo izquierda) ----------
W, D, H, t = 4.8, 1.6, 4.8, 0.24
sh = [box(deco, "s_l", t, D, H, 0.06, m_clay, -W/2 + t/2, 0, 0), box(deco, "s_r", t, D, H, 0.06, m_clay, W/2 - t/2, 0, 0),
      box(deco, "s_bk", W, 0.14, H, 0.04, m_dark, 0, D/2 - 0.07, 0)]
for k in range(4): sh.append(box(deco, f"s_sh{k}", W, D, t, 0.06, m_clay, 0, 0, k*(H - t)/3))
sh1 = (H - t)/3 + t
for i, (bx, bh, mt) in enumerate(((-1.5, 1.25, m_mid), (-1.1, 1.1, m_dark), (-0.75, 1.3, m_mid))):
    sh.append(box(deco, f"s_bi{i}", 0.3, D*0.75, bh, 0.06, mt, bx, 0, t))
sh.append(box(deco, "s_box", 1.3, D*0.75, 0.9, 0.08, m_clay, 1.1, 0, t))
sh.append(box(deco, "s_box2", 1.4, D*0.75, 0.7, 0.08, m_dark, -0.5, 0, sh1 + 0.0))
sh.append(box(deco, "s_box3", 1.0, D*0.7, 0.7, 0.08, m_mid, 1.4, 0, sh1))
pot = box(deco, "s_pot", 0.9, 0.9, 0.7, 0.12, m_clay, 1.2, 0, 2*(H - t)/3 + t)
sh.append(pot); sh.append(box(deco, "s_pl", 0.55, 0.55, 0.9, 0.2, m_mid, 1.2, 0, 2*(H - t)/3 + t + 0.65))
shelf = join("desk_shelf", sh)
shelf.rotation_euler = (0, 0, -math.pi/4); shelf.location = (*uv(*SHELF), 0)
deselect(); shelf.select_set(True); bpy.context.view_layer.objects.active = shelf
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)

# ---------- portapapeles (frente izquierda, tumbado) ----------
cw, ch = 2.5, 3.3
parts = [rrect(deco, "c_b", cw, ch, 0.16, 0.35, 0.05, m_clay, 0, 0, 0.08), rrect(deco, "c_clip", 1.0, 0.42, 0.22, 0.12, 0.03, m_dark, 0, ch/2 - 0.1, 0.11)]
for i in range(3):
    z = 0.7 - i*0.75; hot = (i == 2)
    parts.append(rrect(deco, f"c_c{i}", 0.4, 0.4, 0.035, 0.2, 0.01, m_acc if hot else m_mid, -0.7, z, -0.08, 8, 1))
    parts.append(tube("c_t%d" % i, [(-0.16, 0.0), (-0.04, -0.12), (0.16, 0.14)], 0.035, m_clay, -0.7, z, -0.12) if False else rrect(deco, f"c_k{i}", 0.2, 0.06, 0.03, 0.03, 0.0, m_clay, -0.7, z, -0.115, 3, 1))
    parts.append(rrect(deco, f"c_l{i}", 1.05, 0.12, 0.035, 0.06, 0.01, m_mid, 0.25, z + 0.07, -0.08, 5, 1))
    parts.append(rrect(deco, f"c_m{i}", 0.7, 0.09, 0.035, 0.045, 0.01, m_dark, 0.07, z - 0.12, -0.08, 5, 1))
clip = join("desk_clipboard", parts)
clip.rotation_euler = (-math.pi/2, 0, math.radians(18)); clip.location = (*uv(*CLIP), 0.09)
deselect(); clip.select_set(True); bpy.context.view_layer.objects.active = clip
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)

# ---------- comprobar solapes entre nodos ----------
names = list(POS); r = {n: 2.0 for n in names}; r["node_monitor"] = 4.6
bad = []
for i, a in enumerate(names):
    for b in names[i+1:]:
        (xa, ya), (xb, yb) = POS[a], POS[b]
        if math.hypot(xa - xb, ya - yb) < (r[a] + r[b])*0.85: bad.append((a, b, round(math.hypot(xa - xb, ya - yb), 1)))
print("solapes:", bad)
ds = sorted(math.hypot(POS[a][0] - POS[b][0], POS[a][1] - POS[b][1]) for i, a in enumerate(names) for b in names[i+1:])
print("distancia minima entre nodos:", round(ds[0], 1))
