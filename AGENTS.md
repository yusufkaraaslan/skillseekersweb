# AGENTS.md - skillseekersweb

This file provides essential guidance for AI coding agents working with the **skillseekersweb** project.

## Project Overview

**skillseekersweb** is the official web application and admin dashboard for the [Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) PyPI package.

- **Repository:** https://github.com/yusufkaraaslan/skillseekersweb
- **Live Site:** https://skillseekersweb.com
- **Type:** Astro + React SSR web application
- **Deployment:** Vercel Edge (automatic via GitHub integration)
- **Package Version:** 0.0.1
- **Status:** Production

### Purpose

1. **Landing Page** (`/`) - Marketing site with feature showcase, quick start guide, and stats
2. **Admin Dashboard** (`/admin`) - Review and approve user-submitted skill-seekers configurations via GitHub Issues
3. **Documentation Hub** (`/docs`) - Comprehensive guides for using skill-seekers package (45+ markdown files)
4. **Blog** (`/blog`) - Release announcements, tutorials, and guides
5. **Config Gallery** (`/configs`) - Browse, validate, and submit preset configurations
6. **Internationalization** - Support for English (`en`) and Chinese (`zh`) languages

## Technology Stack

### Core Framework
- **Astro 5.16.6** - SSR-enabled static site generator with file-based routing
- **React 18.3.1** - Interactive components (admin dashboard, config validator, gallery)
- **TypeScript** - Strict type checking enabled (extends `astro/tsconfigs/strict`)

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/typography** - Prose styling for documentation
- **@tailwindcss/vite** - Vite plugin for Tailwind CSS
- **Dark Mode** - Class-based strategy (`darkMode: 'class'`), dark theme by default
- **Custom Theme** - Extended color palette:
  - `dark.bg`: #0a0a0f
  - `dark.surface`: #13131a
  - `dark.border`: #1f1f29
  - `brand.primary`: #6366f1 (Indigo-500)
  - `brand.secondary`: #8b5cf6 (Purple-500)
- **Custom Animations** - fade-in, slide-in, gradient, float effects

### Backend & APIs
- **@astrojs/vercel** - SSR adapter for Vercel Edge
- **GitHub OAuth** - Admin authentication via `/api/auth/*` endpoints (cookie-based sessions)
- **GitHub API** - Issue management and repository commits to `skill-seekers-configs` repo
- **Upstash Redis + @upstash/ratelimit** - API rate limiting

### Monitoring & Analytics
- **@sentry/astro** - Error tracking and performance monitoring (client + server)
- **@vercel/analytics** - Web analytics

### Testing
- **Vitest 4.0.16** - Unit and integration tests
- **@testing-library/react** - React component testing
- **@testing-library/jest-dom** - DOM assertions
- **jsdom** - DOM testing environment
- **Coverage** - v8 provider with text/json/html reports

### Build Tools
- **Vite** - Build tool (via Astro) with path alias (`@` → `./src`)
- **npm** - Package manager

## Project Structure

```
skillseekersweb/
├── src/
│   ├── pages/                  # Astro pages (file-based routing)
│   │   ├── index.astro         # Homepage
│   │   ├── admin.astro         # Admin dashboard (requires GitHub auth)
│   │   ├── configs.astro       # Config gallery & submission
│   │   ├── blog/               # Blog pages
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro # Dynamic blog routes
│   │   ├── docs/               # Documentation pages
│   │   │   ├── index.astro
│   │   │   ├── getting-started.astro
│   │   │   └── [...slug].astro # Dynamic doc routes via content collections
│   │   ├── zh/                 # Chinese translations (mirrors English structure)
│   │   │   ├── index.astro
│   │   │   ├── configs.astro
│   │   │   ├── blog/
│   │   │   └── docs/
│   │   └── api/                # API routes (SSR endpoints)
│   │       ├── auth/           # GitHub OAuth endpoints
│   │       │   ├── github.ts   # Initiate OAuth flow
│   │       │   ├── callback.ts # OAuth callback handler
│   │       │   └── logout.ts   # Clear session
│   │       ├── admin/          # Admin endpoints
│   │       │   ├── submissions.ts  # Fetch pending submissions
│   │       │   ├── approve.ts      # Approve and commit config
│   │       │   ├── reject.ts       # Reject and close issue
│   │       │   └── debug.ts        # Debug configuration
│   │       └── submit-config.ts    # Public config submission
│   ├── components/             # React & Astro components
│   │   ├── react/              # React interactive components
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ConfigValidator.tsx
│   │   │   ├── ConfigGallery.tsx
│   │   │   ├── ConfigCard.tsx
│   │   │   ├── ConfigDetailModal.tsx
│   │   │   ├── ConfigFilters.tsx
│   │   │   ├── ConfigSearch.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── FeatureMatrix.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ViewToggle.tsx
│   │   ├── astro/              # Astro static components
│   │   │   ├── layout/         # Header, Footer
│   │   │   ├── landing/        # Hero, Stats, UseCases, About, QuickStart, Sources
│   │   │   ├── docs/           # Sidebar, TableOfContents
│   │   │   └── blog/           # BlogCard, BlogList
│   │   └── seo/                # SEO components (JsonLd.astro)
│   ├── content/                # Content collections
│   │   ├── config.ts           # Content collection schemas
│   │   ├── docs/               # English documentation (45+ markdown files)
│   │   ├── docs-zh/            # Chinese translations (9/45 complete)
│   │   ├── blog/               # English blog posts
│   │   └── blog-zh/            # Chinese blog posts
│   ├── layouts/                # Page layouts
│   │   ├── BaseLayout.astro    # Root layout with SEO, i18n
│   │   └── DocsLayout.astro    # Documentation page layout
│   ├── styles/                 # Global styles
│   │   └── global.css          # Tailwind imports, prose customization, animations
│   ├── utils/                  # Utility functions
│   │   ├── ratelimit.ts        # Rate limiting with Upstash
│   │   ├── api.ts              # API utilities
│   │   └── types.ts            # Shared TypeScript types
│   ├── i18n/                   # Internationalization
│   │   ├── translations/       # Translation JSON files
│   │   │   ├── en.json         # English translations
│   │   │   └── zh.json         # Chinese translations
│   │   ├── utils.ts            # i18n utility functions
│   │   └── useTranslations.ts  # React hook for translations
│   └── test/                   # Test utilities
│       └── setup.ts            # Vitest setup (mocks, cleanup)
├── public/                     # Static assets (favicon.svg, og-image.png, robots.txt)
├── dist/                       # Build output (generated)
├── coverage/                   # Test coverage reports (generated)
├── .github/workflows/          # GitHub Actions
│   ├── config-submission-acknowledgment.yml
│   └── email-notification-template.yml.template
├── astro.config.mjs            # Astro configuration (i18n, sitemap, sentry)
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vitest.config.ts            # Vitest configuration
├── sentry.client.config.ts     # Sentry client configuration
├── sentry.server.config.ts     # Sentry server configuration
├── package.json                # Dependencies & scripts
├── .env.example                # Environment variables template
└── *.md                        # Documentation files
```

## Build and Development Commands

```bash
# Development
npm run dev                   # Start dev server at localhost:4321

# Building
npm run build                 # Build for production → dist/
npm run preview               # Preview production build locally

# Testing (CRITICAL - see Testing Policy below)
npm test                      # Run tests (watch mode)
npm run test:ui               # Run tests with UI
npm run test:coverage         # Run tests with coverage report
npm test -- --run             # Run tests once (CI mode)

# Astro CLI
npm run astro ...             # Run Astro CLI commands
npm run astro -- --help       # Get help

# Type Checking
npx astro check               # Check Astro files
npx tsc --noEmit              # Check TypeScript files
```

## Testing Policy

**CRITICAL REQUIREMENT:**
> "Never skip any test. Always make sure all tests pass."

**This means:**
- **ALWAYS** run `npm test` before committing changes
- **Fix ALL failing tests** - never skip or disable tests
- Add tests for new features/components
- Maintain test coverage for critical paths

**Test Structure:**
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- React components: Use `@testing-library/react`
- Utilities: Use Vitest
- Setup file: `src/test/setup.ts`

**Running Tests:**
```bash
# Run all tests (watch mode)
npm test

# Run once (for CI)
npm test -- --run

# Run specific test file
npm test -- src/components/react/ConfigValidator.test.tsx

# With coverage
npm run test:coverage
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled (extends `astro/tsconfigs/strict`)
- Use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `satisfies` keyword for configuration objects

### React Components
- Use functional components with hooks
- Props interface named `Props` or `{ComponentName}Props`
- Error boundaries wrap critical components (AdminDashboard, ConfigValidator, ConfigGallery)
- Use Tailwind classes for styling (no CSS modules)
- Client-side hydration: Use `client:load` directive in Astro

### Astro Components
- Use `---` frontmatter for server-side code
- Props interface defined with `interface Props`
- Use `slot` for content composition
- Access props via `Astro.props`

### File Naming
- Components: PascalCase (`ConfigValidator.tsx`)
- Utilities: camelCase (`ratelimit.ts`)
- Pages: lowercase (`index.astro`, `[...slug].astro`)
- API routes: lowercase (`submit-config.ts`)

### CSS/Tailwind
- Use custom color palette from `tailwind.config.ts`
- Dark mode is default (`class` strategy)
- Custom colors: `dark.bg`, `dark.surface`, `brand.primary`, etc.
- Animations defined in Tailwind config (`animate-fade-in`, `animate-slide-in`)
- Global styles in `src/styles/global.css` with prose customization

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Site Configuration
SITE=https://skillseekersweb.com              # Production URL

# GitHub OAuth (Admin Authentication)
GITHUB_OAUTH_CLIENT_ID=your_client_id
GITHUB_OAUTH_CLIENT_SECRET=your_client_secret

# GitHub API (Repository Operations)
GITHUB_TOKEN=ghp_xxxxx                        # PAT with 'repo' scope

# Admin Access Control
ADMIN_GITHUB_USERNAMES=user1,user2            # Comma-separated GitHub usernames

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Sentry (Error Monitoring)
SENTRY_DSN=https://...
PUBLIC_SENTRY_DSN=https://...                 # Same as SENTRY_DSN
SENTRY_AUTH_TOKEN=sntrys_...                  # For source map upload
```

**Security:**
- NEVER commit `.env` to git (it's in `.gitignore`)
- Use different tokens for development and production
- Rotate tokens periodically
- See `ADMIN_SETUP.md` for detailed setup instructions

## Internationalization (i18n)

**Supported Languages:**
- English (`en`) - Default, no URL prefix
- Chinese (`zh`) - `/zh/*` prefix

**Configuration:**
- Routing: `prefixDefaultLocale: false` (English at root)
- Translation files: `src/i18n/translations/{en,zh}.json`
- Content collections: `src/content/docs/` and `src/content/docs-zh/`
- Blog collections: `src/content/blog/` and `src/content/blog-zh/`

**Adding Translations:**
1. Add key to `src/i18n/translations/en.json`
2. Add translation to `src/i18n/translations/zh.json`
3. Use via `useTranslations()` hook or `getLangFromUrl()` utility

**Translation Progress:**
- See `TRANSLATION_PROGRESS.md` for current status (9/45 files complete)

## Content Collections

**Schema:** Defined in `src/content/config.ts`

```typescript
// Docs schema
{
  title: string,
  description: string,
  section: enum,        // about, getting-started, tutorials, manual, etc.
  subsection?: enum,    // scraping, codebase-analysis, etc.
  order?: number,       // For sorting
  draft?: boolean,      // Default: false
}

// Blog schema
{
  title: string,
  description: string,
  pubDate: date,
  author: string,       // Default: 'Skill Seekers Team'
  tags: string[],
  image?: string,
  draft: boolean,
  featured: boolean,
}
```

**Collections:**
- `docs` - English documentation (`src/content/docs/`)
- `docs-zh` - Chinese documentation (`src/content/docs-zh/`)
- `blog` - English blog posts (`src/content/blog/`)
- `blog-zh` - Chinese blog posts (`src/content/blog-zh/`)

**Rendering:** Dynamic routes via `src/pages/docs/[...slug].astro` and `src/pages/blog/[...slug].astro`

## API Endpoints

### Public Endpoints
- `POST /api/submit-config` - Submit config for review (rate limited: 5/hour/IP)

### Authentication Endpoints
- `GET /api/auth/github` - Initiate GitHub OAuth
- `GET /api/auth/callback` - OAuth callback
- `GET /api/auth/logout` - Clear session

### Admin Endpoints (Require auth + whitelist)
- `GET /api/admin/submissions` - List pending submissions (rate limited: 30/hour/user)
- `POST /api/admin/approve` - Approve config (rate limited: 20/hour/user)
- `POST /api/admin/reject` - Reject config (rate limited: 20/hour/user)
- `GET /api/admin/debug` - Debug info

**Session:**
- Cookie name: `gh_admin_session`
- Contains: `{ username, access_token, timestamp }`
- Admin check: Username must be in `ADMIN_GITHUB_USERNAMES` env var

## Rate Limiting

Implemented via Upstash Redis:

| Endpoint | Limit | Window | Identifier |
|----------|-------|--------|------------|
| `POST /api/submit-config` | 5 | 1 hour | IP Address |
| `POST /api/admin/approve` | 20 | 1 hour | Username |
| `POST /api/admin/reject` | 20 | 1 hour | Username |
| `GET /api/admin/submissions` | 30 | 1 hour | Username |
| `GET /api/auth/github` | 10 | 15 min | IP Address |

**Implementation:** See `src/utils/ratelimit.ts`

**Graceful Degradation:** If Upstash not configured, requests are allowed (warning logged).

## Deployment

### Vercel Configuration
- **Adapter:** `@astrojs/vercel`
- **Output:** `server` (SSR enabled)
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`

### Automatic Deployments
- **Production:** `main` branch → https://skillseekersweb.com
- **Preview:** Pull requests → Preview URLs

### Environment Variables in Vercel
Set in Vercel Dashboard → Settings → Environment Variables
- Must include all variables from `.env.example`
- Update `SITE` to production URL

## Security Considerations

### ✅ DO:
- Keep `.env` file secret (never commit)
- Use strong GitHub PAT with minimal required scopes
- Limit admin whitelist to trusted users only
- Validate all user input on server-side
- Apply rate limiting to all mutation endpoints
- Use parameterized queries (prevent injection)
- Filter sensitive data from Sentry events

### ❌ DON'T:
- **NEVER** commit `.env` to git
- **NEVER** expose GitHub tokens or OAuth secrets
- **NEVER** bypass admin authentication checks
- **NEVER** add untrusted users to admin whitelist
- **NEVER** skip tests (explicit user requirement)

## Key Documentation Files

- `CLAUDE.md` - Comprehensive project guidance for Claude Code
- `ADMIN_SETUP.md` - Admin dashboard setup guide
- `SENTRY_SETUP.md` - Error monitoring setup
- `RATE_LIMITING.md` - Rate limiting documentation
- `EMAIL_NOTIFICATIONS_SETUP.md` - Email notification setup (Proton Mail)
- `TRANSLATION_PROGRESS.md` - i18n translation status
- `.env.example` - Environment variables template

## Common Tasks

### Adding a New Documentation Page

```bash
# 1. Create markdown file
touch src/content/docs/category/new-page.md

# 2. Add frontmatter
# ---
# title: "Page Title"
# description: "Page description"
# section: "category"
# order: 10
# ---

# 3. Write content in markdown

# 4. Test locally
npm run dev
# Visit: http://localhost:4321/docs/category/new-page

# 5. Add Chinese translation (optional)
touch src/content/docs-zh/category/new-page.md
```

### Adding a New Blog Post

```bash
# 1. Create markdown file
touch src/content/blog/YYYY-MM-DD-post-title.md

# 2. Add frontmatter with pubDate, title, description, tags

# 3. Write content

# 4. Test at http://localhost:4321/blog/post-title
```

### Adding a New API Endpoint

```bash
# 1. Create TypeScript file in src/pages/api/
touch src/pages/api/my-endpoint.ts

# 2. Export handlers
# export const GET: APIRoute = async ({ request }) => {
#   return new Response(JSON.stringify({ success: true }));
# };

# 3. Add rate limiting if mutation
# import { rateLimits, applyRateLimit, getClientIP } from '../../utils/ratelimit';

# 4. Test locally
npm run dev
# Test: http://localhost:4321/api/my-endpoint
```

### Adding a New React Component

```bash
# 1. Create component file
touch src/components/react/MyComponent.tsx

# 2. Create test file
touch src/components/react/MyComponent.test.tsx

# 3. Write component with TypeScript props interface

# 4. Add to page or another component
```

## Troubleshooting

### Dev Server Issues

**Port 4321 in use:**
```bash
lsof -ti:4321 | xargs kill -9
npm run dev
```

**Build fails with type errors:**
```bash
npx astro check
npx tsc --noEmit
```

### Admin Dashboard Issues

**"Unauthorized" error:**
- Session expired, sign in again via GitHub OAuth

**"Not an admin" error:**
- Your GitHub username not in `ADMIN_GITHUB_USERNAMES` environment variable

**"Failed to fetch submissions":**
- Check `GITHUB_TOKEN` is valid and has `repo` scope

### Test Failures

**Tests failing after dependency update:**
```bash
rm -rf node_modules package-lock.json
npm install
npm test
```

**DOM-related test errors:**
- Ensure `jsdom` environment is configured in `vitest.config.ts`
- Check `src/test/setup.ts` has proper cleanup

## Related Projects

- **Skill_Seekers** - Python package this website supports
  - Repository: https://github.com/yusufkaraaslan/Skill_Seekers
  - PyPI: https://pypi.org/project/skill-seekers/
- **skill-seekers-configs** - Config repository for community submissions
  - Repository: https://github.com/yusufkaraaslan/skill-seekers-configs

## Support & Resources

- **GitHub Issues:** https://github.com/yusufkaraaslan/skillseekersweb/issues
- **Astro Docs:** https://docs.astro.build
- **React Docs:** https://react.dev
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

**Last Updated:** 2026-02-22
**Astro Version:** 5.16.6
**React Version:** 18.3.1
**Tailwind Version:** 4.1.18
**Deployment:** Vercel Edge (SSR)
