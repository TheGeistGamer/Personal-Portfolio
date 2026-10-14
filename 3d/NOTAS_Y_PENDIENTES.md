# Portafolio 3D: notas y pendientes

Última actualización: 14 oct 2026. Sirve para retomar en otra sesión.

## Estado actual

- **Landing nueva en `/`**: escena 3D a pantalla completa, UI de vidrio translúcido encima, sin scroll. Los íconos abren ventanas (Sobre mí, Stack, Proyectos, casos de estudio, Agencia, Contacto). Bilingüe ES/EN.
- **Sitio retro anterior** en `/clasico`, sin cambios.
- **Escena Blender**: cuarto completo (piso + 2 paredes grandes), escritorio con nodos conectados por líneas con pulso rojo y decoración. La iluminación está horneada.
- **Nada está commiteado todavía.**

## Archivos clave

| Qué | Dónde |
|---|---|
| Blend actual | `3d/blend/portfolio_v04a_room.blend` |
| Versiones anteriores | `../portfolio_v01_layout.blend`, `_v02_materials_bake`, `_v03_export` |
| Scripts Blender | `3d/scripts/room_build.py`, `room_props2.py`, `room_props3.py`, `room_bake.py` |
| GLB exportado | `../export/portfolio_scene.glb` → copiar a `public/models/portfolio_scene.glb` |
| Póster de carga | `public/scene/poster.webp` (render de la cámara convertido con `cwebp`) |
| Decodificador Draco | `public/draco/` |
| Componentes web | `src/components/studio/` (Studio, Windows, Icon, content.ts) |
| Lógica / 3D web | `src/scripts/studio.ts` |
| Estilos | `src/styles/studio.css` (la sección "Glass overlay" al final sobrescribe el layout de columnas) |
| Layout / SEO | `src/layouts/StudioLayout.astro` |
| Datos de proyectos | `src/data/projects.ts` (compartido con `/clasico`) |
| Servidor de vista previa | `../.claude/launch.json` → `astro-dev` (puerto 4321) |

## Cómo regenerar la escena (en Blender, vía MCP)

```python
exec(open('.../3d/scripts/room_bake.py').read())
bake_floor()               # lightmap 2K del piso (float, ~1 min)
bake_walls()               # lightmaps 1K de las paredes (luz completa)
bake_light_vertex(0, 80)   # luz en colores de vértice, en lotes de 80
bake_light_vertex(1, 80)
bake_light_vertex(2, 80)
bake_light_vertex(3, 80)
finalize_export()          # calibra brillo, combina texturas y exporta el GLB
```

Después: copiar el GLB a `public/models/`, re-renderizar el póster y correr `npm run build`.

## A tener en cuenta (lecciones aprendidas)

- **Guardar el .blend después de cada paso.** Blender volvió solo al último archivo guardado a mitad de una sesión y se perdió trabajo. Correr los horneados en lotes cortos.
- **Iluminación horneada**: la web NO calcula luz para las piezas. Se muestran como `color base × luz horneada` (MeshBasicMaterial). Si se mueve, agrega o cambia algo en Blender, **hay que volver a hornear** (piso, paredes y vértices) o se verá desfasado.
- **Lightmaps en punto flotante** (`float_buffer=True`, EXR). En 8 bits lo brillante se recorta a blanco y se ve plano.
- **Un solo brillo para todo** (`light_scale` = 0.92 / percentil 95 del piso). Las paredes llevan `gain` 1.35 en `_finalize` para no verse grises.
- **Proyección UV de las paredes**: solo la cara que mira al cuarto recibe espacio de textura. Si no, se hornea la cara exterior y sale plana.
- **Desconectar la textura del Base Color antes de re-hornear** (ya lo hace `_lightmap`), o hay dependencia circular.
- **Normales**: objetos hechos por revolución (taza, maceta) salieron con normales invertidas y horneaban negro. Usar `recalc_face_normals`.
- **Mallas sin caras** (círculos con modificador wireframe) rompen el horneado. Usar toros/geometría real.
- **Materiales compartidos en three.js**: clonar por malla antes de cambiar `vertexColors`; si no, piezas sin atributo de color salen negras.
- **Brillo de líneas**: solo `mat_accent_glow` es emisivo (path_, bead_, port_). `mat_accent` es rojo mate.
- **Límite de giro asimétrico**: `maxAzimuthAngle = az + 0.5` (lado izquierdo libre) y `minAzimuthAngle = az - 0.12`, porque girar hacia la derecha deja ver dónde terminan la pared lateral y el piso.
- **Cámara web**: toma la cámara del GLB; el FOV se ajusta al hueco entre paneles y `setViewOffset` centra el escritorio entre ellos.
- **CSS / vidrio**: contenedores con `overflow` oculto o con scroll que envuelven elementos con `backdrop-filter` pintan una franja clara en Chromium. Mantenerlos sin recorte.
- **`pointer-events` se hereda**: `.studio` tiene `none` para que el arrastre atraviese la UI, así que `.scene` (y `.hs`) necesitan `pointer-events: auto` explícito o la escena deja de poder girarse.
- **Peso**: GLB ≈ 2.7 MB (subió por la luz en vértices). Presupuesto: pocos MB.
- **No tocar** los cambios sin commitear del usuario en `Projects.tsx`, `interactions.ts` y `global.css` (pertenecen a `/clasico`).
- Probar escritorio en el panel del navegador es difícil (las capturas emuladas salen chicas); usar 1100×720 + zoom, o móvil 375×812.

## Pendientes

### Prioridad alta
- [ ] **Commit** en una rama nueva (incluye decidir qué hacer con los cambios sin commitear de `/clasico`).
- [ ] Actualizar `3d/STYLE_GUIDE.md`: el acento ahora es **rojo `#D10F14`** (dice azul), describir iluminación horneada y el cuarto.
- [ ] Revisar en un navegador de escritorio real (1440×900 y 1920×1080) que la composición, el vidrio y las ventanas se vean bien.

### Escena 3D
- [ ] Íconos de perfil y base de datos se enciman en algunos ángulos: separar nodos o ajustar altura de los anclajes.
- [ ] Al girar a la izquierda, las cajas apiladas (`det_store_*`) quedan muy cerca de la cámara.
- [ ] Las líneas (`rail_*`, curvas) y el cable no tienen luz horneada; se iluminan en tiempo real. Convertirlas a malla y hornearlas si desentonan.
- [ ] Revisar el mueble alto y la planta grande de la izquierda (casi no se ven en el encuadre por defecto).
- [ ] Optimizar peso: unir las 40 teclas del teclado en una malla; considerar bajar el piso a 1.5K.

### Web
- [x] SEO de `/clasico`: ahora `noindex, follow` y canonical a `/` (14 oct).
- [ ] Borrar `public/models/portfolio.glb` (400 KB, ya no se usa) si se confirma.
- [x] Móvil: pixel ratio 1.5 sin antialias; con ahorro de datos o 2G se queda el póster (14 oct).
- [ ] Si aún pesa en celulares: GLB reducido para móvil (unir teclas, piso a 1.5K).
- [ ] Probar accesibilidad de las ventanas (foco, lectores de pantalla) y el cambio de idioma con todas las ventanas.
- [ ] Revisar la franja clara superior en móvil (podría ser solo la iluminación de la pared).
