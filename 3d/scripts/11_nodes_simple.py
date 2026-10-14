"""Etapa 2.2: node_storage, node_server, node_db (ejecutar dentro de Blender)."""
import bpy, bmesh, math

mats = {k: bpy.data.materials[k] for k in ("mat_clay", "mat_clay_dark", "mat_accent")}
TOP = 0.6  # altura de la cara superior del pedestal

def deselect():
    for o in bpy.context.view_layer.objects: o.select_set(False)

def finish(o, bevel, seg=5):
    bv = o.modifiers.new("bevel", 'BEVEL'); bv.width = bevel; bv.segments = seg; bv.limit_method = 'NONE'
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.modifier_apply(modifier="bevel"); bpy.ops.object.shade_smooth()
    return o

def box(coll, name, sx, sy, sz, bevel, mat, loc):
    """Caja redondeada con base en loc.z."""
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + .5) * sz
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = loc; me.materials.append(mat)
    return finish(o, bevel)

def cyl(coll, name, r, h, bevel, mat, loc):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=48, radius1=r, radius2=r, depth=h)
    for v in bm.verts: v.co.z += h/2
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = loc; me.materials.append(mat)
    return finish(o, bevel, 4)

def join(name, parts):
    deselect()
    for p in parts: p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]; bpy.ops.object.join()
    o = bpy.context.active_object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)  # origen -> mundo; se reubica abajo
    return o

# ---- limpiar corridas previas ----
for n in ("storage", "server", "db"):
    for suf in ("", "_base", "_body", "_accent"):
        o = bpy.data.objects.get(f"node_{n}{suf}")
        if o: bpy.data.objects.remove(o, do_unlink=True)

ped = bpy.data.objects["kit_pedestal"]
ped.location = (0, -9, 0); ped.hide_render = True; ped.hide_viewport = True   # plantilla oculta

def make_node(key, pos, build):
    c = bpy.data.collections[f"node_{key}"]
    root = bpy.data.objects.new(f"node_{key}", None); root.empty_display_type = 'PLAIN_AXES'
    c.objects.link(root); root.location = pos
    base = bpy.data.objects.new(f"node_{key}_base", ped.data); c.objects.link(base)   # instancia (malla compartida)
    base.parent = root
    body_parts, accent_parts = build(c)
    for suffix, parts, in (("body", body_parts), ("accent", accent_parts)):
        o = join(f"node_{key}_{suffix}", parts)
        o.parent = root; o.location = (0, 0, 0)
    return root

# --- storage: bloques apilados desplazados (cajon/bloque de almacenamiento) ---
def build_storage(c):
    body = []
    offs = [(0, 0), (0.18, -0.12), (-0.12, 0.1)]
    for i, (dx, dy) in enumerate(offs):
        body.append(box(c, f"s{i}", 2.3, 2.3, 0.5, 0.13, mats["mat_clay" if i != 1 else "mat_clay_dark"], (dx, dy, TOP + i*0.62)))
    acc = [box(c, "s_acc", 0.9, 0.08, 0.12, 0.035, mats["mat_accent"], (0.18, -1.27, TOP + 0.62 + 0.2))]
    return body, acc

# --- server: torre con 3 cajones y una pastilla LED ---
def build_server(c):
    body = [box(c, "r_body", 1.9, 1.7, 2.5, 0.2, mats["mat_clay"], (0, 0, TOP))]
    for i in range(3):
        body.append(box(c, f"r_dr{i}", 1.62, 0.1, 0.52, 0.05, mats["mat_clay_dark"], (0, -0.9, TOP + 0.3 + i*0.72)))
    acc = [box(c, "r_acc", 0.4, 0.08, 0.12, 0.035, mats["mat_accent"], (-0.45, -0.97, TOP + 0.5 + 2*0.72))]
    return body, acc

# --- db: pila de cilindros con anillo de acento ---
def build_db(c):
    body = []
    for i in range(3):
        body.append(cyl(c, f"d{i}", 1.1, 0.62, 0.14, mats["mat_clay"], (0, 0, TOP + i*0.8)))
    acc = [cyl(c, "d_acc", 1.12, 0.06, 0.02, mats["mat_accent"], (0, 0, TOP + 0.62 + 0.09))]
    return body, acc

make_node("db", (-5.2, 0, 0), build_db)
make_node("server", (0, 0, 0), build_server)
make_node("storage", (5.2, 0, 0), build_storage)

# plantilla del kit fuera de render; reportar tris
tris = lambda o: sum(len(p.vertices) - 2 for p in o.data.polygons)
for n in ("db", "server", "storage"):
    print(n, {s: tris(bpy.data.objects[f"node_{n}_{s}"]) for s in ("base", "body", "accent")})
