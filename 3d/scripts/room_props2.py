# Second prop pass: removes the window, rebuilds the desk lamp with real joints and
# adds wall shelves / decor inspired by the three.js-journey rooms. Idempotent.
import bpy, bmesh, math, random
from mathutils import Vector, Matrix

D = bpy.data
col = D.collections['deco']
M = lambda n: D.materials[n]
R = math.radians
random.seed(7)
PREFIXES = ('det_win_', 'det_lamp_', 'det_wshelf', 'det_geo', 'det_book2', 'det_cone', 'det_fig',
            'det_cactus', 'det_balls', 'det_cam', 'det_rug', 'det_frame2', 'det_plant2')
for o in list(D.objects):
    if o.name.startswith(PREFIXES):
        D.objects.remove(o, do_unlink=True)


def link(name, bm, mat, smooth=True):
    me = D.meshes.new(name); bm.to_mesh(me); bm.free()
    o = D.objects.new(name, me); me.materials.append(M(mat) if isinstance(mat, str) else mat)
    col.objects.link(o)
    for p in me.polygons:
        p.use_smooth = smooth
    return o


def box(name, size, loc, mat='mat_clay', rz=0.0, bev=0.04):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts)
    bmesh.ops.translate(bm, vec=(0, 0, size[2] / 2), verts=bm.verts)
    o = link(name, bm, mat, smooth=False); o.location = loc; o.rotation_euler.z = rz
    if bev:
        m = o.modifiers.new('b', 'BEVEL'); m.width = bev; m.segments = 2; m.limit_method = 'ANGLE'
    return o


def cone_between(name, a, b, r1, r2, mat, seg=20):
    """Cylinder/cone whose axis goes from point a (radius r1) to point b (radius r2)."""
    a, b = Vector(a), Vector(b)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r1, radius2=r2, depth=(b - a).length)
    bmesh.ops.translate(bm, vec=(0, 0, (b - a).length / 2), verts=bm.verts)
    o = link(name, bm, mat)
    o.location = a
    o.rotation_euler = (b - a).to_track_quat('Z', 'Y').to_euler()
    return o


def sphere(name, c, r, mat, seg=16):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=seg // 2, radius=r)
    o = link(name, bm, mat); o.location = c
    return o


# ---------- desk lamp: base -> elbow -> head, shade aimed at the keyboard ----------
base = Vector((-5.4, 9.6, 0.0))
target = Vector((-2.2, 5.0, 0.0))           # spot on the desk it lights
d = (target - base); d.z = 0; d.normalize()
cone_between('det_lamp_base', base, base + Vector((0, 0, 0.22)), 0.8, 0.7, 'mat_clay', 28)
j0 = base + Vector((0, 0, 0.22))
j1 = j0 - d * 0.6 + Vector((0, 0, 3.4))      # shoulder leans back slightly
j2 = j1 + d * 2.9 + Vector((0, 0, 0.5))      # forearm reaches over the desk
for i, (a, b) in enumerate([(j0, j1), (j1, j2)]):
    cone_between(f'det_lamp_arm{i}', a, b, 0.09, 0.09, 'mat_clay_dark', 12)
for i, p in enumerate([j0, j1, j2]):
    sphere(f'det_lamp_joint{i}', p, 0.17, 'mat_clay_dark', 12)
aim = (target + Vector((0, 0, 0.0)) - j2).normalized()
neck = j2 + aim * 0.25
cone_between('det_lamp_shade', neck, neck + aim * 1.0, 0.22, 0.75, 'mat_accent', 28)
cone_between('det_lamp_bulb', neck + aim * 0.92, neck + aim * 0.95, 0.6, 0.6, 'mat_glass', 20)

# ---------- back wall (where the window was): two floating shelves ----------
Y = 16.1
SX, SZ1, SZ2 = 3.5, 6.6, 9.8
for i, z in enumerate((SZ1, SZ2)):
    box(f'det_wshelf_{i}', (7.0, 1.3, 0.22), (SX, Y - 0.65, z), 'mat_clay', bev=0.05)
    for k, dx in enumerate((-2.8, 2.8)):
        box(f'det_wshelf_{i}_br{k}', (0.18, 0.9, 0.7), (SX + dx, Y - 0.45, z - 0.7), 'mat_clay_mid', bev=0.03)
# lower shelf: books, cone lamp, little figure
x = SX - 3.0
for k, (w, h, m) in enumerate([(0.35, 1.5, 'mat_clay_dark'), (0.32, 1.7, 'mat_accent'), (0.38, 1.35, 'mat_clay'),
                               (0.3, 1.6, 'mat_clay_mid'), (0.34, 1.45, 'mat_clay')]):
    box(f'det_book2_{k}', (w, 1.0, h), (x + w / 2, Y - 0.7, SZ1 + 0.22), m, bev=0.03)
    x += w + 0.04
lean = box('det_book2_lean', (0.3, 1.0, 1.5), (x + 0.45, Y - 0.7, SZ1 + 0.22), 'mat_clay_dark', bev=0.03)
lean.rotation_euler = (0, R(-20), 0)
cone_between('det_cone_lamp_base', Vector((SX + 1.4, Y - 0.7, SZ1 + 0.22)), Vector((SX + 1.4, Y - 0.7, SZ1 + 0.32)), 0.35, 0.3, 'mat_clay_dark')
cone_between('det_cone_lamp_stem', Vector((SX + 1.4, Y - 0.7, SZ1 + 0.3)), Vector((SX + 1.4, Y - 0.7, SZ1 + 0.9)), 0.05, 0.05, 'mat_clay_dark', 10)
cone_between('det_cone_lamp_shade', Vector((SX + 1.4, Y - 0.7, SZ1 + 1.6)), Vector((SX + 1.75, Y - 0.95, SZ1 + 0.75)), 0.1, 0.55, 'mat_clay', 24)
# mini figure (toy robot)
fx = SX + 2.6
box('det_fig_body', (0.45, 0.35, 0.55), (fx, Y - 0.7, SZ1 + 0.42), 'mat_clay_dark', bev=0.06)
box('det_fig_legs', (0.35, 0.3, 0.22), (fx, Y - 0.7, SZ1 + 0.22), 'mat_clay_dark', bev=0.03)
sphere('det_fig_head', Vector((fx, Y - 0.7, SZ1 + 1.2)), 0.26, 'mat_clay', 14)
cone_between('det_fig_saber', Vector((fx + 0.28, Y - 0.75, SZ1 + 0.7)), Vector((fx + 0.55, Y - 0.85, SZ1 + 1.6)), 0.04, 0.04, 'mat_accent', 8)

# upper shelf: wireframe geometry pieces + ball cluster
def wire_solid(name, kind, c, r, mat, rot):
    bm = bmesh.new()
    if kind == 'ico':
        bmesh.ops.create_icosphere(bm, subdivisions=1, radius=r)
    else:
        bmesh.ops.create_cone(bm, cap_ends=True, segments=3, radius1=r, radius2=0, depth=r * 1.4)
    o = link(name, bm, mat, smooth=False)
    o.location = c; o.rotation_euler = rot
    w = o.modifiers.new('w', 'WIREFRAME'); w.thickness = 0.07; w.use_replace = True
    return o
wire_solid('det_geo_ico', 'ico', Vector((SX - 2.2, Y - 0.7, SZ2 + 0.9)), 0.62, 'mat_accent', (R(20), R(10), R(30)))
wire_solid('det_geo_tetra', 'tet', Vector((SX - 0.6, Y - 0.7, SZ2 + 0.75)), 0.6, 'mat_clay_dark', (0, R(12), R(40)))
for k in range(12):
    p = Vector((SX + 1.6 + random.uniform(-0.35, 0.35), Y - 0.7 + random.uniform(-0.25, 0.25), SZ2 + 0.45 + (k // 4) * 0.28 + random.uniform(0, 0.1)))
    sphere(f'det_balls_{k}', p, 0.2, 'mat_accent' if k % 3 == 0 else ('mat_clay' if k % 3 == 1 else 'mat_clay_mid'), 10)
box('det_frame2', (1.4, 0.15, 1.7), (SX + 3.4 - 0.9, Y - 0.25, SZ2 + 0.22), 'mat_clay_dark', bev=0.04)
box('det_frame2_pic', (1.15, 0.05, 1.4), (SX + 3.4 - 0.9, Y - 0.34, SZ2 + 0.37), 'mat_accent', bev=0)

# ---------- side wall, under the clock: shelf with cactus + camera on a tripod on the floor ----------
WX = 18.35
box('det_wshelf_side', (1.3, 5.0, 0.22), (WX - 0.65, 1.5, 6.0), 'mat_clay', bev=0.05)
for k, dy in enumerate((-2.0, 2.0)):
    box(f'det_wshelf_side_br{k}', (0.9, 0.18, 0.7), (WX - 0.45, 1.5 + dy, 5.3), 'mat_clay_mid', bev=0.03)
cz = 6.22
cone_between('det_cactus_pot', Vector((WX - 0.7, 0.2, cz)), Vector((WX - 0.7, 0.2, cz + 0.8)), 0.42, 0.5, 'mat_clay_dark', 20)
cone_between('det_cactus_main', Vector((WX - 0.7, 0.2, cz + 0.75)), Vector((WX - 0.7, 0.2, cz + 2.4)), 0.3, 0.26, 'mat_leaf', 14)
sphere('det_cactus_top', Vector((WX - 0.7, 0.2, cz + 2.4)), 0.26, 'mat_leaf', 14)
cone_between('det_cactus_arm', Vector((WX - 0.7, 0.2, cz + 1.4)), Vector((WX - 0.7, -0.35, cz + 1.9)), 0.15, 0.13, 'mat_leaf', 10)
for k in range(3):
    box(f'det_book2_side_{k}', (0.9, 0.3, 1.2 + 0.15 * k), (WX - 0.7, 2.0 + k * 0.34, cz), ('mat_clay', 'mat_accent', 'mat_clay_mid')[k], bev=0.03)
# camera on tripod (floor, right side)
tp = Vector((15.2, 3.5, 0))
top = tp + Vector((0, 0, 3.4))
for k in range(3):
    a = R(90 + k * 120)
    cone_between(f'det_cam_leg{k}', top, tp + Vector((math.cos(a) * 1.1, math.sin(a) * 1.1, 0)), 0.05, 0.05, 'mat_clay_dark', 8)
box('det_cam_body', (0.9, 0.6, 0.7), top + Vector((0, 0, 0.05)), 'mat_clay', rz=R(-120), bev=0.08)
cone_between('det_cam_lens', top + Vector((0, 0, 0.4)) + Vector((-0.3, -0.18, 0)), top + Vector((0, 0, 0.4)) + Vector((-0.65, -0.4, 0)), 0.22, 0.22, 'mat_clay_dark', 18)
sphere('det_cam_led', top + Vector((0.2, 0.0, 0.8)), 0.07, 'mat_accent', 8)

# ---------- round rug under the node grid ----------
bm = bmesh.new(); bmesh.ops.create_circle(bm, cap_ends=True, segments=48, radius=1.0)
rug = link('det_rug', bm, 'mat_clay_mid', smooth=False)
rug.location = (3.5, 0.5, 0.012); rug.scale = (10.5, 8.5, 1)
print('props2 built')
