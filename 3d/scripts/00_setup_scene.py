"""Etapa 1: escena base del portafolio (unidades, colecciones, camara, luz, render)."""
import bpy, math, mathutils, sys, os

OUT = sys.argv[sys.argv.index("--") + 1]

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.name = "portfolio"

# Unidades: metros, escala 1
sc.unit_settings.system = 'METRIC'
sc.unit_settings.scale_length = 1.0
sc.unit_settings.length_unit = 'METERS'

# Colecciones: una por nodo + soporte
root = sc.collection
def coll(name, parent=root):
    c = bpy.data.collections.new(name); parent.children.link(c); return c
env = coll("env")
kit = coll("kit")
nodes = coll("nodes")
for n in ["node_phone", "node_api", "node_db", "node_server", "node_storage", "node_ai", "node_mail"]:
    coll(n, nodes)
coll("lines")

# Fondo (world) gris frio claro #EEF0F4
w = bpy.data.worlds.new("world"); sc.world = w
if hasattr(w, "use_nodes"): w.use_nodes = True
def srgb(h):
    c = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    lin = lambda v: v/12.92 if v <= 0.04045 else ((v+0.055)/1.055)**2.4
    return (*[lin(v) for v in c], 1)
nt = w.node_tree; nt.nodes.clear()   # no depender de nombres localizados
bg = nt.nodes.new("ShaderNodeBackground"); out = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(bg.outputs[0], out.inputs[0])
bg.inputs[0].default_value = srgb("#EEF0F4"); bg.inputs[1].default_value = 1.0

# Camara: perspectiva suave FOV ~28, 35 deg elevacion, 45 deg azimut
cam_d = bpy.data.cameras.new("cam_main"); cam_d.lens_unit = 'FOV'; cam_d.angle = math.radians(28)
cam = bpy.data.objects.new("cam_main", cam_d); env.objects.link(cam)
target = mathutils.Vector((0, 0, 0.6)); dist = 22
el, az = math.radians(35), math.radians(45)
cam.location = target + mathutils.Vector((dist*math.cos(el)*math.sin(az)*-1, -dist*math.cos(el)*math.cos(az), dist*math.sin(el)))
cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
sc.camera = cam

# Luz: area grande y suave + relleno
def area(name, loc, energy, size):
    d = bpy.data.lights.new(name, 'AREA'); d.energy = energy; d.size = size
    o = bpy.data.objects.new(name, d); env.objects.link(o); o.location = loc
    o.rotation_euler = (mathutils.Vector((0, 0, 0.5)) - mathutils.Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
area("light_key", (-6, -8, 12), 650, 5)
area("light_fill", (9, 4, 6), 160, 14)

# Render: EEVEE, 1080x1350 (vertical, util para movil), color estandar
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x, sc.render.resolution_y = 1080, 1350
sc.view_settings.view_transform = 'Standard'
sc.render.filepath = os.path.join(os.path.dirname(OUT), "../renders/")

bpy.ops.wm.save_as_mainfile(filepath=OUT)
print("SAVED", OUT)
