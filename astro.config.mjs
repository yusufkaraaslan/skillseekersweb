// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://skillseekersweb.com',
  integrations: [react({
    experimentalReactChildren: true
  })],
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  }
});