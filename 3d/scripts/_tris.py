import bpy
t = 0
for o in bpy.data.objects:
    if o.type == 'MESH' and not o.hide_render: t += sum(len(p.vertices)-2 for p in o.data.polygons)
print("TRIS", t)
