// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Real domain, used for canonical URLs, Open Graph and the sitemap.
  site: process.env.PUBLIC_SITE_URL || 'https://portfolio.infinitydev.agency',

  // The page is a single route: inlining its CSS removes the render-blocking request.
  build: { inlineStylesheets: 'always' },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});