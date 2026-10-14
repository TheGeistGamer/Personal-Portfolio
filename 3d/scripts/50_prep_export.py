"""Etapa 5: preparar materiales para glTF (ejecutar dentro de Blender)."""
import bpy
def srgb(h):
    c = [int(h[i:i+2], 16)/255 for i in (1, 3, 5)]; f = lambda v: v/12.92 if v <= 0.04045 else ((v+0.055)/1.055)**2.4
    return (*[f(v) for v in c], 1)
m = bpy.data.materials["mat_accent"]; nt = m.node_tree; nt.nodes.clear()
o = nt.nodes.new("ShaderNodeOutputMaterial"); b = nt.nodes.new("ShaderNodeBsdfPrincipled")
b.inputs["Base Color"].default_value = srgb("#2F5BFF"); b.inputs["Roughness"].default_value = 0.5
b.inputs["Emission Color"].default_value = srgb("#2F5BFF"); b.inputs["Emission Strength"].default_value = 3.0
nt.links.new(b.outputs[0], o.inputs[0])
print("mat_accent -> Principled emisivo")
