# Guía de estilo 3D: Portafolio Frank Huerta

Contexto fijo para Claude Code y Blender. Se modifica según vayamos viendo resultados.

## Concepto
Un **sistema flotante**: nodos de arquitectura (cada uno es una sección o proyecto) unidos por líneas con pulso de luz. Es una metáfora de backend: se ve *cómo* piensa y construye Frank.

## Paleta
| Rol | Valor | Uso |
|---|---|---|
| Fondo | `#EEF0F4` (gris frío muy claro) | Fondo de escena y de la web |
| Arcilla base | `#F7F8FA` | Cuerpo de todas las piezas |
| Arcilla sombra | `#D9DDE5` | Piezas secundarias, bases |
| Tinta | `#1B2030` | Texto web, detalles mínimos |
| **Acento** | `#2F5BFF` (azul eléctrico) | Emisivo: líneas, pulsos, iconos, un detalle por pieza |

Regla: **un solo acento**. Nada de segundo color. Cada pieza lleva como máximo un detalle azul.

## Forma
- Todos los bordes con el mismo bevel/radio (≈ 0.06 m en piezas de 1 m).
- Proporciones "gordas" tipo juguete; sin aristas vivas ni detalles finos.
- Los nodos se apoyan en una **base/pedestal modular** reutilizable (misma huella en todos).
- Iconos del nodo en relieve simple, no texto.

## Material
- Arcilla mate: roughness ≈ 0.85, sin metalness, sin reflejos.
- Emisivo solo en acento: líneas de conexión, iconos, un LED por nodo.
- Luz suave: área grande + entorno (HDRI) claro. Sombras y AO horneadas en texturas.

## Cámara
- Perspectiva suave, FOV ≈ 25–30°, ángulo isométrico fijo (≈ 35° elevación, 45° azimut).
- En la web la cámara solo se desplaza/enfoca nodos con scroll; no rota libremente.

## Nodos (borrador)
| Nombre Blender | Representa | Sección web |
|---|---|---|
| `node_phone` | App móvil (Infinity Lens): pieza principal | Proyectos |
| `node_api` | APIs REST / backend | Sobre mí / Stack |
| `node_db` | PostgreSQL / MongoDB | Stack |
| `node_server` | Docker / Kubernetes / AWS | Stack |
| `node_storage` | Almacenamiento / cloud | Stack |
| `node_ai` | Chip de IA (flujo de trabajo con IA) | Sobre mí |
| `node_project_*` | Un nodo por proyecto | Proyectos |
| `node_mail` | Contacto | Contacto |
| `line_01…` | Conexiones | n/a (shader en web) |

## Convenciones Blender
- Unidades en metros, escala aplicada (Ctrl+A) en cada objeto.
- Una colección por nodo; nombres en snake_case en inglés.
- Pivote de cada nodo en el centro de su base.
- Guardar versión del `.blend` al final de cada etapa: `portfolio_v01_kit.blend`, `_v02_materials.blend`…

## Presupuesto de exportación
- GLB con Draco, objetos separados y nombrados.
- ≤ ~300k triángulos en total, texturas 1K–2K, archivo final de pocos MB.
- Fallback móvil: imagen/WebP estática o escena reducida.

## Archivos
- `3d/` → fuentes `.blend` y esta guía.
- `public/models/` → GLB final para la web.
