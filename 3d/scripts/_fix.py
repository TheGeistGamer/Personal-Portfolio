import bpy, math
for n in bpy.data.objects:
    if n.type == 'MESH' and n.name.startswith("node_"):
        for o in bpy.context.view_layer.objects: o.select_set(False)
        bpy.context.view_layer.objects.active = n; n.select_set(True)
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))
print("ok")
