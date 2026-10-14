// Portfolio case studies. Every user-facing string is bilingual ({ es, en }) and is
// rendered as `data-es` / `data-en` so the existing language switch updates it.
// To add a project: drop its images in public/projects/<id>/ and append an entry here.

export type L = { es: string; en: string };

export type Figure =
  | { type: 'image'; src: string; alt: L; kind: 'phone' | 'wide' }
  | { type: 'terminal'; title: string; lines: { text: string; tone?: 'pr' | 'vi' | '' }[] };

export type Article = {
  title: L;
  idea: L;
  points: L[];
  shows: L;
  figures: Figure[];
};

export type Project = {
  id: string;
  title: string;
  tagline: L;
  summary: L;
  cover: string;
  coverAlt: L;
  chips: string[];
  facts: { label: L; value: L }[];
  stats: { value: string; label: L }[];
  link?: { href: string; label: L };
  gallery?: { src: string; alt: L }[];
  challenge: { intro: L; items: L[]; outro?: L };
  skills: L[];
  articles: Article[];
  learned: L[];
  improve: L[];
};

const BASE = '/projects';
const img = (project: string, name: string, alt: L, kind: 'phone' | 'wide' = 'phone'): Figure => ({
  type: 'image',
  src: `${BASE}/${project}/${name}.webp`,
  alt,
  kind,
});

const LENS = 'infinity-lens';
const LAND = 'infinity-lens-landing';
const PIXO = 'pixoteria';
const FOOD = 'food-and-co';
const CJ = 'cj-store';
const SANO = 'infinity-sano';

export const projects: Project[] = [
  /* ============================================================
     01 · INFINITY LENS (iOS app)
     ============================================================ */
  {
    id: LENS,
    title: 'Infinity Lens',
    tagline: {
      es: 'App de gastos para iPhone que lee tus tickets sin salir del teléfono.',
      en: 'An iPhone expense app that reads your receipts without leaving the phone.',
    },
    summary: {
      es: 'Swift nativo, OCR en el dispositivo, cifrado y publicación en App Store: de la idea a la tienda, con el código principal escrito en cuatro días.',
      en: 'Native Swift, on-device OCR, encryption and App Store release: from idea to store, with the core code written in four days.',
    },
    cover: `${BASE}/${LENS}/cover.webp`,
    coverAlt: { es: 'Tres pantallas de Infinity Lens: lista de gastos, lectura de ticket y resumen', en: 'Three Infinity Lens screens: expense list, receipt reading and summary' },
    chips: ['Swift', 'SwiftUI', 'SwiftData', 'Vision OCR', 'StoreKit 2'],
    facts: [
      { label: { es: 'Periodo', en: 'Period' }, value: { es: '25 sep – 13 oct 2026', en: 'Sep 25 – Oct 13, 2026' } },
      { label: { es: 'Plataforma', en: 'Platform' }, value: { es: 'iPhone (iOS)', en: 'iPhone (iOS)' } },
      { label: { es: 'Idiomas', en: 'Languages' }, value: { es: '6 idiomas', en: '6 languages' } },
    ],
    stats: [
      { value: '138', label: { es: 'commits en 4 días', en: 'commits in 4 days' } },
      { value: '318', label: { es: 'pruebas automáticas', en: 'automated tests' } },
      { value: '0', label: { es: 'datos que salen del teléfono', en: 'data leaving the phone' } },
      { value: '11', label: { es: 'fichas de App Store', en: 'App Store listings' } },
    ],
    link: { href: 'https://lens.infinitydev.agency', label: { es: 'Ver el sitio del producto', en: 'Visit the product site' } },
    gallery: [
      { src: `${BASE}/${LENS}/tienda-01-lista.webp`, alt: { es: 'Lista de gastos', en: 'Expense list' } },
      { src: `${BASE}/${LENS}/tienda-02-escanear.webp`, alt: { es: 'Confirmar un ticket leído', en: 'Confirming a scanned receipt' } },
      { src: `${BASE}/${LENS}/tienda-03-calendario.webp`, alt: { es: 'Calendario de pagos', en: 'Payments calendar' } },
      { src: `${BASE}/${LENS}/tienda-04-suscripciones.webp`, alt: { es: 'Suscripciones', en: 'Subscriptions' } },
      { src: `${BASE}/${LENS}/tienda-05-resumen.webp`, alt: { es: 'Resumen con gráficas', en: 'Summary with charts' } },
      { src: `${BASE}/${LENS}/tienda-06-presupuestos.webp`, alt: { es: 'Presupuestos', en: 'Budgets' } },
    ],
    challenge: {
      intro: {
        es: 'Quería una app de gastos donde bastara fotografiar el ticket, pero con tres condiciones que se llevan mal entre sí:',
        en: 'I wanted an expense app where snapping the receipt is enough, but with three conditions that pull in different directions:',
      },
      items: [
        { es: 'Que los datos no salgan del teléfono: sin servidor, sin cuenta, sin internet.', en: 'Data never leaves the phone: no server, no account, no internet.' },
        { es: 'Que no se equivoque en silencio: un total mal leído es peor que un total vacío.', en: 'It never fails silently: a misread total is worse than an empty one.' },
        { es: 'Que fuera un producto, no un ejercicio: idiomas, accesibilidad, modelo de negocio y publicación.', en: 'It had to be a product, not an exercise: languages, accessibility, business model and release.' },
      ],
      outro: {
        es: 'Además venía de React y no conocía Swift: el proyecto también fue aprender una plataforma nueva.',
        en: 'On top of that, I came from React and did not know Swift: the project was also about learning a new platform.',
      },
    },
    skills: [
      { es: 'Desarrollo nativo iOS (SwiftUI, SwiftData, Swift Charts)', en: 'Native iOS development (SwiftUI, SwiftData, Swift Charts)' },
      { es: 'OCR y extracción de datos con Vision, sin LLM', en: 'OCR and data extraction with Vision, no LLM' },
      { es: 'Arquitectura con lógica pura y 318 pruebas', en: 'Architecture with pure logic and 318 tests' },
      { es: 'Diseño de producto y modelo gratis / Pro', en: 'Product design and free / Pro model' },
      { es: 'Privacidad y criptografía aplicada', en: 'Privacy and applied cryptography' },
      { es: 'Accesibilidad medida (WCAG)', en: 'Measured accessibility (WCAG)' },
      { es: 'Internacionalización en 6 idiomas', en: 'Internationalization in 6 languages' },
      { es: 'Publicación en App Store', en: 'App Store release' },
      { es: 'IA como herramienta de ingeniería', en: 'AI as an engineering tool' },
    ],
    articles: [
      {
        title: { es: 'Aprender Swift construyendo, en cuatro días', en: 'Learning Swift by building, in four days' },
        idea: { es: 'Decidir con evidencia y avanzar en pasos pequeños.', en: 'Decide with evidence and move in small steps.' },
        points: [
          { es: 'Evalué React Native + Expo, donde me siento cómodo, y lo descarté para ir nativo: el OCR y el escáner de Apple, los widgets y Face ID son de primera clase en Swift. Quedó escrito en el plan.', en: 'I evaluated React Native + Expo, where I am comfortable, and dropped it to go native: Apple OCR and document scanner, widgets and Face ID are first-class in Swift. The decision is written in the plan.' },
          { es: 'Trabajé en pasos pequeños explicados: antes de cada pieza de código, qué hace y por qué. Así entendí lo que construía en vez de pegar código.', en: 'I worked in small, explained steps: before each piece of code, what it does and why. That way I understood what I was building instead of pasting code.' },
          { es: 'Ritmo real del historial de git: 5 commits el día 9, 31 el 10, 72 el 11 y 29 el 12. Cada commit es una función o corrección.', en: 'Real pace from the git history: 5 commits on day 9, 31 on the 10th, 72 on the 11th and 29 on the 12th. Each commit is a feature or a fix.' },
        ],
        shows: { es: 'Que aprendo una plataforma nueva rápido y dejo rastro de mis decisiones.', en: 'That I learn a new platform fast and leave a trail of my decisions.' },
        figures: [img(LENS, 'detalle-ticket', { es: 'Detalle de un gasto con factura y garantía', en: 'Expense detail with invoice and warranty' })],
      },
      {
        title: { es: 'Leer un ticket sin inteligencia artificial', en: 'Reading a receipt without AI' },
        idea: { es: 'OCR de Apple + reglas, y medir antes de creer.', en: 'Apple OCR + rules, and measure before you believe.' },
        points: [
          { es: 'El plan original usaba un LLM de 2B en el teléfono. Medí primero: Vision + reglas ya alcanzaba el criterio, así que el LLM quedó diferido. Menos memoria, menos riesgo, sin descarga de 1.5 GB.', en: 'The original plan used a 2B LLM on the phone. I measured first: Vision + rules already met the bar, so the LLM was deferred. Less memory, less risk, no 1.5 GB download.' },
          { es: 'Tres formas de leer el total que se contrastan: la etiqueta, efectivo menos cambio y el importe con letra. Si dos coinciden, la app lo dice; si chocan, deja el campo vacío.', en: 'Three ways to read the total, cross-checked: the label, cash minus change and the amount written in words. If two agree the app says so; if they clash it leaves the field empty.' },
          { es: 'Regla de diseño: preferir vacío a equivocado. Resultado de referencia con mi herramienta ocr-check: total 78 %, fecha 93 %, comercio 100 %, categoría 84 % y cero equivocados.', en: 'Design rule: prefer empty over wrong. Reference result from my ocr-check tool: total 78%, date 93%, merchant 100%, category 84% and zero wrong.' },
          { es: 'Honestidad: esas cifras salen de unas 20 fotos propias y están sesgadas. Lo dejé escrito y no seguí afinando para no sobreajustar.', en: 'Honesty: those figures come from about 20 of my own photos and are biased. I wrote it down and stopped tuning to avoid overfitting.' },
        ],
        shows: { es: 'Pensamiento crítico con datos, y saber cuándo no usar IA.', en: 'Critical thinking with data, and knowing when not to use AI.' },
        figures: [
          img(LENS, 'ocr-pdf-escaneado-cfe', { es: 'Lectura de un recibo en PDF escaneado', en: 'Reading a scanned PDF bill' }),
          img(LENS, 'precision-ocr', { es: 'Pantalla que mide la precisión del OCR', en: 'Screen that measures OCR accuracy' }),
        ],
      },
      {
        title: { es: 'TicketKit: la lógica que no depende de la pantalla', en: 'TicketKit: logic that does not depend on the screen' },
        idea: { es: 'Separar lo que se puede probar de lo que solo se pinta.', en: 'Separate what can be tested from what is only painted.' },
        points: [
          { es: 'Todo lo que no es interfaz vive en un paquete Swift aparte: OCR, reglas, formatos de dinero, filtros, calendario, recordatorios y cifrado.', en: 'Everything that is not UI lives in a separate Swift package: OCR, rules, money formats, filters, calendar, reminders and encryption.' },
          { es: '318 pruebas automáticas que corren en segundos, sin simulador. La app solo pinta.', en: '318 automated tests that run in seconds, no simulator needed. The app only paints.' },
          { es: 'Reglas de proyecto escritas tras errores reales, como campos nuevos siempre opcionales para que los datos existentes migren solos. Migración probada con una base del esquema anterior.', en: 'Project rules written after real mistakes, like new fields always optional so existing data migrates on its own. Migration tested with a database from the previous schema.' },
        ],
        shows: { es: 'Que lo que construyo se puede mantener y cambiar sin romper datos de usuarios.', en: 'That what I build can be maintained and changed without breaking user data.' },
        figures: [
          {
            type: 'terminal',
            title: 'architecture.txt',
            lines: [
              { text: '$ tree --depth 1', tone: 'pr' },
              { text: 'TicketKit/   ~6,800 lines + tests', tone: 'vi' },
              { text: '  OCR · rules · money · filters', tone: '' },
              { text: '  calendar · reminders · crypto', tone: '' },
              { text: 'InfinityLens/   ~9,700 lines SwiftUI', tone: 'vi' },
              { text: 'ocr-check/   shared CLI tool', tone: 'vi' },
              { text: '$ swift test', tone: 'pr' },
              { text: '318 tests passed ✔', tone: '' },
            ],
          },
        ],
      },
      {
        title: { es: 'Bugs de verdad (y cómo los encontré)', en: 'Real bugs (and how I found them)' },
        idea: { es: 'Depurar con método y documentar para no repetir.', en: 'Debug methodically and document so it never repeats.' },
        points: [
          { es: 'El campo de monto: pegar 12.50 en un iPhone con región Brasil, que usa coma decimal, corrompía el valor. Reescribí el campo en UIKit para releer lo que de verdad tiene, conservar el cursor y respetar la región.', en: 'The amount field: pasting 12.50 on an iPhone set to Brazil, which uses a decimal comma, corrupted the value. I rewrote the field in UIKit to re-read what it actually holds, keep the cursor and respect the region.' },
          { es: 'Un cierre brusco de la app perdía el gasto recién guardado: SwiftData autoguarda tarde. Añadí un guardado explícito.', en: 'An abrupt app close lost the expense just saved: SwiftData autosaves late. I added an explicit save.' },
          { es: 'También el teclado que no se cerraba, las pastillas de filtro que se salían de la pantalla y una fila que quedaba marcada al seleccionar.', en: 'Also the keyboard that would not close, filter pills that overflowed the screen and a row that stayed highlighted after selecting.' },
        ],
        shows: { es: 'Depuración metódica y documentación para no repetir errores.', en: 'Methodical debugging and documentation to avoid repeating mistakes.' },
        figures: [img(LENS, 'bug-monto-region-brasil', { es: 'El campo de monto con región Brasil', en: 'The amount field with the Brazil region' })],
      },
      {
        title: { es: 'Decidir qué es gratis y qué es Pro', en: 'Deciding what is free and what is Pro' },
        idea: { es: 'Criterio de producto, no solo de código.', en: 'Product judgment, not just code.' },
        points: [
          { es: 'Primero pensé en gratis hasta 30 gastos; lo reemplacé por una compra única Pro con todo lo básico gratis y sin límite. Lo gratis atrae y da reseñas; lo Pro sirve a quien tiene pagos recurrentes.', en: 'I first planned free up to 30 expenses; I replaced it with a one-time Pro purchase and everything basic free and unlimited. Free attracts users and reviews; Pro serves people with recurring payments.' },
          { es: 'La frontera es por función, no por categoría, y lo ya capturado nunca se bloquea. StoreKit 2 sin servidor: la compra la procesa Apple y la app no recibe nombre ni tarjeta.', en: 'The line is per feature, not per category, and what was already captured is never locked. StoreKit 2 with no server: Apple processes the purchase and the app never sees a name or card.' },
          { es: 'Una decisión que rechacé: el tipo de cambio automático por internet. Rompía la promesa sin internet, el principal diferenciador. Quedó manual, con la opción de usar el último.', en: 'A decision I rejected: automatic exchange rates over the internet. It broke the no-internet promise, the main differentiator. It stays manual, with a use-the-last option.' },
        ],
        shows: { es: 'Que decido con el producto en mente: qué se promete y qué se sacrifica.', en: 'That I decide with the product in mind: what is promised and what is sacrificed.' },
        figures: [
          img(LENS, 'pro-compra', { es: 'Pantalla de compra de Infinity Lens Pro', en: 'Infinity Lens Pro purchase screen' }),
          img(LENS, 'tipo-de-cambio', { es: 'Tipo de cambio manual', en: 'Manual exchange rate' }),
        ],
      },
      {
        title: { es: 'Privacidad y cifrado de verdad', en: 'Privacy and real encryption' },
        idea: { es: 'La privacidad como decisión de diseño, no como texto legal al final.', en: 'Privacy as a design decision, not legal text at the end.' },
        points: [
          { es: 'Sin internet: la app no hace conexiones propias. La ficha de App Store dice datos no recopilados y es verdad.', en: 'No internet: the app makes no connections of its own. The App Store listing says data not collected, and it is true.' },
          { es: 'Respaldo cifrado con llave derivada por PBKDF2-HMAC-SHA256 (600 000 vueltas) y sal aleatoria, y cifrado AES-256-GCM, que además detecta alteraciones. La app no guarda la contraseña.', en: 'Encrypted backup with a key derived through PBKDF2-HMAC-SHA256 (600,000 rounds) and a random salt, plus AES-256-GCM encryption, which also detects tampering. The app never stores the password.' },
          { es: 'Restaurar solo agrega, nunca borra ni reemplaza, y cargar dos veces el mismo respaldo no duplica. Face ID opcional que solo se activa si el usuario se autentica en ese momento.', en: 'Restore only adds, never deletes or replaces, and loading the same backup twice does not duplicate. Optional Face ID that only turns on if the user authenticates right then.' },
          { es: 'Regla del proyecto: si una función cambia lo que la app hace con los datos, se actualizan a la vez la pantalla de privacidad, la política pública, el manifiesto de Apple y las etiquetas de App Store Connect.', en: 'Project rule: if a feature changes what the app does with data, the privacy screen, the public policy, Apple manifest and App Store Connect labels are updated together.' },
        ],
        shows: { es: 'Que trato la privacidad como parte de la arquitectura.', en: 'That I treat privacy as part of the architecture.' },
        figures: [
          img(LENS, 'respaldo-cifrado', { es: 'Creación de un respaldo cifrado', en: 'Creating an encrypted backup' }),
          img(LENS, 'privacidad', { es: 'Pantalla de privacidad dentro de la app', en: 'In-app privacy screen' }),
        ],
      },
      {
        title: { es: 'Accesibilidad que se mide', en: 'Accessibility you can measure' },
        idea: { es: 'Convertir "debería ser accesible" en una cifra verificable.', en: 'Turn "it should be accessible" into a verifiable number.' },
        points: [
          { es: 'Letra grande hasta accesibilidad extra grande: revisé lista, detalle, captura y resumen en ese tamaño y corregí lo que se rompía.', en: 'Large type up to extra-large accessibility sizes: I reviewed list, detail, capture and summary at that size and fixed what broke.' },
          { es: 'Contraste medido, no a ojo: escribí una herramienta que calcula el contraste WCAG del texto pequeño con los colores reales de iOS y subí todo a 4.5:1.', en: 'Contrast measured, not eyeballed: I wrote a tool that computes WCAG contrast for small text with the real iOS colors and raised everything to 4.5:1.' },
          { es: 'Etiquetas de VoiceOver en filas, botones y gráficas. Modo claro y oscuro probados en cada pantalla nueva.', en: 'VoiceOver labels on rows, buttons and charts. Light and dark mode tested on every new screen.' },
        ],
        shows: { es: 'Que la accesibilidad es parte de mi definición de terminado.', en: 'That accessibility is part of my definition of done.' },
        figures: [
          img(LENS, 'accesibilidad-letra-grande', { es: 'La lista de gastos con letra muy grande', en: 'The expense list at a very large type size' }),
          img(LENS, 'contraste-despues', { es: 'Resumen con contraste corregido', en: 'Summary with corrected contrast' }),
        ],
      },
      {
        title: { es: 'Seis idiomas, no solo traducción', en: 'Six languages, not just translation' },
        idea: { es: 'Pensar el producto para otros mercados.', en: 'Designing the product for other markets.' },
        points: [
          { es: 'Interfaz de unos 500 textos en español, inglés, portugués de Brasil, francés, alemán e italiano, con catálogos de textos de Xcode.', en: 'An interface of about 500 strings in Spanish, English, Brazilian Portuguese, French, German and Italian, using Xcode string catalogs.' },
          { es: 'El OCR también entiende tickets en inglés y portugués: efectivo y cambio, dinheiro y troco, fechas como 10 de outubro de 2026 y reales.', en: 'The OCR also understands receipts in English and Portuguese: cash and change, dinheiro and troco, dates like 10 de outubro de 2026 and reais.' },
          { es: 'Formatos por región: 1,234.56 o 1.234,56 y el orden de la fecha según el teléfono. Aprendí una trampa: un texto que pasa por una variable String no se traduce solo.', en: 'Regional formats: 1,234.56 or 1.234,56 and date order based on the phone. I learned a trap: text passed through a String variable is not translated automatically.' },
          { es: 'Honestidad: las traducciones no tienen revisión nativa; está anotado como pendiente.', en: 'Honesty: translations have no native review yet; it is noted as pending.' },
        ],
        shows: { es: 'Que diseño pensando en usuarios de otros países.', en: 'That I design with users in other countries in mind.' },
        figures: [
          img(LENS, 'idioma-ingles', { es: 'La app en inglés', en: 'The app in English' }),
          img(LENS, 'idioma-portugues', { es: 'La app en portugués de Brasil', en: 'The app in Brazilian Portuguese' }),
        ],
      },
      {
        title: { es: 'Del ícono a la tienda', en: 'From icon to the store' },
        idea: { es: 'Conocer el proceso completo, no solo el código.', en: 'Knowing the whole process, not just the code.' },
        points: [
          { es: 'Ícono: probé varias ideas y elegí un visor con infinito y ticket, en negro, con paleta negro y grafito.', en: 'Icon: I tried several ideas and picked a viewfinder with an infinity symbol and a receipt, in black, with a black and graphite palette.' },
          { es: 'Ficha de App Store en 11 variantes (México, España, EE. UU., Reino Unido, Australia, Canadá, Brasil, Portugal, Francia, Alemania e Italia) generadas por un script que valida los límites de Apple.', en: 'App Store listing in 11 variants (Mexico, Spain, US, UK, Australia, Canada, Brazil, Portugal, France, Germany and Italy) generated by a script that validates Apple limits.' },
          { es: 'Capturas de tienda compuestas con herramienta propia, widgets de pantalla de inicio y bloqueada, y una landing con política de privacidad pública.', en: 'Store screenshots composed with my own tool, home and lock screen widgets, and a landing page with a public privacy policy.' },
        ],
        shows: { es: 'Que llevo una app de la idea a la tienda.', en: 'That I take an app from idea to the store.' },
        figures: [
          img(LENS, 'icono-pantalla-inicio', { es: 'El ícono en la pantalla de inicio', en: 'The icon on the home screen' }),
          img(LENS, 'widget-proximos-pagos', { es: 'Widget de próximos pagos', en: 'Upcoming payments widget' }),
        ],
      },
      {
        title: { es: 'Cómo trabajé con IA en este proyecto', en: 'How I worked with AI on this project' },
        idea: { es: 'No es "la IA lo hizo": es cómo la dirijo.', en: 'Not "the AI did it": it is how I direct it.' },
        points: [
          { es: 'Documentos como memoria compartida: plan y descartes, características actuales, pendientes, requisitos de producción y una guía para retomar sin contexto.', en: 'Documents as shared memory: plan and rejected options, current features, to-dos, production requirements and a guide to resume without context.' },
          { es: 'Reglas escritas tras cada error y pasos pequeños explicados, para entender Swift en vez de depender de él.', en: 'Rules written after every mistake and small explained steps, to understand Swift instead of depending on it.' },
          { es: 'Verificar, no confiar: cada pantalla se comprobó en el simulador con capturas guardadas por fecha y las pruebas corren al terminar cada parte. Se anota también qué no se probó.', en: 'Verify, do not trust: every screen was checked in the simulator with date-stamped captures and tests run after each part. What was not tested is also written down.' },
          { es: 'Lo que decido yo siempre: arquitectura, qué es gratis y qué es Pro, lo que choca con la privacidad y lo que se publica.', en: 'What I always decide: architecture, what is free and what is Pro, anything that clashes with privacy and what gets published.' },
        ],
        shows: { es: 'Dirección técnica de la IA, con rastro y verificación.', en: 'Technical direction of AI, with a trail and verification.' },
        figures: [
          {
            type: 'terminal',
            title: 'docs/',
            lines: [
              { text: '$ ls docs/', tone: 'pr' },
              { text: 'PLAN.md            plan + discarded', tone: 'vi' },
              { text: 'CARACTERISTICAS.md what it does today', tone: '' },
              { text: 'PENDIENTES.md      status', tone: '' },
              { text: 'PRODUCCION.md      what is missing', tone: '' },
              { text: 'SESIONES-4-Y-5.md  resume guide', tone: '' },
              { text: '$ git commit  # only when I ask', tone: 'pr' },
            ],
          },
        ],
      },
    ],
    learned: [
      { es: 'Medir primero: el LLM que parecía necesario no hizo falta.', en: 'Measure first: the LLM that seemed necessary was not needed.' },
      { es: 'Prometer poco y cumplir: "sin internet" fue una decisión de producto que dejó fuera una función útil.', en: 'Promise little and deliver: "no internet" was a product decision that left out a useful feature.' },
      { es: 'Una función no está terminada hasta que tiene textos traducidos, privacidad actualizada y pruebas.', en: 'A feature is not done until it has translated text, updated privacy and tests.' },
    ],
    improve: [
      { es: 'Probar todo en un iPhone real: escáner de cámara, VoiceOver, widgets, Face ID y la compra con la App Store real.', en: 'Test everything on a real iPhone: camera scanner, VoiceOver, widgets, Face ID and the purchase on the real App Store.' },
      { es: 'Más variedad de tickets para validar el OCR (hoy son unas 20 fotos, con sesgo).', en: 'More receipt variety to validate the OCR (today about 20 photos, with bias).' },
      { es: 'Revisión nativa de las traducciones y reglas de OCR propias para Francia, Alemania e Italia.', en: 'Native review of translations and dedicated OCR rules for France, Germany and Italy.' },
      { es: 'Sincronización con iCloud y versión para iPad (hoy no existen).', en: 'iCloud sync and an iPad version (neither exists today).' },
    ],
  },

  /* ============================================================
     02 · INFINITY LENS LANDING (web)
     ============================================================ */
  {
    id: LAND,
    title: 'Infinity Lens Landing',
    tagline: {
      es: 'Web de producto en seis idiomas: rápida, sin rastreadores y con SEO completo.',
      en: 'A six-language product site: fast, tracker-free and fully SEO-ready.',
    },
    summary: {
      es: 'Astro + Tailwind desplegado en Cloudflare, con Lighthouse 100 en rendimiento y SEO.',
      en: 'Astro + Tailwind deployed on Cloudflare, scoring Lighthouse 100 in performance and SEO.',
    },
    cover: `${BASE}/${LAND}/cover.webp`,
    coverAlt: { es: 'Portada de la landing de Infinity Lens', en: 'Infinity Lens landing page hero' },
    chips: ['Astro', 'React', 'Tailwind 4', 'i18n + SEO', 'Cloudflare'],
    facts: [
      { label: { es: 'Periodo', en: 'Period' }, value: { es: '15 – 17 sep 2026', en: 'Sep 15 – 17, 2026' } },
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Sitio web de producto', en: 'Product website' } },
      { label: { es: 'Estado', en: 'Status' }, value: { es: 'Publicado', en: 'Live' } },
    ],
    stats: [
      { value: '100', label: { es: 'Lighthouse: rendimiento', en: 'Lighthouse: performance' } },
      { value: '100', label: { es: 'Lighthouse: SEO', en: 'Lighthouse: SEO' } },
      { value: '6', label: { es: 'idiomas con rutas propias', en: 'languages with their own routes' } },
      { value: '0.6s', label: { es: 'al primer contenido visible', en: 'to first contentful paint' } },
    ],
    link: { href: 'https://lens.infinitydev.agency', label: { es: 'Ver el sitio en vivo', en: 'Visit the live site' } },
    challenge: {
      intro: {
        es: 'Mi app necesitaba una página antes de existir en la tienda: App Store exige una política de privacidad pública y un enlace de soporte, y yo quería además una portada que explicara la app en segundos. Con tres condiciones:',
        en: 'My app needed a website before it even existed in the store: App Store requires a public privacy policy and a support link, and I also wanted a hero that explains the app in seconds. With three conditions:',
      },
      items: [
        { es: 'Coherente con la promesa de la app: sin rastreadores ni cookies de seguimiento.', en: 'Consistent with the app promise: no trackers and no tracking cookies.' },
        { es: 'Multilingüe de verdad, porque la app ya estaba en seis idiomas.', en: 'Genuinely multilingual, because the app already shipped in six languages.' },
        { es: 'Rápida y barata de mantener: sin servidor ni base de datos.', en: 'Fast and cheap to maintain: no server and no database.' },
      ],
    },
    skills: [
      { es: 'Astro: sitio estático e islas de React', en: 'Astro: static site and React islands' },
      { es: 'Tailwind CSS 4 y sistema de diseño con tokens', en: 'Tailwind CSS 4 and a token-based design system' },
      { es: 'Identidad visual: logo y paleta', en: 'Visual identity: logo and palette' },
      { es: 'Internacionalización y SEO multilingüe', en: 'Internationalization and multilingual SEO' },
      { es: 'Textos legales y privacidad', en: 'Legal copy and privacy' },
      { es: 'Diseño responsive', en: 'Responsive design' },
      { es: 'Despliegue en Cloudflare', en: 'Cloudflare deployment' },
      { es: 'IA como herramienta de ingeniería', en: 'AI as an engineering tool' },
    ],
    articles: [
      {
        title: { es: 'Astro: HTML por defecto, JavaScript solo donde hace falta', en: 'Astro: HTML by default, JavaScript only where needed' },
        idea: { es: 'Elegir la herramienta por lo que necesita el sitio.', en: 'Pick the tool for what the site actually needs.' },
        points: [
          { es: 'Es una página de contenido, no una aplicación. Astro genera HTML estático y manda JavaScript únicamente a los componentes con interacción (menú, pasos y preguntas frecuentes, en React). El resto no pesa nada.', en: 'It is a content page, not an application. Astro generates static HTML and ships JavaScript only to the interactive components (menu, steps and FAQ, in React). The rest weighs nothing.' },
          { es: 'Descarté un framework de aplicación completo: aquí no hay estado ni datos que lo justifiquen. Son unas 1 400 líneas entre componentes y textos.', en: 'I ruled out a full application framework: there is no state or data to justify one. About 1,400 lines across components and copy.' },
          { es: 'Medido con Lighthouse sobre el sitio publicado: Rendimiento 100, Accesibilidad 96, Buenas prácticas 96 y SEO 100.', en: 'Measured with Lighthouse on the live site: Performance 100, Accessibility 96, Best Practices 96 and SEO 100.' },
        ],
        shows: { es: 'Que elijo con criterio, no por moda.', en: 'That I choose with judgment, not by trend.' },
        figures: [img(LAND, 'lighthouse-cifras', { es: 'Resultados de Lighthouse del sitio publicado', en: 'Lighthouse results of the live site' }, 'wide')],
      },
      {
        title: { es: 'Una identidad en negro y grafito', en: 'A black and graphite identity' },
        idea: { es: 'Del ícono a una paleta, y de la paleta a reglas.', en: 'From icon to palette, and from palette to rules.' },
        points: [
          { es: 'El logo cuenta la app: un visor de cámara que encuadra un infinito, con una tira de ticket de borde rasgado detrás. Dice el nombre, la acción y el objeto sin texto.', en: 'The logo tells the app: a camera viewfinder framing an infinity symbol, with a torn-edge receipt strip behind it. It says the name, the action and the object without text.' },
          { es: 'Paleta neutra sin color de acento, a propósito: diferenciarse de las apps de finanzas azules y verdes y dar aspecto premium.', en: 'A neutral palette with no accent color, on purpose: stand apart from blue and green finance apps and feel premium.' },
          { es: 'Tokens en Tailwind 4: ningún color escrito a mano en los componentes. Reglas escritas en el README, como texto blanco sobre grafito y nunca gris medio porque pierde contraste.', en: 'Tokens in Tailwind 4: no hand-written colors in components. Rules written in the README, like white text on graphite and never mid-gray because it loses contrast.' },
        ],
        shows: { es: 'Criterio visual y sistema, no solo "se ve bien".', en: 'Visual judgment and a system, not just "looks good".' },
        figures: [img(LAND, 'desktop-02-numeros-y-mision', { es: 'Sección de números y misión', en: 'Numbers and mission section' }, 'wide')],
      },
      {
        title: { es: 'Seis idiomas sin romper el SEO', en: 'Six languages without breaking SEO' },
        idea: { es: 'Que cada idioma sea una página real, no un traductor.', en: 'Make each language a real page, not a translator widget.' },
        points: [
          { es: 'Todos los textos en un archivo con un bloque por idioma; cada página solo recibe el idioma. Agregar uno son cuatro pasos documentados.', en: 'All copy in one file with a block per language; each page only receives the language. Adding one takes four documented steps.' },
          { es: 'Rutas por idioma: español sin prefijo y /en, /pt, /fr, /de, /it. En portugués hasta los nombres de ruta cambian.', en: 'Routes per language: Spanish without prefix and /en, /pt, /fr, /de, /it. In Portuguese even the route names change.' },
          { es: 'Metadatos que salen solos de la lista de idiomas: canonical, hreflang con x-default, Open Graph y mapa del sitio con las versiones enlazadas. Más JSON-LD de aplicación móvil por idioma.', en: 'Metadata generated from the language list: canonical, hreflang with x-default, Open Graph and a sitemap with linked versions. Plus mobile-app JSON-LD per language.' },
          { es: 'Honestidad: portugués, francés, alemán e italiano no tienen revisión nativa; está anotado en el README.', en: 'Honesty: Portuguese, French, German and Italian have no native review; it is noted in the README.' },
        ],
        shows: { es: 'Internacionalización pensada como arquitectura.', en: 'Internationalization designed as architecture.' },
        figures: [img(LAND, 'idioma-pt-portada', { es: 'La portada en portugués', en: 'The hero in Portuguese' }, 'wide')],
      },
      {
        title: { es: 'Textos legales que se mantienen al día', en: 'Legal text that stays current' },
        idea: { es: 'Lo que la app promete, la web lo dice igual.', en: 'What the app promises, the site says identically.' },
        points: [
          { es: 'La app promete sin internet y sin datos recopilados; la política pública tiene que decir exactamente lo mismo.', en: 'The app promises no internet and no data collected; the public policy must say exactly the same.' },
          { es: 'Regla: cuando una función cambia lo que se hace con los datos, se actualizan a la vez la pantalla de la app, la política de la web, el manifiesto de Apple y las etiquetas de App Store Connect.', en: 'Rule: when a feature changes what happens to data, the app screen, the web policy, the Apple manifest and the App Store Connect labels are updated together.' },
          { es: 'Términos y soporte completos en cada idioma.', en: 'Full terms and support pages in every language.' },
        ],
        shows: { es: 'Que entiendo el cumplimiento que exigen las tiendas.', en: 'That I understand the compliance the stores require.' },
        figures: [img(LAND, 'desktop-05-privacidad', { es: 'Sección de privacidad de la landing', en: 'Privacy section of the landing' }, 'wide')],
      },
      {
        title: { es: 'Responsive: de la mano al escritorio', en: 'Responsive: from hand to desktop' },
        idea: { es: 'Diseño que funciona en cualquier pantalla y cómo verificarlo.', en: 'Design that works on any screen and how to verify it.' },
        points: [
          { es: 'La cuadrícula de nueve funciones pasa de una composición irregular a una sola columna.', en: 'The nine-feature grid goes from an irregular layout to a single column.' },
          { es: 'Menú hamburguesa y selector de idioma en pantallas chicas; preguntas frecuentes como acordeón en React.', en: 'Hamburger menu and language selector on small screens; FAQ as a React accordion.' },
          { es: 'Para capturar en móvil usé un navegador sin ventana dentro de un iframe de 390 px, porque el mínimo del navegador es mayor al ancho de un iPhone.', en: 'To capture mobile I used a headless browser inside a 390 px iframe, because the browser minimum width is larger than an iPhone.' },
        ],
        shows: { es: 'Que verifico el diseño en pantalla real, no solo lo imagino.', en: 'That I verify design on real screens instead of just imagining it.' },
        figures: [
          img(LAND, 'desktop-04-funciones', { es: 'Las nueve funciones en escritorio', en: 'The nine features on desktop' }, 'wide'),
          img(LAND, 'movil-06-preguntas', { es: 'Preguntas frecuentes en móvil', en: 'FAQ on mobile' }),
        ],
      },
      {
        title: { es: 'Desplegar en Cloudflare', en: 'Deploying on Cloudflare' },
        idea: { es: 'Llevar una web a producción de punta a punta.', en: 'Taking a website to production end to end.' },
        points: [
          { es: 'Cloudflare Workers con archivos estáticos: un comando construye con Astro y sube la carpeta resultante. Sin servidor que mantener ni base de datos que proteger.', en: 'Cloudflare Workers with static assets: one command builds with Astro and uploads the output folder. No server to maintain and no database to protect.' },
          { es: 'Dominio propio y correo de soporte configurados. Primero se publicó en una dirección de prueba y se pasó al dominio real actualizando a la vez la URL del sitio, robots.txt y el sitemap.', en: 'Custom domain and support email configured. It first went live on a test address and moved to the real domain, updating the site URL, robots.txt and the sitemap together.' },
        ],
        shows: { es: 'Que publico y mantengo lo que construyo.', en: 'That I ship and maintain what I build.' },
        figures: [img(LAND, 'desktop-03-como-funciona', { es: 'Sección Cómo funciona', en: 'How it works section' }, 'wide')],
      },
      {
        title: { es: 'Cómo trabajé con IA en este proyecto', en: 'How I worked with AI on this project' },
        idea: { es: 'No es "la IA lo hizo": es cómo la dirijo.', en: 'Not "the AI did it": it is how I direct it.' },
        points: [
          { es: 'El README como contexto: estructura, comandos, paleta, reglas y pendientes escritos para que la IA, y yo en tres meses, retome sin releer el código.', en: 'The README as context: structure, commands, palette, rules and to-dos written so the AI, and me in three months, can resume without rereading the code.' },
          { es: 'Repositorio propio, separado de la app, y revisiones concretas pedidas en commits separados: SEO, vista en celulares y contraste.', en: 'Its own repository, separate from the app, and focused reviews requested in separate commits: SEO, phone view and contrast.' },
          { es: 'Verificar en navegador real: servidor local, capturas por idioma y revisión de consola antes de desplegar.', en: 'Verify in a real browser: local server, per-language captures and console review before deploying.' },
          { es: 'Lo que decido yo siempre: la identidad, qué se promete en el texto y qué se publica.', en: 'What I always decide: the identity, what the copy promises and what gets published.' },
        ],
        shows: { es: 'Dirección técnica con rastro y verificación.', en: 'Technical direction with a trail and verification.' },
        figures: [img(LAND, 'imagen-para-compartir-og', { es: 'Imagen para compartir generada desde una plantilla HTML', en: 'Share image generated from an HTML template' }, 'wide')],
      },
    ],
    learned: [
      { es: 'Una web de producto es parte del producto: la política legal es tan importante como la portada.', en: 'A product site is part of the product: the legal policy matters as much as the hero.' },
      { es: 'Documentar la paleta y las reglas hace que cualquiera mantenga la coherencia.', en: 'Documenting the palette and rules lets anyone keep things consistent.' },
      { es: 'Los idiomas son arquitectura, no un parche al final.', en: 'Languages are architecture, not a patch at the end.' },
    ],
    improve: [
      { es: 'Poner el enlace real de App Store y el precio: hoy dice "Muy pronto".', en: 'Add the real App Store link and price: today it says "Coming soon".' },
      { es: 'Actualizar las capturas de la app dentro de la landing: son de una versión anterior y están en español en los seis idiomas.', en: 'Update the in-app screenshots on the landing: they are from an earlier design and in Spanish in all six languages.' },
      { es: 'Contraste del texto gris pequeño de las páginas legales y subir Accesibilidad y Buenas prácticas de 96 a 100.', en: 'Contrast of the small gray text on legal pages, and raise Accessibility and Best Practices from 96 to 100.' },
      { es: 'Revisión nativa de las traducciones.', en: 'Native review of the translations.' },
    ],
  },

  /* ============================================================
     03 · PIXOTERÍA (iOS + Android game)
     ============================================================ */
  {
    id: PIXO,
    title: 'Pixotería',
    tagline: {
      es: 'Lotería mexicana multijugador: cada quien con su teléfono, sin cuentas ni servidor.',
      en: 'A multiplayer Mexican lotería: everyone on their own phone, no accounts, no server.',
    },
    summary: {
      es: 'React Native, red local entre teléfonos, nueve barajas en pixel art propio y camino completo a App Store y Google Play.',
      en: 'React Native, phone-to-phone local networking, nine original pixel-art decks and the full road to App Store and Google Play.',
    },
    cover: `${BASE}/${PIXO}/cover.webp`,
    coverAlt: { es: 'Landing de Pixotería con cartas de Día de Muertos', en: 'Pixotería landing with Day of the Dead cards' },
    chips: ['React Native', 'Expo', 'TypeScript', 'TCP + mDNS', 'Pixel art', 'Astro'],
    facts: [
      { label: { es: 'Periodo', en: 'Period' }, value: { es: 'Ago – oct 2026', en: 'Aug – Oct 2026' } },
      { label: { es: 'Plataformas', en: 'Platforms' }, value: { es: 'iOS y Android', en: 'iOS and Android' } },
      { label: { es: 'Rol', en: 'Role' }, value: { es: 'Producto, desarrollo, arte y publicación', en: 'Product, development, art and release' } },
      { label: { es: 'Estado', en: 'Status' }, value: { es: 'Próximamente en tiendas', en: 'Coming soon to the stores' } },
    ],
    stats: [
      { value: '9', label: { es: 'barajas', en: 'decks' } },
      { value: '54', label: { es: 'cartas por baraja', en: 'cards per deck' } },
      { value: '0', label: { es: 'servidores y cuentas', en: 'servers and accounts' } },
      { value: '0', label: { es: 'datos recopilados', en: 'data collected' } },
    ],
    gallery: [
      { src: `${BASE}/${PIXO}/menu.webp`, alt: { es: 'Menú principal', en: 'Main menu' } },
      { src: `${BASE}/${PIXO}/sala-de-espera.webp`, alt: { es: 'Sala de espera: los jugadores aparecen solos', en: 'Waiting room: players appear on their own' } },
      { src: `${BASE}/${PIXO}/mazo-muertos.webp`, alt: { es: 'Baraja Día de Muertos', en: 'Day of the Dead deck' } },
      { src: `${BASE}/${PIXO}/mazo-terror.webp`, alt: { es: 'Baraja Terror', en: 'Horror deck' } },
      { src: `${BASE}/${PIXO}/mazo-carroll.webp`, alt: { es: 'Baraja Carroll', en: 'Carroll deck' } },
      { src: `${BASE}/${PIXO}/mazo-grimm.webp`, alt: { es: 'Baraja Grimm', en: 'Grimm deck' } },
    ],
    challenge: {
      intro: {
        es: 'Quería una lotería que se jugara como en la mesa: varias personas, cada quien con su teléfono, sin crear cuentas ni depender de un servidor. Eso plantea tres problemas a la vez:',
        en: 'I wanted a lotería that plays like the real tabletop game: several people, each on their own phone, with no accounts and no server. That raises three problems at once:',
      },
      items: [
        { es: 'Que los teléfonos se encuentren solos en la red.', en: 'Phones must find each other on the network by themselves.' },
        { es: 'Que el juego esté sincronizado sin una nube que lo arbitre.', en: 'The game must stay in sync without a cloud refereeing it.' },
        { es: 'Que se vea y suene como lotería, con identidad propia y no como una plantilla.', en: 'It must look and sound like lotería, with its own identity rather than a template.' },
      ],
    },
    skills: [
      { es: 'Desarrollo móvil con React Native / Expo (TypeScript)', en: 'Mobile development with React Native / Expo (TypeScript)' },
      { es: 'Redes locales: TCP, mDNS y protocolo propio', en: 'Local networking: TCP, mDNS and a custom protocol' },
      { es: 'Arquitectura y decisiones documentadas', en: 'Architecture and documented decisions' },
      { es: 'Sistema de diseño con tokens', en: 'Token-based design system' },
      { es: 'Pixel art e ilustración (9 barajas × 54 cartas)', en: 'Pixel art and illustration (9 decks × 54 cards)' },
      { es: 'Pruebas automatizadas', en: 'Automated testing' },
      { es: 'Publicación en App Store y Google Play, privacidad y cumplimiento', en: 'App Store and Google Play release, privacy and compliance' },
      { es: 'Landing en Astro desplegada en Cloudflare', en: 'Astro landing deployed on Cloudflare' },
      { es: 'IA como herramienta de ingeniería', en: 'AI as an engineering tool' },
    ],
    articles: [
      {
        title: { es: 'Decidir la arquitectura antes de escribir código', en: 'Deciding the architecture before writing code' },
        idea: { es: 'Documenté las decisiones y sus descartes en un plan desde el primer día.', en: 'I documented decisions and what I ruled out in a plan from day one.' },
        points: [
          { es: 'WiFi local + TCP y no Bluetooth: BLE está hecho para conectar un accesorio, no para sincronizar estado entre tres o cuatro dispositivos iguales. Lo descarté tras investigarlo, no por intuición.', en: 'Local WiFi + TCP instead of Bluetooth: BLE is built to connect an accessory, not to sync state across three or four identical devices. I ruled it out after researching it, not by gut feeling.' },
          { es: 'Anfitrión autoritativo: el host tiene el mazo, el historial y las tablas; los clientes solo pintan. Es más simple y evita discrepancias, a cambio de que si el host cae la partida termina. Lo dejé escrito como limitación aceptada.', en: 'Authoritative host: the host owns the deck, history and boards; clients only render. Simpler and free of discrepancies, at the cost that the game ends if the host drops. I wrote that down as an accepted limitation.' },
          { es: 'El riesgo más grave se identificó temprano: el aislamiento de clientes en algunas redes WiFi. Por eso la Fase 0 fue una prueba de concepto que validó lo más arriesgado primero.', en: 'The worst risk was spotted early: client isolation on some WiFi networks. That is why Phase 0 was a proof of concept that validated the riskiest part first.' },
        ],
        shows: { es: 'Pensar en riesgos, comparar alternativas y dejar rastro de por qué.', en: 'Thinking in risks, comparing alternatives and leaving a trail of why.' },
        figures: [img(PIXO, 'sala-de-espera', { es: 'Sala de espera: el anfitrión ve llegar a los jugadores', en: 'Waiting room: the host watches players arrive' })],
      },
      {
        title: { es: 'La red, de cerca', en: 'The network, up close' },
        idea: { es: 'Cómo se comunican los teléfonos sin servidor.', en: 'How phones talk to each other with no server.' },
        points: [
          { es: 'Descubrimiento automático con mDNS/Bonjour: el host anuncia la partida y los clientes la ven en una lista.', en: 'Automatic discovery with mDNS/Bonjour: the host announces the game and clients see it in a list.' },
          { es: 'Protocolo propio sobre TCP, con encuadre de mensajes, versión y topes de tamaño y tiempo.', en: 'A custom protocol over TCP, with message framing, versioning and size and time limits.' },
          { es: 'La capa de sockets no sabe nada del juego y la lógica del host no sabe nada de sockets. Esa frontera permite probar la mesa con conexiones falsas.', en: 'The socket layer knows nothing about the game and the host logic knows nothing about sockets. That boundary lets me test the table with fake connections.' },
          { es: 'Defensas del host contra lo que llegue por el socket: validación de entrada, cupo y rechazos. Y el orden de "¡lotería!" cuando dos reclaman a la vez lo decide el host.', en: 'Host defenses against whatever arrives on the socket: input validation, capacity and rejections. And when two players call "¡lotería!" at once, the host decides the order.' },
          { es: 'Bug real: expo-network puede devolver una IP incorrecta en iOS. Solo apareció probando en dispositivo real.', en: 'Real bug: expo-network can return a wrong IP on iOS. It only showed up on a real device.' },
        ],
        shows: { es: 'Diseño de protocolos, concurrencia y depuración en dispositivo real.', en: 'Protocol design, concurrency and debugging on real devices.' },
        figures: [img(PIXO, 'menu', { es: 'Menú: crear una partida o unirse a una', en: 'Menu: create a game or join one' })],
      },
      {
        title: { es: 'Un juego con identidad propia', en: 'A game with its own identity' },
        idea: { es: 'Del diseño por defecto al pixel art propio.', en: 'From the default look to original pixel art.' },
        points: [
          { es: 'Sistema de diseño con tokens: ningún color, espaciado ni tipografía escritos a mano; todo sale del tema. Tres temas y escala de fuente accesible.', en: 'Token-based design system: no hand-written color, spacing or typography; everything comes from the theme. Three themes and an accessible font scale.' },
          { es: 'Giro de identidad: rediseñé a pixel art propio después de probar con packs de arte ajeno.', en: 'Identity shift: I redesigned around original pixel art after trying third-party art packs.' },
          { es: 'Kit de interfaz con marcos de 9 cortes, escalado y paleta, y una guía de los dos bugs de render que más tiempo me costaron, para no repetirlos.', en: 'A UI kit with 9-slice frames, scaling and palette, plus a guide to the two render bugs that cost me the most time, so I never repeat them.' },
          { es: 'Nueve barajas de 54 cartas: Tradicional, Día de Muertos, Terror, Perrault, Grimm, Carroll, Piratas, Griego, Cyberpunk y Nórdico.', en: 'Nine decks of 54 cards: Traditional, Day of the Dead, Horror, Perrault, Grimm, Carroll, Pirates, Greek, Cyberpunk and Norse.' },
          { es: 'Todo el texto en archivos de idioma (ES/EN), sin cadenas sueltas, y voz que canta las cartas.', en: 'All text in language files (ES/EN), no loose strings, and a voice that calls the cards.' },
        ],
        shows: { es: 'Criterio visual, consistencia y accesibilidad.', en: 'Visual judgment, consistency and accessibility.' },
        figures: [
          img(PIXO, 'mazo-muertos', { es: 'Baraja Día de Muertos', en: 'Day of the Dead deck' }),
          img(PIXO, 'mazo-terror', { es: 'Baraja Terror', en: 'Horror deck' }),
        ],
      },
      {
        title: { es: 'Calidad: pruebas y verificación', en: 'Quality: tests and verification' },
        idea: { es: 'Lo que se puede verificar sin dos teléfonos, se verifica automáticamente.', en: 'What can be verified without two phones is verified automatically.' },
        points: [
          { es: 'Pruebas automatizadas del protocolo, la mesa, los patrones de victoria, el catálogo y el acceso a la tienda.', en: 'Automated tests for the protocol, the table, winning patterns, the catalog and store access.' },
          { es: 'Lo demás se prueba en dispositivos reales, porque la red entre teléfonos no se puede simular entera.', en: 'The rest is tested on real devices, because phone-to-phone networking cannot be fully simulated.' },
          { es: 'Reglas de arquitectura escritas para que se cumplan: qué carpeta puede depender de cuál.', en: 'Architecture rules written down so they are enforced: which folder may depend on which.' },
        ],
        shows: { es: 'Que lo que construyo se puede mantener.', en: 'That what I build can be maintained.' },
        figures: [img(PIXO, 'landing-barajas', { es: 'Las nueve barajas, de cerca, en la landing', en: 'The nine decks up close on the landing' }, 'wide')],
      },
      {
        title: { es: 'Llegar a las tiendas sin que te rechacen', en: 'Reaching the stores without being rejected' },
        idea: { es: 'Publicar es parte del trabajo, y se planea.', en: 'Releasing is part of the job, and it gets planned.' },
        points: [
          { es: 'Lanzamiento en tres fases: básica, anuncios y compras. Cada fase agrega una sola declaración ante Apple y Google, para no defender tres a la vez en una primera revisión.', en: 'Three-phase launch: basic, ads, purchases. Each phase adds a single declaration to Apple and Google, so I never defend three at once in a first review.' },
          { es: 'Lanzamiento 1: tres barajas gratis, sin anuncios, sin compras y sin datos recopilados. Cada casilla del formulario de privacidad dice "no" y es verdad.', en: 'Launch 1: three free decks, no ads, no purchases and no data collected. Every box on the privacy form says "no" and it is true.' },
          { es: 'Quité las librerías de anuncios en lugar de apagarlas y bloqueé tres permisos de Android que ninguna función usaba.', en: 'I removed the ad libraries instead of switching them off and blocked three Android permissions no feature used.' },
          { es: 'Chuleta de publicación con la respuesta a cada formulario, y política de privacidad pública en español e inglés.', en: 'A release cheat sheet with the answer to every form, and a public privacy policy in Spanish and English.' },
          { es: 'Honestidad con el usuario: las barajas que salen gratis no se vuelven a cobrar.', en: 'Honesty with the user: decks that ship free are never charged for later.' },
        ],
        shows: { es: 'Conocimiento del proceso completo, no solo del código.', en: 'Knowledge of the whole process, not just the code.' },
        figures: [img(PIXO, 'landing-privacidad', { es: 'Política de privacidad pública y sección de origen del juego', en: 'Public privacy policy and the game origin section' }, 'wide')],
      },
      {
        title: { es: 'El sitio web del juego', en: 'The game website' },
        idea: { es: 'Una landing pequeña, con el mismo carácter que el juego.', en: 'A small landing with the same character as the game.' },
        points: [
          { es: 'Astro, 100% estática, desplegada en Cloudflare, sin frameworks de interfaz.', en: 'Astro, 100% static, deployed on Cloudflare, no UI frameworks.' },
          { es: 'Tipografía pixel propia, galería de las nueve barajas, capturas reales, política de privacidad y soporte.', en: 'Own pixel typography, a gallery of the nine decks, real screenshots, privacy policy and support.' },
        ],
        shows: { es: 'Que cuido el producto también fuera de la app.', en: 'That I care for the product beyond the app itself.' },
        figures: [
          img(PIXO, 'landing-portada', { es: 'Portada de la landing en escritorio', en: 'Landing hero on desktop' }, 'wide'),
          img(PIXO, 'landing-telefonos', { es: 'Capturas de la app dentro de teléfonos', en: 'App screenshots inside phones' }, 'wide'),
        ],
      },
      {
        title: { es: 'Cómo trabajé con IA en este proyecto', en: 'How I worked with AI on this project' },
        idea: { es: 'No es "la IA lo hizo": es cómo la dirijo.', en: 'Not "the AI did it": it is how I direct it.' },
        points: [
          { es: 'Contexto antes que código: un archivo de reglas del proyecto (tokens, componentes, i18n, estructura) para que la IA trabaje dentro de ellas desde el primer mensaje.', en: 'Context before code: a project rules file (tokens, components, i18n, structure) so the AI works within them from the first message.' },
          { es: 'Documentación como memoria compartida: plan, red, kit de interfaz y publicación. Me sirve a mí y a la IA para retomar sin releer todo.', en: 'Documentation as shared memory: plan, networking, UI kit and release docs. They help me and the AI resume without rereading everything.' },
          { es: 'Dividir en fases y validar: prueba de concepto, descubrimiento, lógica, interfaz y publicación.', en: 'Split into phases and validate: proof of concept, discovery, logic, interface and release.' },
          { es: 'Lo que decido yo siempre: la arquitectura, la identidad visual y lo que se publica.', en: 'What I always decide: the architecture, the visual identity and what gets published.' },
        ],
        shows: { es: 'Dirección técnica con rastro y verificación.', en: 'Technical direction with a trail and verification.' },
        figures: [img(PIXO, 'landing-portada', { es: 'La landing, construida y revisada con apoyo de IA', en: 'The landing, built and reviewed with AI support' }, 'wide')],
      },
    ],
    learned: [
      { es: 'Validar el riesgo más grande primero ahorra semanas.', en: 'Validating the biggest risk first saves weeks.' },
      { es: 'Documentar por qué se descartó algo vale tanto como documentar lo que se hizo.', en: 'Documenting why something was ruled out is worth as much as documenting what was built.' },
      { es: 'Publicar en tiendas es un proyecto dentro del proyecto.', en: 'Releasing to the stores is a project inside the project.' },
    ],
    improve: [
      { es: 'Migración de host y reconexión automática: hoy, si el host cae, la partida termina.', en: 'Host migration and automatic reconnection: today, if the host drops, the game ends.' },
      { es: 'Conexión sin WiFi compartido (Multipeer / WiFi Direct).', en: 'Connection without shared WiFi (Multipeer / WiFi Direct).' },
      { es: 'Lanzamientos 2 y 3: anuncios y compra de barajas.', en: 'Launches 2 and 3: ads and deck purchases.' },
    ],
  },

  /* ============================================================
     04 · FOOD&CO (mobile app + admin dashboard + landing)
     ============================================================ */
  {
    id: FOOD,
    title: 'Food&Co',
    tagline: {
      es: 'Red social gastronómica: app móvil, panel de administración y sitio web, de cero a producción.',
      en: 'A food-focused social network: mobile app, admin dashboard and website, from zero to production.',
    },
    summary: {
      es: 'Tres productos conectados: app en React Native, panel en Astro sobre Cloudflare y landing bilingüe con enlaces universales.',
      en: 'Three connected products: a React Native app, an Astro admin panel on Cloudflare and a bilingual landing with universal links.',
    },
    cover: `${BASE}/${FOOD}/cover.webp`,
    coverAlt: { es: 'Landing de Food&Co con dos teléfonos mostrando la app', en: 'Food&Co landing with two phones showing the app' },
    chips: ['React Native', 'Expo', 'Astro', 'React', 'Tailwind 4', 'Cloudflare'],
    facts: [
      { label: { es: 'Alcance', en: 'Scope' }, value: { es: 'App móvil, panel web y landing', en: 'Mobile app, web panel and landing' } },
      { label: { es: 'Plataformas', en: 'Platforms' }, value: { es: 'iOS, Android y web', en: 'iOS, Android and web' } },
      { label: { es: 'Periodo', en: 'Period' }, value: { es: 'Septiembre 2026', en: 'September 2026' } },
    ],
    stats: [
      { value: '3', label: { es: 'productos conectados', en: 'connected products' } },
      { value: '3', label: { es: 'inicios de sesión: correo, Google y Apple', en: 'sign-in methods: email, Google and Apple' } },
      { value: '709', label: { es: 'objetos monitoreados en el panel', en: 'objects monitored in the panel' } },
      { value: '2', label: { es: 'idiomas con textos legales', en: 'languages including legal copy' } },
    ],
    link: { href: 'https://foodncompany.mx', label: { es: 'Ver el sitio en vivo', en: 'Visit the live site' } },
    gallery: [
      { src: `${BASE}/${FOOD}/app-feed-1.webp`, alt: { es: 'Feed con carrusel de fotos', en: 'Feed with photo carousel' } },
      { src: `${BASE}/${FOOD}/app-feed-2.webp`, alt: { es: 'Feed con tarjeta de restaurante', en: 'Feed with restaurant card' } },
      { src: `${BASE}/${FOOD}/app-nueva-publicacion.webp`, alt: { es: 'Editor de nueva publicación', en: 'New post editor' } },
      { src: `${BASE}/${FOOD}/app-perfil-1.webp`, alt: { es: 'Perfil con galería', en: 'Profile with gallery' } },
      { src: `${BASE}/${FOOD}/app-receta.webp`, alt: { es: 'Receta con ingredientes', en: 'Recipe with ingredients' } },
    ],
    challenge: {
      intro: {
        es: 'Una red social gastronómica no es solo una app: necesita quien la modere, un sitio que explique la propuesta y enlaces que abran la app desde cualquier lugar. Construí las tres piezas con una condición:',
        en: 'A food social network is not just an app: it needs someone to moderate it, a site that explains the idea and links that open the app from anywhere. I built all three pieces with one condition:',
      },
      items: [
        { es: 'App: publicar platillos, reseñar restaurantes y compartir recetas, con listas largas de fotos pesadas que sigan fluidas.', en: 'App: post dishes, review restaurants and share recipes, with long lists of heavy photos that stay smooth.' },
        { es: 'Panel: moderar contenido, gestionar restaurantes y ver cuánto crece y cuesta el almacenamiento de imágenes.', en: 'Panel: moderate content, manage restaurants and see how image storage grows and what it costs.' },
        { es: 'Landing: bilingüe, con modo oscuro y páginas públicas para que un enlace compartido abra una vista ligera y proponga abrir la app.', en: 'Landing: bilingual, with dark mode and public pages so a shared link opens a light view and offers to open the app.' },
      ],
      outro: {
        es: 'Aquí el reto fue la coherencia entre las tres: un mismo producto, una misma marca roja, tres tecnologías.',
        en: 'The challenge here was coherence across the three: one product, one red brand, three technologies.',
      },
    },
    skills: [
      { es: 'React Native / Expo con Expo Router y nueva arquitectura', en: 'React Native / Expo with Expo Router and the new architecture' },
      { es: 'Estado y datos: Zustand y TanStack Query', en: 'State and data: Zustand and TanStack Query' },
      { es: 'Cámara, editor de imágenes, mapas, ubicación y notificaciones push', en: 'Camera, image editor, maps, location and push notifications' },
      { es: 'Autenticación con correo, Google y Apple', en: 'Authentication with email, Google and Apple' },
      { es: 'Astro SSR en Cloudflare y librería de componentes propia', en: 'Astro SSR on Cloudflare and an in-house component library' },
      { es: 'Visualización de datos con ApexCharts', en: 'Data visualization with ApexCharts' },
      { es: 'i18n, enlaces universales y SEO', en: 'i18n, universal links and SEO' },
      { es: 'Accesibilidad: texto, contraste y movimiento reducido', en: 'Accessibility: text size, contrast and reduced motion' },
      { es: 'IA como herramienta de ingeniería', en: 'AI as an engineering tool' },
    ],
    articles: [
      {
        title: { es: 'La app móvil: feed, perfil y recetas', en: 'The mobile app: feed, profile and recipes' },
        idea: { es: 'React Native pensado para listas largas con fotos pesadas.', en: 'React Native designed for long lists with heavy photos.' },
        points: [
          { es: 'Expo SDK 54 con la nueva arquitectura, React Native 0.81 y Expo Router. Las rutas se organizan por carpetas de acceso (auth, root, info) para que las guardas de sesión vivan en un único layout por grupo, sin repetirlas en cada pantalla.', en: 'Expo SDK 54 with the new architecture, React Native 0.81 and Expo Router. Routes are grouped by access folders (auth, root, info) so session guards live in a single layout per group, never repeated in each screen.' },
          { es: 'Zustand para el estado de sesión e interfaz, TanStack Query para los datos del servidor. Listas con FlashList, imágenes con expo-image y animaciones con Reanimated.', en: 'Zustand for session and UI state, TanStack Query for server data. Lists use FlashList, images use expo-image and animations use Reanimated.' },
          { es: 'El feed combina carrusel de fotos, acciones sociales y una tarjeta del restaurante enlazada. El perfil suma galería, contadores y pestañas de publicaciones, me gusta, guardados y lugares.', en: 'The feed combines a photo carousel, social actions and a linked restaurant card. The profile adds a gallery, counters and tabs for posts, likes, saved items and places.' },
          { es: 'Las recetas llevan ingredientes con checklist, tiempos, porciones y unidades métrico/US, y recalculan cantidades al cambiar porciones o unidades.', en: 'Recipes include an ingredient checklist, times, servings and metric/US units, and recalculate quantities when servings or units change.' },
        ],
        shows: { es: 'Arquitectura móvil con criterio de rendimiento.', en: 'Mobile architecture with performance in mind.' },
        figures: [
          img(FOOD, 'app-feed-1', { es: 'Feed de la app', en: 'App feed' }),
          img(FOOD, 'app-perfil-1', { es: 'Perfil de usuario', en: 'User profile' }),
          img(FOOD, 'app-receta', { es: 'Pantalla de receta', en: 'Recipe screen' }),
        ],
      },
      {
        title: { es: 'Crear una publicación sin sufrir con las fotos', en: 'Creating a post without suffering with photos' },
        idea: { es: 'Del editor del teléfono al almacenamiento ligero.', en: 'From the phone editor to lightweight storage.' },
        points: [
          { es: 'Múltiples fotos con recorte, filtros, giro y volteo antes de subir.', en: 'Multiple photos with crop, filters, rotation and flip before uploading.' },
          { es: 'Reto: las fotos HEIC del iPhone. Solución: se procesan en el cliente con expo-image-manipulator y el servidor las convierte a WebP con sharp y heic-convert.', en: 'Challenge: iPhone HEIC photos. Solution: they are processed on the client with expo-image-manipulator and the server converts them to WebP with sharp and heic-convert.' },
          { es: 'Por eso el panel muestra variantes WebP junto con los originales: la decisión de formato es visible de punta a punta.', en: 'That is why the panel shows WebP variants next to the originals: the format decision is visible end to end.' },
        ],
        shows: { es: 'Resolver un problema real de plataforma en el cliente y en el servidor.', en: 'Solving a real platform problem on both client and server.' },
        figures: [img(FOOD, 'app-nueva-publicacion', { es: 'Editor de nueva publicación', en: 'New post editor' })],
      },
      {
        title: { es: 'Accesibilidad e idiomas dentro de la app', en: 'Accessibility and languages inside the app' },
        idea: { es: 'Preferencias que el usuario controla y la app recuerda.', en: 'Preferences the user controls and the app remembers.' },
        points: [
          { es: 'Tamaño de texto S/M/L/XL, alto contraste y movimiento reducido, persistidos por usuario.', en: 'Text size S/M/L/XL, high contrast and reduced motion, persisted per user.' },
          { es: 'Modo oscuro, idiomas con i18next y un sistema de diseño propio para que ningún estilo quede suelto.', en: 'Dark mode, i18next languages and an in-house design system so no style is left loose.' },
          { es: 'Autenticación con correo, Google y Apple, con tokens en expo-secure-store; Sentry solo en builds reales.', en: 'Authentication with email, Google and Apple, tokens in expo-secure-store; Sentry only in real builds.' },
        ],
        shows: { es: 'Que la accesibilidad se diseña desde el principio.', en: 'That accessibility is designed from the start.' },
        figures: [img(FOOD, 'app-accesibilidad', { es: 'Preferencias de accesibilidad', en: 'Accessibility preferences' })],
      },
      {
        title: { es: 'El panel de administración', en: 'The admin dashboard' },
        idea: { es: 'Frontend web para operar una red social día a día.', en: 'A web frontend to run a social network day to day.' },
        points: [
          { es: 'Astro 6 con SSR en Cloudflare, islas de React y Tailwind 4. Un middleware de sesión protege las páginas.', en: 'Astro 6 with SSR on Cloudflare, React islands and Tailwind 4. A session middleware protects the pages.' },
          { es: 'Una librería de componentes propia (botones, tablas, modales, formularios, tarjetas, progreso y mapas) partiendo de una plantilla adaptada.', en: 'An in-house component library (buttons, tables, modals, forms, cards, progress and maps) adapted from a template.' },
          { es: 'Secciones para analítica, usuarios, administradores, publicaciones, recetas, restaurantes, soporte y administrador de archivos; cada módulo conectado a su endpoint del gateway.', en: 'Sections for analytics, users, admins, posts, recipes, restaurants, support and a file manager; each module wired to its gateway endpoint.' },
        ],
        shows: { es: 'Frontend web completo, no solo una pantalla bonita.', en: 'A complete web frontend, not just a pretty screen.' },
        figures: [img(FOOD, 'panel-r2-analytics', { es: 'Panel de R2 Analytics', en: 'R2 Analytics panel' }, 'wide')],
      },
      {
        title: { es: 'Ver el costo del almacenamiento: R2 Analytics', en: 'Seeing storage cost: R2 Analytics' },
        idea: { es: 'Convertir métricas técnicas en algo accionable.', en: 'Turning technical metrics into something actionable.' },
        points: [
          { es: 'Problema: no había visibilidad del crecimiento ni del costo del almacenamiento de imágenes.', en: 'Problem: there was no visibility into the growth or cost of image storage.' },
          { es: 'Solución: un módulo en el backend que consulta la API de analítica de Cloudflare y un panel con tendencia de GB y objetos, tasa de éxito frente a error, subidas diarias y operaciones por acción.', en: 'Solution: a backend module that queries the Cloudflare analytics API and a panel with GB and object trends, success vs. error rate, daily uploads and operations per action.' },
          { es: 'Selector de rango de 7, 14 o 30 días y una tabla resumen para revisar cifras absolutas sin depender de la gráfica.', en: 'A 7, 14 or 30 day range selector and a summary table to review absolute figures without relying on the chart.' },
        ],
        shows: { es: 'Visualización de datos al servicio de una decisión.', en: 'Data visualization in service of a decision.' },
        figures: [img(FOOD, 'panel-operaciones', { es: 'Subidas diarias y operaciones por acción', en: 'Daily uploads and operations per action' }, 'wide')],
      },
      {
        title: { es: 'Importar restaurantes desde Google', en: 'Importing restaurants from Google' },
        idea: { es: 'Eliminar la captura manual.', en: 'Eliminating manual entry.' },
        points: [
          { es: 'Capturar cada restaurante a mano era lento; el flujo de importación usa Google Places sobre un mapa con Leaflet.', en: 'Entering each restaurant by hand was slow; the import flow uses Google Places over a Leaflet map.' },
          { es: 'Se arrastra el pin, se elige la densidad de la zona (250, 600 o 1500 m), el radio y los tipos de lugar, y el panel estima cuántos candidatos y cuánto costará la búsqueda antes de ejecutarla.', en: 'You drag the pin, pick the zone density (250, 600 or 1500 m), the radius and the place types, and the panel estimates how many candidates and what the search will cost before running it.' },
          { es: 'La configuración de Google queda documentada en una guía para el cliente.', en: 'The Google setup is documented in a guide for the client.' },
        ],
        shows: { es: 'Producto pensado para la operación y para el presupuesto.', en: 'Product thinking for operations and budget.' },
        figures: [img(FOOD, 'panel-mapa', { es: 'Importación de restaurantes con mapa', en: 'Restaurant import with a map' }, 'wide')],
      },
      {
        title: { es: 'La landing: diseño, idiomas y enlaces', en: 'The landing: design, languages and links' },
        idea: { es: 'Un sitio que explica la app y también sirve sus páginas públicas.', en: 'A site that explains the app and also serves its public pages.' },
        points: [
          { es: 'Astro 6, React 19 y Tailwind 4 desplegados en Cloudflare, con módulos por sección: navegación, héroe, funciones, cómo funciona, comunidad, descarga, ayuda y pie.', en: 'Astro 6, React 19 and Tailwind 4 on Cloudflare, with a module per section: nav, hero, features, how it works, community, download, help and footer.' },
          { es: 'Tipografía fuerte, paleta roja de marca, maquetas de teléfono y tema claro u oscuro.', en: 'Strong typography, a red brand palette, phone mockups and a light or dark theme.' },
          { es: 'Español e inglés con diccionarios propios, incluidos los textos legales: términos, privacidad, comunidad, contenido y eliminar cuenta.', en: 'Spanish and English with in-house dictionaries, including legal copy: terms, privacy, community, content and account deletion.' },
          { es: 'Enlaces universales: apple-app-site-association y assetlinks.json generados como rutas de Astro, y rutas dinámicas para publicaciones, restaurantes, recetas y perfiles. Un enlace compartido abre una vista ligera y propone abrir la app.', en: 'Universal links: apple-app-site-association and assetlinks.json generated as Astro routes, plus dynamic routes for posts, restaurants, recipes and profiles. A shared link opens a light view and offers to open the app.' },
        ],
        shows: { es: 'Diseño, i18n y enlaces profundos como arquitectura.', en: 'Design, i18n and deep links as architecture.' },
        figures: [
          img(FOOD, 'landing-hero', { es: 'Portada de la landing', en: 'Landing hero' }, 'wide'),
          img(FOOD, 'landing-funciones', { es: 'Seis funciones numeradas', en: 'Six numbered features' }, 'wide'),
          img(FOOD, 'landing-como-funciona', { es: 'Sección Cómo funciona', en: 'How it works section' }, 'wide'),
          img(FOOD, 'landing-comunidad', { es: 'Sección de comunidad en tema oscuro', en: 'Community section in dark theme' }, 'wide'),
        ],
      },
      {
        title: { es: 'Cómo trabajé con IA en este proyecto', en: 'How I worked with AI on this project' },
        idea: { es: 'No es "la IA lo hizo": es cómo la dirijo.', en: 'Not "the AI did it": it is how I direct it.' },
        points: [
          { es: 'Orden de trabajo: bocetos de pantalla y paleta, luego autenticación y navegación, después feed, perfil, publicaciones y recetas.', en: 'Order of work: screen sketches and palette first, then authentication and navigation, then feed, profile, posts and recipes.' },
          { es: 'Un archivo de convenciones del proyecto para que la IA trabaje de forma consistente, y guías escritas para el cliente: mapas, notificaciones push y login social.', en: 'A project conventions file so the AI works consistently, and written guides for the client: maps, push notifications and social login.' },
          { es: 'Pruebas en iPhone físico y en simulador antes de dar algo por bueno.', en: 'Tests on a physical iPhone and the simulator before calling anything done.' },
        ],
        shows: { es: 'Dirección técnica con rastro y verificación.', en: 'Technical direction with a trail and verification.' },
        figures: [img(FOOD, 'app-feed-2', { es: 'Feed de la app con tarjeta de restaurante', en: 'App feed with a restaurant card' })],
      },
    ],
    learned: [
      { es: 'Poner las guardas de acceso en un solo layout por grupo evita repetirlas y olvidarlas.', en: 'Putting access guards in a single layout per group avoids repeating them and forgetting them.' },
      { es: 'Una métrica técnica solo sirve cuando se traduce a algo que alguien puede decidir.', en: 'A technical metric only helps once it is translated into something someone can decide on.' },
      { es: 'Un enlace compartido es una puerta de entrada: la landing también es parte de la app.', en: 'A shared link is a doorway: the landing is part of the app too.' },
    ],
    improve: [
      { es: 'Agregar pruebas automatizadas a la app móvil: hoy no las tiene.', en: 'Add automated tests to the mobile app: it has none today.' },
      { es: 'Android necesita una clave de Google Maps; si falta, la app usa un respaldo en lugar de fallar, pero conviene dejarla configurada.', en: 'Android needs a Google Maps key; without it the app uses a fallback instead of failing, but it should be configured.' },
      { es: 'Permisos por rol en el panel y rendimiento de tablas grandes.', en: 'Role-based permissions in the panel and performance of large tables.' },
      { es: 'Medir la landing con Lighthouse y documentar los resultados.', en: 'Measure the landing with Lighthouse and document the results.' },
    ],
  },

  /* ============================================================
     05 · CJ STORE (web + mobile app + admin dashboard)
     ============================================================ */
  {
    id: CJ,
    title: 'CJ Store',
    tagline: {
      es: 'Tienda, citas y academia para un negocio real de detallado automotriz: web, app y panel con una sola fuente de datos.',
      en: 'Shop, bookings and academy for a real car-detailing business: web, app and panel on a single source of data.',
    },
    summary: {
      es: 'Tres líneas de negocio en una experiencia, con agendado guiado, pagos con Stripe y un panel que enciende o apaga cada área sin desplegar código.',
      en: 'Three lines of business in one experience, with guided booking, Stripe payments and a panel that switches each area on or off without deploying code.',
    },
    cover: `${BASE}/${CJ}/cover.webp`,
    coverAlt: { es: 'Inicio del sitio de CJ Store', en: 'CJ Store website home' },
    chips: ['E-commerce', 'Reservas', 'App móvil', 'Panel admin', 'Stripe', 'WhatsApp'],
    facts: [
      { label: { es: 'Cliente', en: 'Client' }, value: { es: 'Negocio real de detallado automotriz', en: 'A real car-detailing business' } },
      { label: { es: 'Piezas', en: 'Parts' }, value: { es: 'Sitio web, app móvil y panel', en: 'Website, mobile app and panel' } },
      { label: { es: 'Integraciones', en: 'Integrations' }, value: { es: 'Stripe, Google, Facebook y WhatsApp', en: 'Stripe, Google, Facebook and WhatsApp' } },
    ],
    stats: [
      { value: '3', label: { es: 'productos con una sola fuente de datos', en: 'products on a single source of data' } },
      { value: '3', label: { es: 'líneas de negocio: tienda, servicios y academia', en: 'business lines: shop, services and academy' } },
      { value: '106', label: { es: 'productos en el catálogo', en: 'products in the catalog' } },
      { value: '4', label: { es: 'pasos para agendar un servicio', en: 'steps to book a service' } },
    ],
    gallery: [
      { src: `${BASE}/${CJ}/app-03-home-tienda.webp`, alt: { es: 'Inicio de la tienda en la app', en: 'Shop home in the app' } },
      { src: `${BASE}/${CJ}/app-20-servicios-lista.webp`, alt: { es: 'Lista de servicios', en: 'Services list' } },
      { src: `${BASE}/${CJ}/app-26-servicio-calendario-hora.webp`, alt: { es: 'Calendario y horarios', en: 'Calendar and time slots' } },
      { src: `${BASE}/${CJ}/app-32-servicios-academy-distribuidor-v2.webp`, alt: { es: 'Academy y Distribuidor', en: 'Academy and Distributor' } },
      { src: `${BASE}/${CJ}/app-40-perfil.webp`, alt: { es: 'Perfil del cliente', en: 'Customer profile' } },
    ],
    challenge: {
      intro: {
        es: 'El negocio vendía y agendaba por WhatsApp. Necesitaba una forma de que sus clientes compraran, reservaran y se inscribieran a cursos solos, y de manejarlo todo desde un solo lugar. Lo diseñé y desarrollé de punta a punta, con tres condiciones:',
        en: 'The business sold and booked through WhatsApp. It needed a way for customers to buy, book and enroll in courses by themselves, and to run everything from one place. I designed and built it end to end, with three conditions:',
      },
      items: [
        { es: 'Tres líneas de negocio (tienda, servicios y academia) dentro de una experiencia coherente.', en: 'Three business lines (shop, services and academy) inside one coherent experience.' },
        { es: 'Un flujo de agendado lo bastante corto para que nadie lo abandone.', en: 'A booking flow short enough that nobody abandons it.' },
        { es: 'Web, app móvil y panel leyendo la misma fuente de datos, sin discrepancias.', en: 'Web, mobile app and panel reading the same source of data, with no discrepancies.' },
      ],
    },
    skills: [
      { es: 'Frontend de e-commerce: catálogo, filtros, autocompletado y carrito', en: 'E-commerce frontend: catalog, filters, autocomplete and cart' },
      { es: 'UX de flujos largos: asistente con resumen en vivo', en: 'Long-flow UX: wizard with a live summary' },
      { es: 'Pagos con Stripe y métodos manuales', en: 'Stripe payments and manual methods' },
      { es: 'Autenticación: registro, recuperación y login social', en: 'Authentication: sign-up, recovery and social login' },
      { es: 'Modelado de datos: inventario, disponibilidad, cupos y pedidos', en: 'Data modeling: inventory, availability, seat limits and orders' },
      { es: 'App móvil: bottom sheets, calendario y formularios', en: 'Mobile app: bottom sheets, calendar and forms' },
      { es: 'Panel de administración con KPIs y feature flags', en: 'Admin panel with KPIs and feature flags' },
      { es: 'Modo claro y oscuro', en: 'Light and dark mode' },
    ],
    articles: [
      {
        title: { es: 'Ordenar tres negocios en una sola estructura', en: 'Organizing three businesses in one structure' },
        idea: { es: 'Del WhatsApp del cliente a un mapa del sitio.', en: 'From the client\'s WhatsApp to a site map.' },
        points: [
          { es: 'Mapa del sitio: Inicio, Academy, Detallado, Aplicación, PPF y Wrap, Tienda, Servicios y Cuenta. Cada línea de negocio tiene su entrada, pero comparten carrito, cuenta y pagos.', en: 'Site map: Home, Academy, Detailing, Application, PPF & Wrap, Shop, Services and Account. Each business line has its own entry, but they share cart, account and payments.' },
          { es: 'Decisión de producto: mostrar "Distribuidor" como no disponible en lugar de ocultarlo, controlado por un interruptor desde el panel.', en: 'Product decision: show "Distributor" as unavailable instead of hiding it, controlled by a switch from the panel.' },
          { es: 'La portada y el menú ponen a la vista las dos acciones que importan: agendar un servicio y explorar la tienda.', en: 'The home page and menu put the two actions that matter in plain view: book a service and explore the shop.' },
        ],
        shows: { es: 'Traducir un negocio a una estructura de producto.', en: 'Translating a business into a product structure.' },
        figures: [
          img(CJ, 'web-inicio', { es: 'Inicio del sitio', en: 'Site home' }, 'wide'),
          img(CJ, 'web-servicios', { es: 'Hub de servicios', en: 'Services hub' }, 'wide'),
        ],
      },
      {
        title: { es: 'Catálogo y búsqueda que no estorban', en: 'A catalog and search that stay out of the way' },
        idea: { es: 'Encontrar un producto en segundos entre más de cien.', en: 'Find a product in seconds among more than a hundred.' },
        points: [
          { es: 'Autocompletado en la barra de búsqueda con nombre y código del producto.', en: 'Autocomplete in the search bar with product name and code.' },
          { es: 'Filtros combinables, carrusel, favoritos y carrito con contador.', en: 'Combinable filters, carousel, favorites and a cart with a counter.' },
          { es: 'Modo claro y oscuro en toda la tienda.', en: 'Light and dark mode across the whole shop.' },
        ],
        shows: { es: 'Frontend de comercio electrónico con atención al detalle.', en: 'E-commerce frontend with attention to detail.' },
        figures: [
          img(CJ, 'web-autocompletado', { es: 'Autocompletado de búsqueda', en: 'Search autocomplete' }, 'wide'),
          img(CJ, 'web-filtros', { es: 'Filtros del catálogo', en: 'Catalog filters' }, 'wide'),
          img(CJ, 'web-carrito', { es: 'Carrito', en: 'Cart' }, 'wide'),
        ],
      },
      {
        title: { es: 'El flujo crítico: agendar un servicio', en: 'The critical flow: booking a service' },
        idea: { es: 'Cuatro pasos y un resumen que se actualiza en cada uno.', en: 'Four steps and a summary that updates at each one.' },
        points: [
          { es: 'Paquete, horario, pago y confirmación. Un panel de resumen lateral cambia en cada paso y cada sección se puede editar antes de confirmar.', en: 'Package, time slot, payment and confirmation. A side summary panel changes at each step and every section can be edited before confirming.' },
          { es: 'Pensado para reducir el abandono: cada paquete muestra lo que incluye y desde qué precio, y avisa qué tipo de vehículo acepta.', en: 'Designed to reduce abandonment: each package shows what it includes and its starting price, and warns which vehicle type it accepts.' },
          { es: 'Pagos con Stripe y métodos manuales: efectivo, transferencia y depósito.', en: 'Payments with Stripe and manual methods: cash, transfer and deposit.' },
        ],
        shows: { es: 'Diseño de un flujo largo con validación y sin fricción.', en: 'Designing a long flow with validation and no friction.' },
        figures: [
          img(CJ, 'web-agendar-paquete', { es: 'Paso 1: paquete', en: 'Step 1: package' }, 'wide'),
          img(CJ, 'web-agendar-pago', { es: 'Paso 3: pago', en: 'Step 3: payment' }, 'wide'),
          img(CJ, 'web-agendar-confirmar', { es: 'Paso 4: confirmar', en: 'Step 4: confirm' }, 'wide'),
        ],
      },
      {
        title: { es: 'Reutilizar el patrón en la Academia', en: 'Reusing the pattern in the Academy' },
        idea: { es: 'Un mismo asistente para dos negocios distintos.', en: 'One wizard for two different businesses.' },
        points: [
          { es: 'El asistente de agendado sirve también para inscribirse a seminarios, con cupos en tiempo real.', en: 'The booking wizard also handles seminar enrollment, with live seat availability.' },
          { es: 'Menos código nuevo, y un cliente que ya aprendió el flujo no tiene que aprenderlo otra vez.', en: 'Less new code, and a customer who has learned the flow does not have to learn it again.' },
        ],
        shows: { es: 'Pensar en patrones reutilizables, no en pantallas sueltas.', en: 'Thinking in reusable patterns, not isolated screens.' },
        figures: [
          img(CJ, 'web-academy-inscripcion', { es: 'Inscripción a un seminario', en: 'Seminar enrollment' }, 'wide'),
          img(CJ, 'web-academy-confirmacion', { es: 'Confirmación de inscripción', en: 'Enrollment confirmation' }, 'wide'),
        ],
      },
      {
        title: { es: 'Contenido para decidir y cuenta para volver', en: 'Content to decide and an account to return to' },
        idea: { es: 'Ayudar al cliente a elegir y a seguir su compra.', en: 'Helping customers choose and follow up on their purchase.' },
        points: [
          { es: 'Página de comparación PPF contra Wrap: decisión guiada por objetivo y no por moda.', en: 'A PPF versus Wrap comparison page: a decision guided by goal, not by trend.' },
          { es: 'Cuenta del cliente con información de contacto, seguridad, direcciones, pedidos, servicios, Master Academy, distribuidor, carrito, favoritos, ayuda y legal.', en: 'Customer account with contact info, security, addresses, orders, services, Master Academy, distributor, cart, favorites, help and legal.' },
          { es: 'Registro, inicio de sesión, recuperación de contraseña y acceso con Google o Facebook.', en: 'Sign-up, login, password recovery and access with Google or Facebook.' },
        ],
        shows: { es: 'Producto y contenido pensados para convertir.', en: 'Product and content designed to convert.' },
        figures: [
          img(CJ, 'web-ppf-vs-wrap', { es: 'Comparativa PPF contra Wrap', en: 'PPF versus Wrap comparison' }, 'wide'),
          img(CJ, 'web-cuenta', { es: 'Cuenta del cliente en modo oscuro', en: 'Customer account in dark mode' }, 'wide'),
        ],
      },
      {
        title: { es: 'La app móvil: agendar desde el bolsillo', en: 'The mobile app: booking from your pocket' },
        idea: { es: 'El mismo negocio, pensado para el pulgar.', en: 'The same business, designed for the thumb.' },
        points: [
          { es: 'Cinco pestañas: Inicio, Carrito, Pedidos o Distribuidor, Servicios y Perfil, con barra inferior flotante.', en: 'Five tabs: Home, Cart, Orders or Distributor, Services and Profile, with a floating bottom bar.' },
          { es: 'El agendado es un panel que se desliza desde abajo, con unas nueve pantallas cortas y validación: paquete, vehículo, fecha y hora, teléfono, método de pago, confirmación y éxito.', en: 'Booking is a bottom sheet of about nine short screens with validation: package, vehicle, date and time, phone, payment method, confirmation and success.' },
          { es: 'Calendario con disponibilidad y selector de horarios. "Mis registros" muestra estado, vehículo, precio, factura y un botón directo a la dirección del taller.', en: 'Calendar with availability and a time-slot picker. "My records" shows status, vehicle, price, invoice and a direct button to the shop\'s address.' },
        ],
        shows: { es: 'Interfaz móvil con flujos largos y componentes a medida.', en: 'Mobile UI with long flows and custom components.' },
        figures: [
          img(CJ, 'app-22-servicio-paquetes', { es: 'Paquetes de servicio', en: 'Service packages' }),
          img(CJ, 'app-26-servicio-calendario-hora', { es: 'Calendario y horarios', en: 'Calendar and time slots' }),
          img(CJ, 'app-30-servicio-agendado-exito', { es: 'Servicio agendado', en: 'Service booked' }),
        ],
      },
      {
        title: { es: 'Compra, direcciones y seguridad en la app', en: 'Checkout, addresses and security in the app' },
        idea: { es: 'Los estados vacíos y la seguridad también se diseñan.', en: 'Empty states and security are designed too.' },
        points: [
          { es: 'Carrito con contador y checkout en una sola pantalla.', en: 'A cart with a counter and a single-screen checkout.' },
          { es: 'Direcciones con recorrido completo: estado vacío, formulario, selección de estado, ciudad y colonia, y pantalla de éxito.', en: 'Addresses with the complete path: empty state, form, state, city and neighborhood selection, and a success screen.' },
          { es: 'Master Academy y Distribuidor: seminarios con fechas, detalle e inscripción con pago, y solicitud para ser distribuidor.', en: 'Master Academy and Distributor: seminars with dates, detail and paid enrollment, plus a request to become a distributor.' },
          { es: 'Seguridad: historial de dispositivos y cierre de sesión remoto.', en: 'Security: device history and remote sign-out.' },
        ],
        shows: { es: 'Cuidado de los flujos secundarios, no solo del principal.', en: 'Care for secondary flows, not only the main one.' },
        figures: [
          img(CJ, 'app-51-carrito', { es: 'Carrito', en: 'Cart' }),
          img(CJ, 'app-11-direccion-formulario', { es: 'Formulario de dirección', en: 'Address form' }),
          img(CJ, 'app-41-perfil-seguridad-sesiones', { es: 'Sesiones por dispositivo', en: 'Sessions per device' }),
        ],
      },
      {
        title: { es: 'El panel que gobierna web y app', en: 'The panel that governs web and app' },
        idea: { es: 'Que el dueño pueda pausar un área sin llamar al desarrollador.', en: 'Let the owner pause an area without calling the developer.' },
        points: [
          { es: 'KPIs primero: clientes, productos, usuarios nuevos y activos, usuarios por mes y pedidos recientes, con buscador de comandos (⌘K).', en: 'KPIs first: customers, products, new and active users, users per month and recent orders, with a command search (⌘K).' },
          { es: 'Interruptores de servicio (feature flags): Servicios, Master Academy, Distribuidor y Tienda se encienden o apagan al instante, con un mensaje opcional para el cliente. Es la decisión clave del panel.', en: 'Service switches (feature flags): Services, Master Academy, Distributor and Shop turn on or off instantly, with an optional message for the customer. It is the panel\'s key decision.' },
          { es: 'Configuración de pagos como matriz global y por área, para activar solo lo que el negocio puede operar: tarjeta con Stripe, depósito, Mercado Pago, PayPal, transferencia y efectivo.', en: 'Payment settings as a global and per-area matrix, to enable only what the business can operate: card via Stripe, deposit, Mercado Pago, PayPal, transfer and cash.' },
          { es: 'Gestión de catálogo con estado de inventario y disponibilidad, categorías, marcas y cupones, y creación rápida con el botón Agregar.', en: 'Catalog management with inventory and availability status, categories, brands and coupons, and quick creation with the Add button.' },
        ],
        shows: { es: 'Diseño de sistemas: una fuente de datos para tres productos.', en: 'Systems design: one source of data for three products.' },
        figures: [
          img(CJ, 'panel-inicio', { es: 'Panel principal con KPIs, interruptores y pagos', en: 'Main panel with KPIs, switches and payments' }, 'wide'),
          img(CJ, 'panel-productos', { es: 'Lista de productos con inventario', en: 'Product list with inventory' }, 'wide'),
        ],
      },
    ],
    learned: [
      { es: 'Un interruptor en el panel vale más que un despliegue: el negocio decide cuándo ofrece cada cosa.', en: 'A switch in the panel beats a deploy: the business decides when to offer each thing.' },
      { es: 'Si web, app y panel comparten una sola fuente de datos, la coherencia sale gratis.', en: 'When web, app and panel share one source of data, consistency comes for free.' },
      { es: 'Un patrón bien resuelto, como el asistente de agendado, se reutiliza en otras líneas de negocio.', en: 'A well-solved pattern, like the booking wizard, can be reused across other lines of business.' },
    ],
    improve: [
      { es: 'Documentar el stack, las decisiones técnicas y los retos con detalle.', en: 'Document the stack, technical decisions and challenges in more detail.' },
      { es: 'Publicar una demo y el repositorio.', en: 'Publish a demo and the repository.' },
      { es: 'Versión de la app para Android.', en: 'An Android version of the app.' },
    ],
  },

  /* ============================================================
     06 · SANO (mobile app + desktop dashboard + gateway + AI + landing)
     ============================================================ */
  {
    id: SANO,
    title: 'Sano',
    tagline: {
      es: 'Producto completo de escaneo y calificación de alimentos: app móvil, dashboard de escritorio, backend e IA local.',
      en: 'A complete food-scanning and rating product: mobile app, desktop dashboard, backend and local AI.',
    },
    summary: {
      es: 'App que califica productos con NOM-051, dashboard en Electron para operarla, gateway en NestJS y un asistente de IA que corre en el equipo y lee empaques.',
      en: 'An app that rates products with NOM-051, an Electron dashboard to run it, a NestJS gateway and an AI assistant that runs on the device and reads packaging.',
    },
    cover: `${BASE}/${SANO}/cover.webp`,
    coverAlt: { es: 'Landing de Sano con tarjeta de calificación', en: 'Sano landing with a rating card' },
    chips: ['React Native', 'Expo', 'Electron', 'React', 'TypeScript', 'NestJS', 'Docker', 'Astro', 'ONNX', 'llama.cpp'],
    facts: [
      { label: { es: 'Rol', en: 'Role' }, value: { es: 'Diseño, desarrollo y arquitectura de punta a punta', en: 'Design, development and architecture end to end' } },
      { label: { es: 'Piezas', en: 'Parts' }, value: { es: 'Móvil, escritorio, backend, IA y landing', en: 'Mobile, desktop, backend, AI and landing' } },
      { label: { es: 'Norma', en: 'Standard' }, value: { es: 'NOM-051 y Nutri-Score', en: 'NOM-051 and Nutri-Score' } },
    ],
    stats: [
      { value: '5', label: { es: 'piezas: app, dashboard, backend, IA y landing', en: 'parts: app, dashboard, backend, AI and landing' } },
      { value: '9 207', label: { es: 'productos en el catálogo', en: 'products in the catalog' } },
      { value: '7B', label: { es: 'parámetros del modelo de visión local', en: 'parameters of the local vision model' } },
      { value: '0', label: { es: 'tokens visibles para la interfaz', en: 'tokens visible to the UI' } },
    ],
    gallery: [
      { src: `${BASE}/${SANO}/app-04-home.webp`, alt: { es: 'Inicio de la app: top de refrescos', en: 'App home: top soft drinks' } },
      { src: `${BASE}/${SANO}/app-05-producto-detalle.webp`, alt: { es: 'Detalle con score, Nutri-Score, NOVA y sellos', en: 'Detail with score, Nutri-Score, NOVA and warning labels' } },
      { src: `${BASE}/${SANO}/app-07-producto-aditivos.webp`, alt: { es: 'Alternativas más sanas', en: 'Healthier alternatives' } },
      { src: `${BASE}/${SANO}/app-01-onboarding.webp`, alt: { es: 'Onboarding', en: 'Onboarding' } },
    ],
    challenge: {
      intro: {
        es: 'Quería que cualquiera supiera, en segundos, qué tan sano es un producto del súper. Eso implica mucho más que una app: hace falta un catálogo confiable, alguien que lo opere y datos que se capturen sin teclear todo a mano. Tres retos:',
        en: 'I wanted anyone to know, in seconds, how healthy a supermarket product is. That takes much more than an app: it needs a trustworthy catalog, someone to run it and data captured without typing everything by hand. Three challenges:',
      },
      items: [
        { es: 'Calificar productos con la norma mexicana NOM-051, Nutri-Score y NOVA, y proponer una alternativa más sana.', en: 'Rate products with the Mexican NOM-051 standard, Nutri-Score and NOVA, and suggest a healthier alternative.' },
        { es: 'Operar un catálogo de miles de productos desde una app de escritorio segura.', en: 'Run a catalog of thousands of products from a secure desktop app.' },
        { es: 'Leer etiquetas con IA sin enviar las fotos a un servicio externo.', en: 'Read labels with AI without sending photos to an external service.' },
      ],
    },
    skills: [
      { es: 'Arquitectura segura de aplicaciones de escritorio con Electron', en: 'Secure desktop application architecture with Electron' },
      { es: 'Estructura modular por dominios (React, TypeScript, Zustand)', en: 'Modular domain-based structure (React, TypeScript, Zustand)' },
      { es: 'IA local: decisiones basadas en pruebas con llama.cpp', en: 'Local AI: test-driven decisions with llama.cpp' },
      { es: 'Procesamiento de imágenes con ONNX y Cloudflare R2', en: 'Image processing with ONNX and Cloudflare R2' },
      { es: 'Interfaces de operación: KPIs, tablas y gráficas', en: 'Operations interfaces: KPIs, tables and charts' },
      { es: 'Backend con NestJS y Docker Compose', en: 'Backend with NestJS and Docker Compose' },
      { es: 'App móvil con Expo y EAS', en: 'Mobile app with Expo and EAS' },
      { es: 'Landing en Astro y documentación versionada', en: 'Astro landing and versioned documentation' },
    ],
    articles: [
      {
        title: { es: 'La app: de un código de barras a una calificación', en: 'The app: from a barcode to a rating' },
        idea: { es: 'Escanea, entiende, elige mejor.', en: 'Scan, understand, choose better.' },
        points: [
          { es: 'Se apunta la cámara al código de barras y en segundos aparece una calificación de 0 a 100, con Nutri-Score, grupo NOVA y los sellos de advertencia NOM-051.', en: 'Point the camera at the barcode and within seconds a 0 to 100 rating appears, with Nutri-Score, NOVA group and NOM-051 warning labels.' },
          { es: 'El detalle explica el porqué: datos generales, ingredientes, aditivos y alternativas más sanas.', en: 'The detail screen explains the why: general data, ingredients, additives and healthier alternatives.' },
          { es: 'Expo con configuración dinámica, EAS para los builds y una guía de publicación. El acceso a historial, salud y perfil exige cuenta.', en: 'Expo with dynamic configuration, EAS for builds and a release guide. Access to history, health and profile requires an account.' },
        ],
        shows: { es: 'Producto móvil con propuesta clara y datos reales.', en: 'A mobile product with a clear proposition and real data.' },
        figures: [
          img(SANO, 'app-04-home', { es: 'Inicio con el top de refrescos', en: 'Home with the top soft drinks' }),
          img(SANO, 'app-05-producto-detalle', { es: 'Detalle: score, Nutri-Score, NOVA y sellos', en: 'Detail: score, Nutri-Score, NOVA and warning labels' }),
          img(SANO, 'app-07-producto-aditivos', { es: 'Detalle: alternativas y perfil', en: 'Detail: alternatives and profile' }),
        ],
      },
      {
        title: { es: 'Electron seguro: tokens que React nunca ve', en: 'Secure Electron: tokens React never sees' },
        idea: { es: 'La interfaz no necesita conocer las credenciales.', en: 'The interface does not need to know the credentials.' },
        points: [
          { es: 'Separación estricta entre proceso principal, preload y renderer.', en: 'Strict separation between main process, preload and renderer.' },
          { es: 'Los JWT nunca llegan a React; el refresh token se cifra con safeStorage, que usa el Llavero de macOS.', en: 'JWTs never reach React; the refresh token is encrypted with safeStorage, which uses the macOS Keychain.' },
          { es: 'Lista blanca de hosts para la API y los enlaces externos, y validación del origen de cada llamada IPC.', en: 'Host allowlist for the API and external links, and origin validation on every IPC call.' },
        ],
        shows: { es: 'Seguridad pensada en la arquitectura, no pegada al final.', en: 'Security designed into the architecture, not bolted on at the end.' },
        figures: [img(SANO, 'panel-configuracion', { es: 'Configuración remota: mantenimiento y versiones mínimas', en: 'Remote configuration: maintenance and minimum versions' }, 'wide')],
      },
      {
        title: { es: 'Hice un POC antes de elegir el modelo de IA', en: 'I ran a proof of concept before choosing the AI model' },
        idea: { es: 'Decidir con una prueba, no con una corazonada.', en: 'Decide with a test, not a hunch.' },
        points: [
          { es: 'La prueba: un modelo de 2B en CPU lee bien los sellos y la marca, pero falla la tabla nutrimental. El de 7B la lee completa.', en: 'The test: a 2B model on CPU reads the warning labels and brand well, but fails the nutrition table. The 7B model reads it completely.' },
          { es: 'Decisión: correr Qwen2.5-VL-7B como subproceso del proceso principal con llama-server (Metal/GPU), sin tocar el CSP ni abrir una segunda ventana.', en: 'Decision: run Qwen2.5-VL-7B as a subprocess of the main process with llama-server (Metal/GPU), without touching the CSP or opening a second window.' },
          { es: 'Salida forzada por esquema JSON, análisis en cola imagen por imagen y validación del dígito de control del EAN-13.', en: 'Output forced by a JSON schema, image-by-image queued analysis and EAN-13 check digit validation.' },
          { es: 'Pendiente conocido: empaquetar llama-server y los modelos GGUF, y sumar un lector de código de barras dedicado como respaldo.', en: 'Known to-do: bundle llama-server and the GGUF models, and add a dedicated barcode reader as a fallback.' },
        ],
        shows: { es: 'Integración de IA local y decisiones basadas en pruebas.', en: 'Local AI integration and test-based decisions.' },
        figures: [img(SANO, 'panel-productos', { es: 'Catálogo de 9 207 productos que alimenta el asistente', en: 'The 9,207-product catalog the assistant feeds' }, 'wide')],
      },
      {
        title: { es: 'Fotos de producto limpias, sin subirlas a nadie', en: 'Clean product photos, without uploading them anywhere' },
        idea: { es: 'Procesar imágenes en el equipo y guardarlas bien.', en: 'Process images on the device and store them properly.' },
        points: [
          { es: 'Subida presignada a Cloudflare R2, editor de recorte y remoción de fondo con un modelo ONNX local.', en: 'Presigned upload to Cloudflare R2, a crop editor and background removal with a local ONNX model.' },
          { es: 'En el catálogo se ve qué productos aún no tienen imagen o necesitan revisión de imágenes.', en: 'The catalog shows which products still lack an image or need an image review.' },
        ],
        shows: { es: 'Procesamiento de imágenes de extremo a extremo.', en: 'End-to-end image processing.' },
        figures: [img(SANO, 'panel-huecos-datos', { es: 'Huecos de datos: productos sin imagen, ingredientes o nutrición', en: 'Data gaps: products without image, ingredients or nutrition' }, 'wide')],
      },
      {
        title: { es: 'El dashboard: interfaces para operar', en: 'The dashboard: interfaces for operating' },
        idea: { es: 'Una lectura rápida del negocio y herramientas para corregirlo.', en: 'A quick read of the business and tools to fix it.' },
        points: [
          { es: 'Inicio con KPIs, filtros de histórico, 30 y 7 días y una gráfica que cruza escaneos con usuarios activos.', en: 'Home with KPIs, history, 30 and 7 day filters and a chart crossing scans with active users.' },
          { es: 'Salud del catálogo: productos con imagen, completitud promedio, origen de los datos, riesgo de aditivos y sellos NOM-051 más frecuentes.', en: 'Catalog health: products with images, average completeness, data origin, additive risk and the most frequent NOM-051 warning labels.' },
          { es: 'Tabla de productos con paginación, búsqueda, filtro por categoría, indicador de completitud y de revisión de imágenes.', en: 'Product table with pagination, search, category filter, and completeness and image-review indicators.' },
          { es: 'Salud del score: cobertura, distribución Nutri-Score y NOVA. Además, reportes de contenido, problemas y sugerencias de usuarios, bugs y configuración remota de versiones y mantenimiento.', en: 'Score health: coverage, Nutri-Score and NOVA distribution. Also content reports, user problems and suggestions, bugs and remote configuration of versions and maintenance.' },
        ],
        shows: { es: 'Diseño de interfaces de operación con datos reales.', en: 'Designing operations interfaces with real data.' },
        figures: [
          img(SANO, 'panel-inicio', { es: 'Inicio del dashboard con KPIs y tendencia', en: 'Dashboard home with KPIs and trend' }, 'wide'),
          img(SANO, 'panel-catalogo-salud', { es: 'Salud y composición del catálogo', en: 'Catalog health and composition' }, 'wide'),
          img(SANO, 'panel-productos', { es: 'Lista de productos', en: 'Product list' }, 'wide'),
          img(SANO, 'panel-score', { es: 'Salud del scoring del catálogo', en: 'Catalog scoring health' }, 'wide'),
          img(SANO, 'panel-reportes', { es: 'Cola de moderación de reportes', en: 'Content report moderation queue' }, 'wide'),
          img(SANO, 'panel-sugerencias', { es: 'Problemas y sugerencias de los usuarios', en: 'User problems and suggestions' }, 'wide'),
        ],
      },
      {
        title: { es: 'Estructura modular para un dashboard que crece', en: 'Modular structure for a dashboard that grows' },
        idea: { es: 'Cada dominio vive en su carpeta con todo lo suyo.', en: 'Each domain lives in its own folder with everything it needs.' },
        points: [
          { es: 'Cada módulo tiene páginas, componentes, servicios, store y tipos. El estado global se reserva para lo transversal.', en: 'Each module has pages, components, services, store and types. Global state is reserved for what is cross-cutting.' },
          { es: 'Un store de Zustand por módulo, y una carpeta compartida solo para los contratos entre procesos.', en: 'One Zustand store per module, and a shared folder only for contracts between processes.' },
          { es: 'Backend: gateway en NestJS con Docker Compose y variables obligatorias en producción, como HTTPS y hosts permitidos.', en: 'Backend: a NestJS gateway with Docker Compose and mandatory production variables such as HTTPS and allowed hosts.' },
        ],
        shows: { es: 'Código que se puede seguir creciendo sin enredarse.', en: 'Code you can keep growing without tangling it.' },
        figures: [img(SANO, 'panel-sugerencias', { es: 'Un módulo más del dashboard: problemas y sugerencias', en: 'Another dashboard module: problems and suggestions' }, 'wide')],
      },
      {
        title: { es: 'La landing y cómo documento para no perder el contexto', en: 'The landing and how I document so I never lose context' },
        idea: { es: 'Un sitio que vende la promesa, y archivos que sostienen el proyecto.', en: 'A site that sells the promise, and files that hold the project together.' },
        points: [
          { es: 'Landing en Astro, React y Tailwind v4, lista para Cloudflare: héroe con tarjeta de calificación, comparador interactivo y reporte semanal.', en: 'Landing in Astro, React and Tailwind v4, ready for Cloudflare: a hero with a rating card, an interactive comparator and a weekly report.' },
          { es: 'Archivos TODO, PENDIENTES, HECHO y SIGUIENTE_VERSION y documentos por módulo para tener trazabilidad y retomar sin releer todo.', en: 'TODO, PENDING, DONE and NEXT_VERSION files plus per-module docs for traceability and resuming without rereading everything.' },
          { es: 'Trabajo con asistentes de IA para acelerar la implementación, manteniendo las decisiones y la revisión como propias.', en: 'I work with AI assistants to speed up implementation, keeping the decisions and the review my own.' },
        ],
        shows: { es: 'Dirección técnica con rastro escrito.', en: 'Technical direction with a written trail.' },
        figures: [img(SANO, 'landing-hero', { es: 'Portada de la landing de Sano', en: 'Sano landing hero' }, 'wide')],
      },
    ],
    learned: [
      { es: 'Probar antes de elegir un modelo de IA evita arquitectura construida sobre una suposición.', en: 'Testing before choosing an AI model avoids architecture built on an assumption.' },
      { es: 'Un token que la interfaz nunca ve es un token que no se puede filtrar desde la interfaz.', en: 'A token the UI never sees is a token that cannot leak from the UI.' },
      { es: 'Documentar pendientes y lo hecho permite retomar un proyecto grande sin perder el hilo.', en: 'Documenting to-dos and what is done lets me resume a large project without losing the thread.' },
    ],
    improve: [
      { es: 'Empaquetar llama-server y los modelos GGUF con electron-builder.', en: 'Bundle llama-server and the GGUF models with electron-builder.' },
      { es: 'Recorte por imagen para encuadrar la tabla nutrimental.', en: 'Per-image cropping to frame the nutrition table.' },
      { es: 'Lector de código de barras dedicado (zxing) como respaldo del modelo.', en: 'A dedicated barcode reader (zxing) as a fallback to the model.' },
      { es: 'Pruebas automatizadas del módulo de visión.', en: 'Automated tests for the vision module.' },
      { es: 'Soporte para Windows (DPAPI); Linux queda fuera de alcance por ahora.', en: 'Windows support (DPAPI); Linux is out of scope for now.' },
    ],
  },
];
