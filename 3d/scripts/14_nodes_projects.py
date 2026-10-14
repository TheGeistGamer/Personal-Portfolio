"""Etapa 2.5: node_project_lens, node_project_landing, node_mail (ejecutar dentro de Blender)."""
import bpy, bmesh, math, mathutils
from mathutils import Vector

m_clay, m_dark, m_acc, m_screen = (bpy.data.materials[k] for k in ("mat_clay", "mat_clay_dark", "mat_accent", "mat_screen"))
TOP = 0.6; ANG = math.radians(-25)
ped_mesh = bpy.data.objects["kit_pedestal"].data

def deselect():
    for o in bpy.context.view_layer.objects: o.select_set(False)

def smooth(o, w, seg):
    if w:
        bv = o.modifiers.new("bevel", 'BEVEL'); bv.width = w; bv.segments = seg; bv.limit_method = 'NONE'
        deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
        bpy.ops.object.modifier_apply(modifier="bevel")
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))

def place(o, x, y, z):
    v = Vector((x, y, z)); v.rotate(mathutils.Euler((0, 0, ANG)))
    o.location = v; o.rotation_euler = (0, 0, ANG)

def extrude_poly(coll, name, pts, d, mat, bevel, x, z, y_front, seg=4):
    """Poligono 2D (plano XZ) extruido d hacia -Y desde y_front; cara trasera en y_front."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    f = bm.faces.new([bm.verts.new((px, 0, pz)) for px, pz in pts])
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, -d, 0), verts=[e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); place(o, x, y_front, z)
    smooth(o, bevel, seg); return o

def rrect(coll, name, w, h, d, R, bevel, mat, x, z, y_front, n=9, seg=4):
    pts = []
    for cx, cz, a0 in ((w/2-R, h/2-R, 0), (-w/2+R, h/2-R, 90), (-w/2+R, -h/2+R, 180), (w/2-R, -h/2+R, 270)):
        for i in range(n):
            a = math.radians(a0 + i*90/(n-1)); pts.append((cx + R*math.cos(a), cz + R*math.sin(a)))
    return extrude_poly(coll, name, pts, d, mat, bevel, x, z, y_front, seg)

def join(name, parts):
    deselect()
    for p in parts: p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    if len(parts) > 1: bpy.ops.object.join()
    o = bpy.context.active_object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o

def assemble(key, pos, groups):
    coll = bpy.data.collections.get(key) or bpy.data.collections.new(key)
    if key not in bpy.data.collections["nodes"].children: bpy.data.collections["nodes"].children.link(coll)
    return coll

def finish(key, coll, pos, groups):
    root = bpy.data.objects.new(key, None); root.empty_display_type = 'PLAIN_AXES'
    coll.objects.link(root); root.location = pos
    base = bpy.data.objects.new(f"{key}_base", ped_mesh); coll.objects.link(base); base.parent = root
    out = {}
    for suffix, parts in groups.items():
        o = join(f"{key}_{suffix}", parts); o.parent = root; o.location = (0, 0, 0); out[suffix] = o
    tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
    print(key, {s: tris(o) for s, o in out.items()})

def clean(key):
    for suf in ("", "_base", "_body", "_screen", "_ui", "_accent"):
        o = bpy.data.objects.get(f"{key}{suf}")
        if o: bpy.data.objects.remove(o, do_unlink=True)

# ================= Infinity Lens: visor de camara + infinito =================
key = "node_project_lens"; clean(key); c = assemble(key, None, None)
W = H = 2.5; DEP = 0.42; zc = TOP + 0.12 + H/2; FY = -DEP/2
body = rrect(c, "l_body", W, H, DEP, 0.6, 0.12, m_clay, 0, zc, DEP/2)
screen = rrect(c, "l_screen", W-0.3, H-0.3, 0.06, 0.45, 0.025, m_screen, 0, zc, FY + 0.02)
UY = FY - 0.04; ui = []
# 4 esquinas del visor: dos pastillas por esquina
a = (W-0.3)/2 - 0.3; L = 0.5
for sx in (-1, 1):
    for sz in (-1, 1):
        ui.append(rrect(c, "l_cx", L, 0.11, 0.03, 0.055, 0.012, m_dark, sx*(a - L/2 + 0.055), zc + sz*a, UY, 5, 2))
        ui.append(rrect(c, "l_cz", 0.11, L, 0.03, 0.055, 0.012, m_dark, sx*a, zc + sz*(a - L/2 + 0.055), UY, 5, 2))
# infinito: lemniscata como tubo
cu = bpy.data.curves.new("l_inf", 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.075; cu.bevel_resolution = 4; cu.resolution_u = 12
sp = cu.splines.new('POLY'); N = 64; sp.points.add(N - 1); sp.use_cyclic_u = True
for i in range(N):
    t = i*2*math.pi/N; k = 0.62*1.0/(1 + math.sin(t)**2)
    sp.points[i].co = (k*1.12*math.cos(t), 0, k*1.12*math.sin(t)*math.cos(t)*1.9, 1)
inf = bpy.data.objects.new("l_inf", cu); c.objects.link(inf); place(inf, 0, UY - 0.03, zc)
deselect(); bpy.context.view_layer.objects.active = inf; inf.select_set(True)
bpy.ops.object.convert(target='MESH'); inf = bpy.context.active_object
inf.data.materials.append(m_acc); bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))
finish(key, c, (-5.2, -5.2, 0), {"body": [body], "screen": [screen], "ui": ui, "accent": [inf]})

# ================= Landing: ventana de navegador =================
key = "node_project_landing"; clean(key); c = assemble(key, None, None)
W, H, DEP = 2.7, 2.1, 0.36; zc = TOP + 0.12 + H/2; FY = -DEP/2
body = rrect(c, "w_body", W, H, DEP, 0.45, 0.11, m_clay, 0, zc, DEP/2)
BAR = 0.34
screen = rrect(c, "w_screen", W-0.28, H-0.28-BAR, 0.06, 0.28, 0.022, m_screen, 0, zc - BAR/2 - 0.0, FY + 0.02)
UY = FY - 0.04; ui = []
ztop = zc + H/2 - 0.2
for i in range(3):   # 3 puntos de ventana
    ui.append(rrect(c, "w_dot", 0.14, 0.14, 0.04, 0.07, 0.015, m_dark, -W/2 + 0.42 + i*0.24, ztop, FY - 0.01, 6, 2))
ui.append(rrect(c, "w_url", 1.2, 0.15, 0.04, 0.075, 0.015, m_dark, 0.35, ztop, FY - 0.01, 5, 2))
sz0 = zc - BAR/2
ui.append(rrect(c, "w_title", 1.05, 0.17, 0.03, 0.085, 0.012, m_clay, -0.38, sz0 + 0.38, UY, 5, 2))
ui.append(rrect(c, "w_l1", 0.8, 0.1, 0.03, 0.05, 0.01, m_dark, -0.5, sz0 + 0.1, UY, 5, 2))
ui.append(rrect(c, "w_l2", 0.6, 0.1, 0.03, 0.05, 0.01, m_dark, -0.6, sz0 - 0.08, UY, 5, 2))
ui.append(rrect(c, "w_img", 0.72, 0.9, 0.03, 0.14, 0.012, m_clay, 0.78, sz0 + 0.02, UY, 5, 2))
acc = [rrect(c, "w_btn", 0.55, 0.17, 0.03, 0.085, 0.012, m_acc, -0.6, sz0 - 0.4, UY - 0.03, 5, 2)]
finish(key, c, (0, 5.2, 0), {"body": [body], "screen": [screen], "ui": ui, "accent": acc})

# ================= Mail: sobre con sello =================
key = "node_mail"; clean(key); c = bpy.data.collections["node_mail"]
W, H, DEP = 2.5, 1.7, 0.4; zc = TOP + 0.12 + H/2; FY = -DEP/2
body = rrect(c, "m_body", W, H, DEP, 0.4, 0.12, m_clay, 0, zc, DEP/2)
top_z = H/2 - 0.12
tri = [(-W/2 + 0.2, top_z), (W/2 - 0.2, top_z), (0.0, -0.2)]
flap = extrude_poly(c, "m_flap", tri, 0.06, m_dark, 0.035, 0, zc, FY + 0.02, 4)
seal = rrect(c, "m_seal", 0.4, 0.4, 0.05, 0.2, 0.02, m_acc, 0, zc - 0.12, FY - 0.03, 8, 3)
finish(key, c, (5.2, 5.2, 0), {"body": [body], "ui": [flap], "accent": [seal]})
