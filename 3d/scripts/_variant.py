import bpy, sys
a = sys.argv[sys.argv.index("--")+1:]; sun, amb, out = float(a[0]), float(a[1]), a[2]
bpy.data.objects["sun_key"].data.energy = sun
for n in bpy.context.scene.world.node_tree.nodes:
    if n.type == 'BACKGROUND' and n.inputs[1].default_value < 0.99: n.inputs[1].default_value = amb
exec(open(sys.argv[0].rsplit("/",1)[0] + "/render_preview.py").read().replace("sys.argv.index(\"--\")+1", "sys.argv.index(\"--\")+4").replace("sys.argv.index(\"--\")+2","sys.argv.index(\"--\")+5").replace("sys.argv.index(\"--\")+3","sys.argv.index(\"--\")+6")) if False else None
