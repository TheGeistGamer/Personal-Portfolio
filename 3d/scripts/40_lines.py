"""Etapa 4: lineas de conexion (cintas planas con UV a lo largo del recorrido) + puntos de union (ejecutar dentro de Blender)."""
import bpy, bmesh, math
from mathutils import Vector

HALF = {"node_monitor": (3.6, 2.6)}; DEF = (1.45, 1.45)
Z, WID, RAD = 0.04, 0.2, 1.0
coll = bpy.data.collections["lines"]
for o in list(coll.objects): bpy.data.objects.remove(o, do_unlink=True)
m_line = bpy.data.materials["mat_accent"]
POS = {n: tuple(bpy.data.objects[n].location)[:2] for n in
       ("node_monitor", "node_phone", "node_mail", "node_profile", "node_project_landing", "node_project_lens", "node_api", "node_server", "node_db")}

EDGES = [
    ("phone-mail",      ["node_phone", (-5.0, -4.0), "node_mail"]),
    ("phone-monitor",   ["node_phone", (-5.0, 5.5), "node_monitor"]),
    ("monitor-api",     ["node_monitor", "node_api"]),
    ("api-db",          ["node_api", "node_db"]),
    ("api-profile",     ["node_api", "node_profile"]),
    ("profile-server",  ["node_profile", "node_server"]),
    ("db-server",       ["node_db", "node_server"]),
    ("mail-profile",    ["node_mail", (7.0, -4.0), "node_profile"]),
    ("junction-landing",[(7.0, -4.0), "node_project_landing"]),
    ("landing-lens",    ["node_project_landing", "node_project_lens"]),
    ("mail-lens-bus",   ["node_mail", (0.0, -8.0)]),
]
JUNCTIONS = [(7.0, -4.0), (0.0, -8.0)]

def pt(w): return Vector(POS[w]) if isinstance(w, str) else Vector(w)
def anchor(node, toward):
    """Punto en el borde del pedestal, en la direccion del siguiente waypoint (ortogonal)."""
    c = pt(node); d = pt(toward) - c; hx, hy = HALF.get(node, DEF)
    if abs(d.x) >= abs(d.y): return c + Vector((math.copysign(hx, d.x), 0))
    return c + Vector((0, math.copysign(hy, d.y)))

def build_path(wps):
    P = [pt(w) for w in wps]
    if isinstance(wps[0], str): P[0] = anchor(wps[0], wps[1])
    if isinstance(wps[-1], str): P[-1] = anchor(wps[-1], wps[-2])
    out = [P[0]]
    for i in range(1, len(P) - 1):                       # esquinas redondeadas
        a, b, c = P[i-1], P[i], P[i+1]; r = min(RAD, (b - a).length/2, (c - b).length/2)
        d1 = (b - a).normalized(); d2 = (c - b).normalized(); p1 = b - d1*r; p2 = b + d2*r
        for k in range(9):
            t = k/8; q = (1-t)**2*p1 + 2*(1-t)*t*b + t**2*p2; out.append(q)
    out.append(P[-1]); return out

def ribbon(name, path, meta):
    L = [0.0]
    for i in range(1, len(path)): L.append(L[-1] + (path[i] - path[i-1]).length)
    tot = L[-1]; bm = bmesh.new(); uvl = bm.loops.layers.uv.new("UVMap"); vs = []
    for i, p in enumerate(path):
        t = (path[min(i+1, len(path)-1)] - path[max(i-1, 0)]).normalized(); n = Vector((-t.y, t.x))
        vs.append((bm.verts.new((*(p + n*WID/2), Z)), bm.verts.new((*(p - n*WID/2), Z))))
    for i in range(len(path) - 1):
        f = bm.faces.new((vs[i][0], vs[i][1], vs[i+1][1], vs[i+1][0]))
        for lp, (u, v) in zip(f.loops, ((L[i]/tot, 0), (L[i]/tot, 1), (L[i+1]/tot, 1), (L[i+1]/tot, 0))): lp[uvl].uv = (u, v)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(m_line)
    o = bpy.data.objects.new(name, me); coll.objects.link(o)
    o["length"] = round(tot, 3); o["from"], o["to"] = meta; return o

def dot(name, p, r):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=True, radius=r, segments=20)
    for v in bm.verts: v.co.z = Z + 0.012
    bm.to_mesh(me); bm.free(); me.materials.append(m_line)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = (p.x, p.y, 0); return o

total = 0
for i, (nm, wps) in enumerate(EDGES, 1):
    path = build_path(wps); o = ribbon(f"line_{i:02d}", path, (str(wps[0]), str(wps[-1]))); total += o["length"]
    o["label"] = nm
    for e in (path[0], path[-1]):
        if not any((e - pt(j)).length < 0.01 for j in JUNCTIONS): dot(f"dot_{i:02d}_{'a' if e is path[0] else 'b'}", e, 0.16)
for j, p in enumerate(JUNCTIONS, 1): dot(f"junction_{j:02d}", pt(p), 0.3)
print("lineas", len(EDGES), "longitud total", round(total, 1), "m")
