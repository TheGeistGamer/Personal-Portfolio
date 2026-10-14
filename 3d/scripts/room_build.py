# Builds the room around the desk: fixes lathe normals, adds floor/walls and
# low-poly detail props. Run inside Blender (exec). Idempotent.
import bpy, bmesh, math, random
from mathutils import Vector, Matrix

D = bpy.data
col = D.collections['deco']
M = lambda n: D.materials[n]
R = math.radians
random.seed(11)

# --- 1. fix inverted normals on the lathe props ---
for n in ['mug_saucer', 'mug_body', 'mug_coffee', 'plant_pot', 'plant_soil', 'shf_pot']:
    o = D.objects.get(n)
    if not o:
        continue
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(o.data); bm.free(); o.data.update()
    for p in o.data.polygons:
        p.use_smooth = True

# --- 2. clean previous runs, hide the old desk/walls ---
for o in list(D.objects):
    if o.name.startswith(('room_', 'rm_', 'det_')):
        D.objects.remove(o, do_unlink=True)
for n in ['desk_body', 'desk_top', 'add_wall_back', 'add_wall_side']:
    o = D.objects.get(n)
    if o:
        o.hide_render = True; o.hide_viewport = True


def newmat(name, c, em=0.0, rough=0.8, src='mat_clay'):
    m = D.materials.get(name) or D.materials[src].copy()
    m.name = name
    b = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    for l in list(b.inputs['Base Color'].links):
        m.node_tree.links.remove(l)
    b.inputs['Base Color'].default_value = c
    b.inputs['Roughness'].default_value = rough
    b.inputs['Emission Color'].default_value = c
    b.inputs['Emission Strength'].default_value = em
    return m


def mk(name, bm, mat, loc=(0, 0, 0), rot=(0, 0, 0), bev=0.0, smooth=False):
    me = D.meshes.new(name); bm.to_mesh(me); bm.free()
    o = D.objects.new(name, me); o.location = loc; o.rotation_euler = rot
    me.materials.append(M(mat) if isinstance(mat, str) else mat)
    col.objects.link(o)
    if bev:
        md = o.modifiers.new('b', 'BEVEL'); md.width = bev; md.segments = 2; md.limit_method = 'ANGLE'
    for p in me.polygons:
        p.use_smooth = smooth
    return o


def box(name, size, loc, mat='mat_clay', rot=(0, 0, 0), bev=0.05):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts)
    bmesh.ops.translate(bm, vec=(0, 0, size[2] / 2), verts=bm.verts)
    return mk(name, bm, mat, loc, rot, bev)


def cyl(name, r1, r2, h, loc, mat='mat_clay', seg=24, rot=(0, 0, 0), bev=0.02):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r1, radius2=r2, depth=h)
    bmesh.ops.translate(bm, vec=(0, 0, h / 2), verts=bm.verts)
    return mk(name, bm, mat, loc, rot, bev, smooth=True)


def plane(name, x0, x1, y0, y1, mat, z=0.0, uv=False):
    bm = bmesh.new()
    vs = [bm.verts.new(v) for v in [(x0, y0, z), (x1, y0, z), (x1, y1, z), (x0, y1, z)]]
    f = bm.faces.new(vs)
    if uv:
        L = bm.loops.layers.uv.new('lightmap')
        for l in f.loops:
            l[L].uv = (0.005 + 0.99 * (l.vert.co.x - x0) / (x1 - x0), 0.005 + 0.99 * (l.vert.co.y - y0) / (y1 - y0))
    return mk(name, bm, mat)


# --- 3. room: inner floor (lightmapped), outer floor (flat), big walls ---
X0, X1, Y0, Y1 = -45.0, 18.35, -45.0, 16.1
plane('room_floor', X0, X1, Y0, Y1, newmat('room_floor_mat', (0.75, 0.755, 0.765, 1)), z=-0.01)
plane('room_floor_inner', -17.0, X1, -15.0, Y1, newmat('room_floor_inner_mat', (0.97, 0.972, 0.978, 1)), uv=True)
box('room_wall_back', (X1 - X0 + 0.4, 0.4, 22), ((X0 + X1) / 2 + 0.2, Y1 + 0.2, 0), newmat('room_wall_back_mat', (0.93, 0.935, 0.945, 1)), bev=0)
box('room_wall_side', (0.4, Y1 - Y0 + 0.4, 22), (X1 + 0.2, (Y0 + Y1) / 2 + 0.2, 0), newmat('room_wall_side_mat', (0.93, 0.935, 0.945, 1)), bev=0)
box('rm_skirt_back', (X1 - X0, 0.12, 0.45), ((X0 + X1) / 2, Y1 - 0.06, 0), 'mat_clay_dark', bev=0.02)
box('rm_skirt_side', (0.12, Y1 - Y0, 0.45), (X1 - 0.06, (Y0 + Y1) / 2, 0), 'mat_clay_dark', bev=0.02)

# --- 4. detail props ---
glass = newmat('mat_glass', (0.86, 0.91, 0.98, 1), 0.8, 0.2)
Y = Y1
# window behind the monitor
wx, wz, ww, wh = 3.5, 6.0, 9.0, 7.0
box('det_win_frame', (ww + 0.6, 0.35, wh + 0.6), (wx, Y - 0.1, wz - 0.3), 'mat_clay', bev=0.06)
box('det_win_glass', (ww, 0.1, wh), (wx, Y - 0.25, wz), glass, bev=0)
box('det_win_mull_v', (0.22, 0.25, wh), (wx, Y - 0.3, wz), 'mat_clay', bev=0.03)
box('det_win_mull_h', (ww, 0.25, 0.22), (wx, Y - 0.3, wz + wh * 0.62), 'mat_clay', bev=0.03)
box('det_win_sill', (ww + 1.2, 0.8, 0.25), (wx, Y - 0.4, wz - 0.55), 'mat_clay', bev=0.06)
# tall storage cabinet (left, against back wall)
cx = -8.5
box('det_cab_body', (4.6, 1.8, 5.6), (cx, Y - 0.95, 0), 'mat_clay', bev=0.08)
for i, dx in enumerate([-1.15, 1.15]):
    box(f'det_cab_door_{i}', (2.15, 0.08, 5.0), (cx + dx, Y - 1.88, 0.3), 'mat_clay', bev=0.04)
    box(f'det_cab_handle_{i}', (0.1, 0.12, 0.9), (cx + dx * 0.12, Y - 1.95, 2.8), 'mat_accent' if i == 1 else 'mat_clay_dark', bev=0.03)
box('det_cab_box_a', (1.6, 1.2, 0.9), (cx - 1.1, Y - 1.0, 5.6), 'mat_clay_mid', bev=0.06)
box('det_cab_box_b', (1.2, 1.0, 0.7), (cx - 1.0, Y - 1.0, 6.5), 'mat_clay', bev=0.05)
cyl('det_cab_vase', 0.35, 0.45, 1.1, (cx + 1.2, Y - 1.0, 5.6), 'mat_accent', seg=16)
# big floor plant (far left corner)
P = Vector((-13.5, 13.2, 0))
cyl('det_bigplant_pot', 1.0, 1.25, 2.2, P, 'mat_clay', seg=24)
cyl('det_bigplant_soil', 1.18, 1.18, 0.05, P + Vector((0, 0, 2.1)), 'mat_soil', seg=24, bev=0)
for i in range(13):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=8, v_segments=6, radius=0.5)
    for v in bm.verts:
        v.co.x *= 0.55; v.co.y *= 0.08; v.co.z = (v.co.z + 0.5) * 4.2
    a = 2 * math.pi * i / 13 + random.uniform(-.2, .2); t = R(random.uniform(10, 40))
    o = mk(f'det_bigplant_leaf_{i}', bm, 'mat_leaf', P + Vector((0, 0, 2.1)), smooth=True)
    o.rotation_euler = (Matrix.Rotation(a, 4, 'Z') @ Matrix.Rotation(t, 4, 'X')).to_euler()
    o.scale.z = random.uniform(.7, 1.05)
# desk lamp (left of monitor)
L = Vector((-5.4, 9.6, 0))
cyl('det_lamp_base', 0.7, 0.8, 0.18, L, 'mat_clay', seg=24)
box('det_lamp_arm1', (0.16, 0.16, 3.0), L + Vector((0, 0, 0.15)), 'mat_clay_dark', rot=(R(-18), 0, R(-40)), bev=0.04)
a1 = L + Vector((0, 0, 0.15)) + Matrix.Rotation(R(-40), 3, 'Z') @ Vector((0, math.sin(R(18)) * 3.0, math.cos(R(18)) * 3.0))
box('det_lamp_arm2', (0.14, 0.14, 2.4), a1, 'mat_clay_dark', rot=(R(70), 0, R(-40)), bev=0.04)
a2 = a1 + Matrix.Rotation(R(-40), 3, 'Z') @ Vector((0, -math.sin(R(70)) * 2.4, math.cos(R(70)) * 2.4))
cyl('det_lamp_shade', 0.25, 0.75, 0.9, a2 + Vector((0, 0, -0.6)), 'mat_accent', seg=24)
cyl('det_lamp_bulb', 0.32, 0.32, 0.08, a2 + Vector((0, 0, -0.65)), glass, seg=16, bev=0)
# floor lamp (front right)
F = Vector((15.6, -8.5, 0))
cyl('det_flamp_base', 0.9, 1.0, 0.25, F, 'mat_clay_dark', seg=24)
cyl('det_flamp_pole', 0.09, 0.09, 9.0, F, 'mat_clay_dark', seg=12, bev=0)
cyl('det_flamp_shade', 0.9, 1.5, 1.4, F + Vector((0, 0, 8.4)), 'mat_clay', seg=28)
cyl('det_flamp_glow', 1.3, 1.3, 0.05, F + Vector((0, 0, 8.38)), glass, seg=24, bev=0)
# side wall: clock + framed print
SX = X1
cyl('det_clock', 1.2, 1.2, 0.25, Vector((SX - 0.25, 1.5, 9.5)), 'mat_clay', seg=32, rot=(0, R(90), 0))
cyl('det_clock_face', 1.0, 1.0, 0.05, Vector((SX - 0.3, 1.5, 9.5)), 'mat_clay_mid', seg=32, rot=(0, R(90), 0), bev=0)
box('det_clock_h1', (0.08, 0.08, 0.6), Vector((SX - 0.35, 1.5, 9.5)), 'mat_clay_dark', rot=(R(40), 0, 0), bev=0)
box('det_clock_h2', (0.06, 0.06, 0.85), Vector((SX - 0.37, 1.5, 9.5)), 'mat_accent', rot=(R(-110), 0, 0), bev=0)
box('det_print_frame', (0.2, 4.2, 5.4), Vector((SX - 0.1, -6.0, 5.2)), 'mat_clay_dark', bev=0.05)
box('det_print_art', (0.06, 3.6, 4.8), Vector((SX - 0.22, -6.0, 5.5)), 'mat_clay', bev=0)
cyl('det_print_dot', 0.6, 0.6, 0.05, Vector((SX - 0.27, -6.0, 8.2)), 'mat_accent', seg=32, rot=(0, R(90), 0), bev=0)
box('det_print_bar', (0.05, 2.4, 0.3), Vector((SX - 0.27, -6.0, 6.2)), 'mat_clay_mid', bev=0)
# storage boxes (left front)
B = Vector((-11.5, -2.5, 0))
box('det_store_a', (2.6, 2.2, 1.8), B, 'mat_clay', rot=(0, 0, R(12)), bev=0.08)
box('det_store_b', (2.2, 1.9, 1.4), B + Vector((0.2, 0.1, 1.8)), 'mat_clay_mid', rot=(0, 0, R(4)), bev=0.08)
box('det_store_lbl', (0.9, 0.05, 0.35), B + Vector((0.25, -1.15, 0.75)), 'mat_accent', rot=(0, 0, R(12)), bev=0)
print('room built')
