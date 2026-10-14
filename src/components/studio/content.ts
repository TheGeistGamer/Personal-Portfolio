import type { L } from '../../data/projects';

// Content for the studio landing. Texts come from the previous sections
// (About, Stack, Contact) so both versions of the site say the same thing.

export const about = {
  paragraphs: [
    {
      es: "Soy <b>desarrollador backend</b>. Me apasiona construir el lado invisible de las cosas: servidores, bases de datos y APIs que aguantan carga y no se caen a las 3am.",
      en: "I'm a <b>backend developer</b>. I'm passionate about building the invisible side of things: servers, databases and APIs that handle load and don't crash at 3am.",
    },
    {
      es: 'Mi filosofía: <b>código simple por encima del código ingenioso</b>, automatizar lo repetitivo y aprender algo nuevo en cada proyecto. Creo en los fundamentos sólidos, en documentar bien y en construir para quien venga después.',
      en: 'My philosophy: <b>simple code over clever code</b>, automate the repetitive, and learn something new in every project. I believe in solid fundamentals, good documentation, and building for whoever comes next.',
    },
  ] as L[],
  facts: [
    { n: '04+', l: { es: 'proyectos fuertes', en: 'strong projects' } },
    { n: '∞', l: { es: 'ganas de aprender', en: 'drive to learn' } },
    { n: '24/7', l: { es: 'uptime mental', en: 'mental uptime' } },
  ],
};

export type StackGroup = {
  id: 'backend' | 'devops' | 'frontend';
  name: string;
  sub: L;
  bars: { name: string; pc: number }[];
  chips: string[];
};

export const stack: StackGroup[] = [
  {
    id: 'backend',
    name: 'Backend',
    sub: { es: 'el motor', en: 'the engine' },
    bars: [
      { name: 'Node.js', pc: 90 },
      { name: 'Python', pc: 85 },
      { name: 'SQL', pc: 85 },
      { name: 'NoSQL', pc: 78 },
    ],
    chips: ['REST', 'APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'devops',
    name: 'DevOps / Cloud',
    sub: { es: 'la infraestructura', en: 'the infrastructure' },
    bars: [
      { name: 'Docker', pc: 85 },
      { name: 'Kubernetes', pc: 75 },
      { name: 'AWS', pc: 80 },
      { name: 'Linux', pc: 85 },
    ],
    chips: ['Git', 'CI/CD', 'Claude Engine', 'DevOps'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    sub: { es: 'un poco de magia visual', en: 'a bit of visual magic' },
    bars: [
      { name: 'React', pc: 80 },
      { name: 'Next.js', pc: 75 },
      { name: 'Astro JS', pc: 72 },
      { name: 'Tailwind', pc: 80 },
    ],
    chips: ['JavaScript', 'HTML/CSS', 'React Native'],
  },
];

// Hotspots float over the 3D scene. `node` is the object name inside the GLB,
// `open` the window it opens, `group` the filter pill it belongs to.
export type Hotspot = {
  node: string;
  open: string;
  group: 'projects' | 'stack' | 'contact' | 'about';
  icon: 'user' | 'grid' | 'phone' | 'globe' | 'code' | 'db' | 'server' | 'mail' | 'infinity';
  label: L;
};

export const hotspots: Hotspot[] = [
  { node: 'node_monitor', open: 'projects', group: 'projects', icon: 'grid', label: { es: 'Proyectos', en: 'Projects' } },
  { node: 'node_profile', open: 'about', group: 'about', icon: 'user', label: { es: 'Sobre mí', en: 'About me' } },
  { node: 'node_phone', open: 'infinity-lens', group: 'projects', icon: 'phone', label: { es: 'Infinity Lens · app iOS', en: 'Infinity Lens · iOS app' } },
  { node: 'node_project_landing', open: 'infinity-lens-landing', group: 'projects', icon: 'globe', label: { es: 'Infinity Lens · landing', en: 'Infinity Lens · landing' } },
  { node: 'node_api', open: 'stack:backend', group: 'stack', icon: 'code', label: { es: 'Backend', en: 'Backend' } },
  { node: 'node_db', open: 'stack:backend', group: 'stack', icon: 'db', label: { es: 'Bases de datos', en: 'Databases' } },
  { node: 'node_server', open: 'stack:devops', group: 'stack', icon: 'server', label: { es: 'DevOps / Cloud', en: 'DevOps / Cloud' } },
  { node: 'node_project_lens', open: 'agency', group: 'projects', icon: 'infinity', label: { es: 'InfinityDev Agency', en: 'InfinityDev Agency' } },
  { node: 'node_mail', open: 'contact', group: 'contact', icon: 'mail', label: { es: 'Contacto', en: 'Contact' } },
];
