// Central SEO data. Set PUBLIC_SITE_URL (or edit the fallback) to the real domain
// so canonical URLs, Open Graph images and the sitemap point to it.
export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || 'https://frankhuerta.dev').replace(/\/$/, '');

export const SITE = {
  url: SITE_URL,
  name: 'Frank Huerta',
  fullName: 'Frank Giovanni Segura Huerta',
  jobTitle: 'Desarrollador Backend',
  title: 'Frank Huerta — Desarrollador Backend | Node.js, Python, Docker y AWS',
  description:
    'Portfolio de Frank Huerta, desarrollador backend. Construyo APIs REST, sistemas escalables e infraestructura cloud con Node.js, Python, Docker, Kubernetes y AWS.',
  ogImage: '/og-image.png',
  keywords: [
    'Frank Huerta',
    'Frank Giovanni Segura Huerta',
    'desarrollador backend',
    'backend developer',
    'Node.js',
    'Python',
    'APIs REST',
    'Docker',
    'Kubernetes',
    'AWS',
    'DevOps',
    'PostgreSQL',
    'MongoDB',
    'React',
    'Astro',
  ],
  sameAs: ['https://github.com/TheGeistGamer', 'https://www.linkedin.com/in/frank-giovanni-s-10a798360'],
};
