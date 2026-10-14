import bpy, sys, math
out = sys.argv[sys.argv.index("--")+1]
sc = bpy.context.scene; cd = bpy.data.cameras.new("top"); cd.type = 'ORTHO'; cd.ortho_scale = 50
cam = bpy.data.objects.new("top", cd); sc.collection.objects.link(cam)
cam.location = (2, 2, 40); cam.rotation_euler = (0, 0, -math.pi/4)   # u hacia la derecha, v hacia arriba
sc.camera = cam; sc.render.resolution_x = 700; sc.render.resolution_y = 1000
cd.ortho_scale = 46; sc.render.filepath = out; bpy.ops.render.render(write_still=True)
