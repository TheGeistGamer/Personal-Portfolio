"""Etapa 2.1: materiales + isla flotante + pedestal modular (ejecutar dentro de Blender)."""
import bpy, bmesh, math

def srgb(h, a=1):
    c = [int(h[i:i+2], 16)/255 for i in (1, 3, 5)]
    f = lambda v: v/12.92 if v <= 0.04045 else ((v+0.055)/1.055)**2.4
    return (*[f(v) for v in c], a)

# limpiar piezas previas del kit
for n in ("kit_island", "kit_pedestal"):
    o = bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o, do_unlink=True)

# ---- materiales ----
def clay(name, hexcol, rough=0.85):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    b = nt.nodes.new("ShaderNodeBsdfPrincipled")
    b.inputs["Base Color"].default_value = srgb(hexcol)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = 0
    b.inputs["Specular IOR Level"].default_value = 0.25
    nt.links.new(b.outputs[0], out.inputs[0]); return m
def emissive(name, hexcol, strength=4.0):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    e = nt.nodes.new("ShaderNodeEmission")
    e.inputs["Color"].default_value = srgb(hexcol); e.inputs["Strength"].default_value = strength
    nt.links.new(e.outputs[0], out.inputs[0]); return m
m_clay = clay("mat_clay", "#F7F8FA")
m_dark = clay("mat_clay_dark", "#D9DDE5")
m_acc  = emissive("mat_accent", "#2F5BFF")

kit = bpy.data.collections["kit"]

def rounded_box(name, sx, sy, sz, bevel, mat, loc=(0, 0, 0)):
    """Caja con bordes redondeados reales (bevel aplicado). Base en z=0 hacia arriba."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts: v.co.x *= sx; v.co.y *= sy; v.co.z = (v.co.z + 0.5) * sz
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); kit.objects.link(o)
    o.location = loc; o.data.materials.append(mat)
    bv = o.modifiers.new("bevel", 'BEVEL'); bv.width = bevel; bv.segments = 5; bv.limit_method = 'NONE'
    bpy.context.view_layer.objects.active = o
    for ob in bpy.context.view_layer.objects: ob.select_set(False)
    o.select_set(True)
    bpy.ops.object.modifier_apply(modifier="bevel")
    bpy.ops.object.shade_smooth()
    return o

def join(name, parts):
    for ob in bpy.context.view_layer.objects: ob.select_set(False)
    for p in parts: p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.join(); o = bpy.context.active_object; o.name = name; o.data.name = name
    return o

# ---- isla flotante: losa grande + capa inferior mas pequena (efecto flotante) ----
top = rounded_box("isl_top", 15, 15, 0.8, 0.3, m_clay, (0, 0, -0.8))
mid = rounded_box("isl_mid", 14, 14, 0.5, 0.2, m_dark, (0, 0, -1.3))
bot = rounded_box("isl_bot", 8, 8, 1.2, 0.45, m_dark, (0, 0, -2.5))
island = join("kit_island", [top, mid, bot])

# ---- pedestal modular: placa inferior oscura + placa superior + tira LED de acento ----
p1 = rounded_box("ped_a", 3.4, 3.4, 0.28, 0.1, m_dark, (0, 0, 0))
p2 = rounded_box("ped_b", 3.0, 3.0, 0.32, 0.12, m_clay, (0, 0, 0.28))
led = rounded_box("ped_led", 1.4, 0.07, 0.07, 0.03, m_acc, (0, -1.72, 0.12))
ped = join("kit_pedestal", [p1, p2, led])
# origen en el centro de la base (z=0), escala aplicada
bpy.context.view_layer.objects.active = ped
for ob in bpy.context.view_layer.objects: ob.select_set(False)
ped.select_set(True)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
ped.location = (0, 0, 0)
print("OK", island.name, len(island.data.polygons), ped.name, len(ped.data.polygons))
