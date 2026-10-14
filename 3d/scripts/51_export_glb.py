"""Etapa 5: exportar a GLB con Draco. Headless:
   Blender -b archivo.blend --python 51_export_glb.py -- salida.glb"""
import bpy, sys
out = sys.argv[sys.argv.index("--") + 1]
vis = [o for o in bpy.data.objects if o.type in ('MESH', 'EMPTY') and not o.hide_render and not o.hide_viewport]
for o in bpy.context.view_layer.objects: o.select_set(False)
for o in vis: o.select_set(True)
print("objetos a exportar:", len(vis))
bpy.ops.export_scene.gltf(
    filepath=out, export_format='GLB', use_selection=True, use_visible=True,
    export_apply=True, export_yup=True, export_cameras=False, export_lights=False,
    export_extras=True, export_materials='EXPORT', export_texcoords=True, export_normals=True,
    export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6,
    export_draco_position_quantization=12, export_draco_normal_quantization=8, export_draco_texcoord_quantization=10,
)
print("EXPORTADO", out)
