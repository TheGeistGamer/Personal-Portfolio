import bpy, sys, mathutils, math
out = sys.argv[sys.argv.index("--")+1]; dist = float(sys.argv[sys.argv.index("--")+2]); tz = float(sys.argv[sys.argv.index("--")+3])
import os
sc = bpy.context.scene; cam = sc.camera
if os.environ.get("LIGHT_SUN"):
    bpy.data.objects["sun_key"].data.energy = float(os.environ["LIGHT_SUN"])
    for n in sc.world.node_tree.nodes:
        if n.type == 'BACKGROUND' and n.inputs[1].default_value < 0.99: n.inputs[1].default_value = float(os.environ["LIGHT_AMB"])
a=sys.argv[sys.argv.index('--')+1:]; tx=float(a[3]) if len(a)>3 else 0; ty=float(a[4]) if len(a)>4 else 0
t = mathutils.Vector((tx, ty, tz)); el, az = math.radians(35), math.radians(45)
cam.location = t + mathutils.Vector((-dist*math.cos(el)*math.sin(az), -dist*math.cos(el)*math.cos(az), dist*math.sin(el)))
cam.rotation_euler = (t - cam.location).to_track_quat('-Z','Y').to_euler()
sc.render.resolution_x, sc.render.resolution_y = 900, 900
sc.render.filepath = out; bpy.ops.render.render(write_still=True)
