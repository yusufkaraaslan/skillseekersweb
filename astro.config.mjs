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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react({
      experimentalReactChildren: true
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api/'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh',
        },
      },
    }),
    sentry({
      dsn: process.env.SENTRY_DSN,
      project: 'javascript-astro',
      org: 'yusuf-karaaslan',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  ],
  output: 'server', // Enable SSR for API routes and admin dashboard
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});