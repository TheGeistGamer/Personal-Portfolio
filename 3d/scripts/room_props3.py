# Third pass: drops the cactus and the rug, adds a desk globe, flattens the red
# print dot, and sets up the "lived-in" lighting (warm key, cool sky fill and
# the room's own lamps switched on). Idempotent.
import bpy, bmesh, math
from mathutils import Vector

D = bpy.data
sc = bpy.context.scene
col = D.collections['deco']
M = lambda n: D.materials[n]
R = math.radians

for o in list(D.objects):
    if o.name.startswith(('det_cactus', 'det_rug', 'det_globe', 'det_print_dot', 'lt_')):
        D.objects.remove(o, do_unlink=True)


def link(name, bm, mat, smooth=True):
    me = D.meshes.new(name); bm.to_mesh(me); bm.free()
    o = D.objects.new(name, me); me.materials.append(M(mat)); col.objects.link(o)
    for p in me.polygons:
        p.use_smooth = smooth
    return o


def cone_between(name, a, b, r1, r2, mat, seg=20):
    a, b = Vector(a), Vector(b)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r1, radius2=r2, depth=(b - a).length)
    bmesh.ops.translate(bm, vec=(0, 0, (b - a).length / 2), verts=bm.verts)
    o = link(name, bm, mat); o.location = a
    o.rotation_euler = (b - a).to_track_quat('Z', 'Y').to_euler()
    return o


# --- desk globe where the cactus was (side-wall shelf) ---
WX, cz = 18.35, 6.22
g = Vector((WX - 0.7, 0.2, cz))
cone_between('det_globe_base', g, g + Vector((0, 0, 0.12)), 0.42, 0.36, 'mat_clay_dark', 24)
cone_between('det_globe_stem', g + Vector((0, 0, 0.1)), g + Vector((0, 0, 0.45)), 0.06, 0.06, 'mat_clay_dark', 10)
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=14, radius=0.62)
globe = link('det_globe_ball', bm, 'mat_clay'); globe.location = g + Vector((0, 0, 1.1)); globe.rotation_euler = (R(23), 0, 0)
# red "continents" band and a meridian ring
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=14, radius=0.64)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if abs(v.co.z) > 0.2], context='VERTS')
band = link('det_globe_band', bm, 'mat_accent'); band.location = globe.location; band.rotation_euler = (R(23), 0, R(30))
bm = bmesh.new(); bmesh.ops.create_circle(bm, segments=32, radius=0.78)
ring = link('det_globe_ring', bm, 'mat_clay_dark', smooth=False); ring.location = globe.location; ring.rotation_euler = (R(23), R(90), 0)
w = ring.modifiers.new('w', 'WIREFRAME'); w.thickness = 0.06; w.use_replace = True
s = ring.modifiers.new('s', 'SOLIDIFY'); s.thickness = 0.06

# --- red print accent: a flat square tile instead of a disc ---
bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1); bmesh.ops.scale(bm, vec=(0.05, 1.3, 1.3), verts=bm.verts)
dot = link('det_print_dot', bm, 'mat_accent', smooth=False); dot.location = (WX - 0.26, -6.0, 8.0)

# --- lighting ---
key = D.objects['area_key']
key.data.color = (1.0, 0.93, 0.84)
key.data.energy = 5200
sun = D.objects['sun_key']
sun.data.energy = 1.6; sun.data.angle = R(8); sun.data.color = (1.0, 0.94, 0.86)
# cool sky fill from the world
w = sc.world.node_tree
for n in w.nodes:
    if n.type == 'BACKGROUND':
        n.inputs['Color'].default_value = (0.78, 0.84, 0.98, 1)
        n.inputs['Strength'].default_value = 0.9

lights = D.collections['env']
def add_light(name, kind, loc, energy, color, size=0.5, aim=None, spot=None):
    ld = D.lights.new(name, kind); ld.energy = energy; ld.color = color
    if kind in ('POINT', 'SPOT'):
        ld.shadow_soft_size = size
    if spot:
        ld.spot_size = R(spot); ld.spot_blend = 0.6
    o = D.objects.new(name, ld); o.location = loc; lights.objects.link(o)
    if aim is not None:
        o.rotation_euler = (Vector(aim) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    return o

WARM = (1.0, 0.78, 0.55)
add_light('lt_floorlamp', 'POINT', (15.6, -8.5, 8.9), 2600, WARM, size=0.9)
shade = D.objects['det_lamp_shade']
tip = shade.matrix_world @ Vector((0, 0, 0.6))
add_light('lt_desklamp', 'SPOT', tip, 900, WARM, size=0.4, aim=(-2.2, 5.0, 0.0), spot=70)
add_light('lt_conelamp', 'POINT', (5.1, 15.2, 7.4), 220, WARM, size=0.3)
print('props3 + lights')
