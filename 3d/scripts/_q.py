import bpy
w = bpy.context.scene.world
print(w, w and w.use_nodes, w and [(n.name, n.type) for n in w.node_tree.nodes] if w and w.node_tree else None)
print([(n.name, [round(x,3) for x in n.inputs[0].default_value]) for n in w.node_tree.nodes if n.type=='BACKGROUND'])
print(bpy.context.scene.render.engine)
