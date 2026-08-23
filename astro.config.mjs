// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://nodo-digital.vercel.app',
  integrations: [react(), partytown()],

  vite: {
    plugins: [tailwindcss()]
  }
});