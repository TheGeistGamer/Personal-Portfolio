"""Etapa 2.8: decoracion minima (tazas, plantas, boligrafo) fusionada en 'deco_static' (ejecutar dentro de Blender)."""
exec(open("/Volumes/ack - ssd/Proyectos/Portafolio Personal/landing-page-portafolio/3d/scripts/lib_nodes.py").read())
S2 = math.sqrt(2)
m_mid = bpy.data.materials["mat_clay_mid"] if "mat_clay_mid" in bpy.data.materials else m_dark
coll = bpy.data.collections.get("deco") or bpy.data.collections.new("deco")
if "deco" not in bpy.context.scene.collection.children: bpy.context.scene.collection.children.link(coll)
for o in list(coll.objects): bpy.data.objects.remove(o, do_unlink=True)

def uv_to_xy(u, v): return ((v*0.9 + u*0.9)/S2, (v*0.9 - u*0.9)/S2)

def new_obj(name, bm, mat, loc, rot=(0, 0, 0)):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); coll.objects.link(o); o.location = loc; o.rotation_euler = rot; return o

def cyl(name, r1, r2, h, mat, loc, bevel=0.06, rot=(0, 0, 0), seg=28):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r1, radius2=r2, depth=h)
    for v in bm.verts: v.co.z += h/2
    o = new_obj(name, bm, mat, loc, rot); smooth(o, bevel, 4); return o

def mug(name, u, v, ang):
    x, y = uv_to_xy(u, v); parts = []
    parts.append(cyl(name + "_b", 0.72, 0.72, 1.05, m_clay, (x, y, 0), 0.1))
    parts.append(cyl(name + "_c", 0.56, 0.56, 0.04, m_screen, (x, y, 1.02), 0.012))     # cafe
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for vv in bm.verts: vv.co.x *= 0.24; vv.co.y *= 0.2; vv.co.z *= 0.1
    # asa: arco de 3 bloques redondeados
    h1 = new_obj(name + "_h1", bm, m_clay, (x, y, 0), (0, 0, 0)); h1.scale = (1, 1, 1)
    parts.append(h1)
    return parts, (x, y)

def handle(name, x, y, ang, r=0.72):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.1; cu.bevel_resolution = 5; cu.use_fill_caps = True
    sp = cu.splines.new('POLY'); pts = []
    for i in range(17):
        t = -math.pi/2 + math.pi*i/16; pts.append((r + 0.45*math.cos(t) - 0.05, 0.45*math.sin(t)*0.0, 0.52 + 0.33*math.sin(t)))
    sp.points.add(len(pts) - 1)
    for i, (px, py, pz) in enumerate(pts): sp.points[i].co = (px, py, pz, 1)
    o = bpy.data.objects.new(name, cu); coll.objects.link(o); o.location = (x, y, 0); o.rotation_euler = (0, 0, ang)
    deselect(); bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o = bpy.context.active_object; o.data.materials.append(m_clay)
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40)); return o

def plant(name, u, v, scale=1.0, ang=0):
    x, y = uv_to_xy(u, v); parts = []
    parts.append(cyl(name + "_pot", 0.58*scale, 0.74*scale, 0.95*scale, m_clay, (x, y, 0), 0.08))
    parts.append(cyl(name + "_soil", 0.62*scale, 0.62*scale, 0.04, m_dark, (x, y, 0.93*scale), 0.01))
    for i in range(7):
        az = ang + i*2*math.pi/7 + (0.15 if i % 2 else 0); tilt = math.radians(38 + (i % 3)*12); L = (1.2 + 0.3*(i % 3))*scale
        bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=8, v_segments=6, radius=1.0)
        for vv in bm.verts: vv.co.x *= 0.2*scale; vv.co.y *= 0.06*scale; vv.co.z = vv.co.z*L/2 + L/2
        M = mathutils.Matrix.Rotation(az, 4, 'Z') @ mathutils.Matrix.Rotation(tilt, 4, 'X')   # inclinar y girar alrededor del tallo
        bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
        leaf = new_obj(name + f"_l{i}", bm, m_mid, (x, y, 0.95*scale))
        deselect(); bpy.context.view_layer.objects.active = leaf; leaf.select_set(True); bpy.ops.object.shade_smooth()
        parts.append(leaf)
    return parts

def pen(name, u, v, ang):
    x, y = uv_to_xy(u, v)
    body = cyl(name + "_b", 0.11, 0.11, 2.0, m_dark, (0, 0, 0), 0.04, (0, math.pi/2, 0), 20)
    cap = cyl(name + "_c", 0.12, 0.12, 0.55, m_clay, (1.45, 0, 0), 0.04, (0, math.pi/2, 0), 20)
    tip = cyl(name + "_t", 0.11, 0.02, 0.3, m_dark, (-0.28, 0, 0), 0.01, (0, -math.pi/2, 0), 20)
    for p in (body, cap, tip): p.location.z = 0.11
    body.location = (0, 0, 0.11); cap.location = (2.0*1.0, 0, 0.11) if False else (2.0, 0, 0.11); tip.location = (0, 0, 0.11)
    o = join(name, [body, cap, tip])
    o.rotation_euler = (0, 0, ang); o.location = (x, y, 0); return [o]

all_parts = []
m1, (mx, my) = mug("mug_a", -9.0, -5.1, 0); all_parts += m1; all_parts.append(handle("mug_a_hd", mx, my, math.radians(-40)))
all_parts += plant("plant_a", 16.1, 6.7, 1.15, 0.3)
all_parts += pen("pen_a", -5.3, -8.1, math.radians(70))
all_parts = [p for p in all_parts if not p.name.endswith("_h1") or bpy.data.objects.remove(p, do_unlink=True)]
all_parts = [p for p in all_parts if p.name in bpy.data.objects]
deco = join("deco_static", all_parts); deco.parent = None
print("deco tris", sum(len(p.vertices) - 2 for p in deco.data.polygons))
