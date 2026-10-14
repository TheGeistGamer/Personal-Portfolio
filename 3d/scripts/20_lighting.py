"""Etapa 3a: luz (sol suave sobre toda la banda), mundo y materiales (ejecutar dentro de Blender)."""
SUN, SUN_ANGLE, WORLD = 1.9, 10, 0.4   # WORLD = ambiente que ilumina; el fondo visible se mantiene a 1.0
import bpy, math, mathutils
sc = bpy.context.scene

# quitar luces de area antiguas y sol previo
for n in ("light_key", "light_fill", "sun_key"):
    o = bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o, do_unlink=True)

# sol: llega desde la izquierda de la camara y algo por detras de ella -> sombras hacia la derecha/fondo
to_light = mathutils.Vector((-0.707, 0.14, 0)).normalized() * math.cos(math.radians(52)) + mathutils.Vector((0, 0, math.sin(math.radians(52))))
d = bpy.data.lights.new("sun_key", 'SUN'); d.energy = SUN; d.angle = math.radians(SUN_ANGLE)
sun = bpy.data.objects.new("sun_key", d); bpy.data.collections["env"].objects.link(sun)
sun.rotation_euler = (-to_light).to_track_quat('-Z', 'Y').to_euler()

# mundo: fondo #EEF0F4 a fuerza 1 (= color exacto), actua tambien como luz ambiente suave
nt = sc.world.node_tree; nt.nodes.clear()
col = (0.855, 0.871, 0.905, 1)
bg_cam = nt.nodes.new("ShaderNodeBackground"); bg_cam.inputs[0].default_value = col; bg_cam.inputs[1].default_value = 1.0
bg_lit = nt.nodes.new("ShaderNodeBackground"); bg_lit.inputs[0].default_value = col; bg_lit.inputs[1].default_value = WORLD
lp = nt.nodes.new("ShaderNodeLightPath"); mix = nt.nodes.new("ShaderNodeMixShader"); out = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs[0])
nt.links.new(bg_lit.outputs[0], mix.inputs[1]); nt.links.new(bg_cam.outputs[0], mix.inputs[2])
nt.links.new(mix.outputs[0], out.inputs[0])

# EEVEE: sombras suaves + oclusion ambiental
ee = sc.eevee
for a, v in (("use_shadows", True), ("use_raytracing", False), ("gtao_distance", 0.6), ("gtao_quality", 0.5), ("use_gtao", True)):
    if hasattr(ee, a): setattr(ee, a, v)

# material medio para detalles que necesitan contraste (solapa del sobre)
m = bpy.data.materials.get("mat_clay_mid") or bpy.data.materials.new("mat_clay_mid")
m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
o_ = nt.nodes.new("ShaderNodeOutputMaterial"); b_ = nt.nodes.new("ShaderNodeBsdfPrincipled")
b_.inputs["Base Color"].default_value = (0.52, 0.55, 0.62, 1); b_.inputs["Roughness"].default_value = 0.85
nt.links.new(b_.outputs[0], o_.inputs[0])
flap = bpy.data.objects.get("node_mail_ui")
if flap and flap.data.materials: flap.data.materials[0] = m
print("ok sun", SUN, "world", WORLD)
