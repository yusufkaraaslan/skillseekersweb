# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**skillseekersweb** is the web app and admin dashboard for the [skill-seekers](https://pypi.org/project/skill-seekers/) PyPI package. It's an Astro 5 + React 18 SSR application deployed on Vercel.

**Live:** https://skillseekersweb.com

Three main features:
1. **Admin Dashboard** (`/admin`) — Review/approve user-submitted configs via GitHub Issues
2. **Documentation** (`/docs`) — Astro content collections with i18n (en/zh)
3. **Config Gallery** (`/configs`) — Browse, validate, and submit preset configurations

## Commands

```bash
npm run dev              # Dev server at localhost:4321
npm run build            # Production build (SSR via @astrojs/vercel)
npm run preview          # Preview production build locally

npm test                 # Vitest in watch mode
npm test -- --run        # Single run (CI mode)
npm test -- src/path/to/file.test.ts  # Single test file
npm run test:coverage    # Coverage report (v8, outputs to coverage/)

npx astro check          # Type-check Astro files
npx tsc --noEmit         # Type-check TypeScript files
```

## Architecture

### Rendering & Routing

- **SSR mode** (`output: 'server'`) with `@astrojs/vercel` adapter
- File-based routing in `src/pages/`
- API routes at `src/pages/api/**/*.ts` export `GET`/`POST` handlers as `APIRoute`
- i18n: English at `/`, Chinese at `/zh/*`. No `/en/` prefix (`prefixDefaultLocale: false`)
- Path alias: `@` maps to `./src` (configured in vitest.config.ts and tsconfig.json)

### Content Collections

Defined in `src/content/config.ts`. Four collections sharing two schemas:
- `docs` / `docs-zh` — documentation with `section` enum (about, getting-started, tutorials, manual, features, guides, cli, integrations, deployments, reference, community) and optional `subsection`
- `blog` / `blog-zh` — blog posts with `pubDate`, `tags`, `author`, `featured`

Content routes via `[...slug].astro` dynamic pages — no manual routing needed.

### External API

`src/utils/api.ts` fetches configs from `https://api.skillseekersweb.com`. Core types in `src/utils/types.ts` — `Config`, `FilterOptions`, `ViewMode`. The API client handles listing, filtering, and downloading configs.

### Authentication (Admin)

Cookie-based GitHub OAuth sessions (`gh_admin_session` cookie, base64-encoded — not signed/encrypted):
1. `/api/auth/github` initiates OAuth flow
2. `/api/auth/callback` exchanges code, checks `ADMIN_GITHUB_USERNAMES` whitelist
3. Protected `/api/admin/*` endpoints decode cookie to verify session

### Rate Limiting

`src/utils/ratelimit.ts` — Upstash Redis via `@upstash/ratelimit`. Gracefully degrades (allows all requests) when Redis credentials are missing. Applied to admin endpoints and config submission.

### GitHub Integration

**Critical:** Admin operations target `yusufkaraaslan/skill-seekers-configs` repo, NOT the main `Skill_Seekers` package repo.

Flow: user submits config → GitHub Issue created with `config-submission` label → admin approves → config committed to `configs/` directory in that repo.

### Component Organization

- `src/components/react/` — Interactive components (use `client:load` directive in Astro pages). Named exports preferred.
- `src/components/astro/` — Server-rendered components organized by feature: `landing/`, `docs/`, `layout/`, `blog/`
- `src/components/seo/` — JsonLd structured data
- `src/layouts/BaseLayout.astro` — Root layout with SEO meta, hreflang, analytics, Google Fonts (Inter, JetBrains Mono, Space Grotesk)

### Styling

Tailwind CSS 4 with `@tailwindcss/vite` plugin (not PostCSS). Dark mode via `class` strategy — the `<html>` tag always has `class="dark"`.

Custom theme tokens in `tailwind.config.ts`:
- `ocean.*` — brand color palette (deep navy `ocean.700` to bright blue `ocean.500`)
- `dark.*` — dark mode surface/text/border colors (`dark.bg`, `dark.surface`, `dark.text.primary`)
- `brand.*` — semantic colors (primary, secondary, success, warning, error)
- Font families: `font-sans` (Inter), `font-mono` (JetBrains Mono), `font-display` (Space Grotesk)

### Testing

Vitest + jsdom + Testing Library. Setup file at `src/test/setup.ts` (auto-cleanup, jest-dom matchers, `window.open` mock). Test files co-located with components (`*.test.tsx`). Coverage scoped to `src/components/**`.

### Monitoring

- Sentry (`@sentry/astro`) for error tracking
- Vercel Analytics (`@vercel/analytics/astro`) for web analytics

## Code Style

### TypeScript
- Strict mode (extends `astro/tsconfigs/strict`)
- Prefer `interface` over `type` for object shapes
- Use `satisfies` for configuration objects

### Import Order
1. React imports
2. Third-party libraries
3. Type imports (`import type { ... }`)
4. Local utilities (`@/utils/...`)
5. Local components (`@/components/...`)

### Naming
- **Components:** PascalCase (`ConfigValidator.tsx`)
- **Utilities/pages/API routes:** camelCase/lowercase (`ratelimit.ts`, `submit-config.ts`)
- **Types/Interfaces:** PascalCase (`interface ConfigResponse`)

### React Components
- Props interface named `Props` or `{ComponentName}Props`
- Tailwind classes only (no CSS modules, no arbitrary values — extend config if needed)

### Astro Components
- `---` frontmatter for server-side code, `interface Props`, access via `Astro.props`

## Environment Variables

See `.env.example` for all required vars. Key ones:
- `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` — OAuth app for admin auth
- `GITHUB_TOKEN` — PAT with `repo` scope for API operations on `skill-seekers-configs`
- `ADMIN_GITHUB_USERNAMES` — comma-separated whitelist
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — rate limiting (optional for local dev)
- `SENTRY_DSN` / `SENTRY_AUTH_TOKEN` — error monitoring

Env vars accessed via `import.meta.env.*` (Astro convention).

## i18n

- Translation files: `src/i18n/translations/{en,zh}.json`
- Utilities: `src/i18n/utils.ts` — `getTranslation(lang, 'dot.path')`, `getLangFromUrl(url)`, `useTranslatedPath(lang)`
- React hook: `src/i18n/useTranslations.ts`
- Falls back to English when a Chinese translation key is missing
