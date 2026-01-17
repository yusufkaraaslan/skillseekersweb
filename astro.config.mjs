// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://skillseekersweb.com',
  integrations: [
    react({
      experimentalReactChildren: true
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api/')
    }),
    sentry({
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT || 'skillseekersweb',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    })
  ],
  output: 'server', // Enable SSR for API routes and admin dashboard
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});