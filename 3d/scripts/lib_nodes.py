"""Helpers comunes de los nodos (se cargan con exec desde otros scripts)."""
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

def circle(coll, name, d, mat, x, z, y_front, thick=0.03, bevel=0.012, n=16):
    return rrect(coll, name, d, d, thick, d/2, bevel, mat, x, z, y_front, n, 2)
