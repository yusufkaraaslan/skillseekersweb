// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://skillseekersweb.com',
  integrations: [react({
    experimentalReactChildren: true
  })],
  output: 'server', // Enable SSR for API routes and admin dashboard
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});