# CLAUDE.md - skillseekersweb

This file provides guidance to Claude Code when working with the **skillseekersweb** project.

## Project Overview

**skillseekersweb** is the official web application and admin dashboard for the [Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) PyPI package.

**Repository:** https://github.com/yusufkaraaslan/skillseekersweb
**Live Site:** https://skillseekersweb.com
**Type:** Astro + React SSR web application
**Deployment:** Vercel
**Status:** Production (v0.0.1)

### Purpose

1. **Admin Dashboard** - Review and approve user-submitted skill-seekers configurations via GitHub Issues
2. **Documentation Hub** - Comprehensive guides for using skill-seekers package
3. **Config Gallery** - Browse, validate, and submit preset configurations
4. **Internationalization** - Support for English and Chinese (zh) languages

## Tech Stack

### Core Framework
- **Astro 5.16.6** - SSR-enabled static site generator
- **React 18.3.1** - Interactive components
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/typography** - Prose styling for documentation

### Backend & APIs
- **Vercel Adapter** - SSR deployment on Vercel Edge
- **GitHub OAuth** - Admin authentication
- **GitHub API** - Issue management, repository commits
- **Upstash Redis + Rate Limiting** - API rate limiting

### Monitoring & Analytics
- **Sentry** - Error tracking and monitoring
- **Vercel Analytics** - Web analytics

### Testing
- **Vitest 4.0.16** - Unit and integration tests
- **Testing Library** - React component testing
- **jsdom** - DOM testing environment

### Build & Dev Tools
- **Vite** - Build tool
- **npm** - Package manager

## Project Structure

```
skillseekersweb/
├── src/
│   ├── pages/              # Astro pages (file-based routing)
│   │   ├── index.astro     # Homepage
│   │   ├── admin.astro     # Admin dashboard (requires auth)
│   │   ├── configs.astro   # Config gallery & submission
│   │   ├── docs/           # Documentation pages
│   │   │   ├── index.astro
│   │   │   ├── getting-started.astro
│   │   │   └── [...slug].astro  # Dynamic doc routes
│   │   ├── zh/             # Chinese translations
│   │   │   ├── index.astro
│   │   │   ├── configs.astro
│   │   │   └── docs/
│   │   └── api/            # API routes (SSR)
│   │       ├── auth/       # GitHub OAuth endpoints
│   │       │   ├── github.ts
│   │       │   ├── callback.ts
│   │       │   └── logout.ts
│   │       ├── admin/      # Admin endpoints
│   │       │   ├── submissions.ts
│   │       │   ├── approve.ts
│   │       │   ├── reject.ts
│   │       │   └── debug.ts
│   │       └── submit-config.ts
│   ├── components/         # React & Astro components
│   │   ├── react/          # React components
│   │   ├── astro/          # Astro components
│   │   └── seo/            # SEO components
│   ├── content/            # Content collections
│   │   ├── docs/           # English documentation
│   │   └── docs-zh/        # Chinese documentation
│   ├── layouts/            # Page layouts
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── i18n/               # Internationalization
│   │   └── translations/   # Translation files
│   └── test/               # Test utilities
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── coverage/               # Test coverage reports (generated)
├── .github/                # GitHub Actions workflows
├── astro.config.mjs        # Astro configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── vitest.config.ts        # Vitest configuration
├── package.json            # Dependencies & scripts
├── .env.example            # Environment variables template
└── README.md               # Project documentation
```

## Key Features

### 1. Admin Dashboard (`/admin`)

**Authentication:** GitHub OAuth (restricted to whitelisted users)

**Functionality:**
- View pending config submissions from GitHub Issues
- Review config details (JSON structure, metadata)
- Approve configs → Commits to `Skill_Seekers/configs/` directory
- Reject configs → Closes issue with feedback
- One-click workflow for managing submissions

**API Endpoints:**
- `GET /api/auth/github` - Initiate OAuth flow
- `GET /api/auth/callback` - OAuth callback handler
- `GET /api/auth/logout` - Clear session
- `GET /api/admin/submissions` - Fetch pending submissions
- `POST /api/admin/approve` - Approve and commit config
- `POST /api/admin/reject` - Reject and close issue
- `GET /api/admin/debug` - Debug configuration info

### 2. Documentation (`/docs`)

**Content Management:** Astro content collections
- Markdown-based documentation
- Automatic routing via `[...slug].astro`
- Typography styling via `@tailwindcss/typography`

**Languages:**
- English (default) - `/docs/*`
- Chinese - `/zh/docs/*`

### 3. Config Gallery (`/configs`)

**Features:**
- Browse preset configurations
- Validate config JSON structure
- Submit configs to GitHub Issues
- Copy configs for local use

**API:**
- `POST /api/submit-config` - Create GitHub Issue for submission

### 4. Internationalization (i18n)

**Supported Languages:**
- English (`en`) - Default
- Chinese (`zh`) - `/zh/*` prefix

**Configuration:**
- Routing: No prefix for default locale (English)
- Translation files: `src/i18n/translations/`
- Content: Separate content collections (`docs/` and `docs-zh/`)

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Create environment variables
cp .env.example .env
# Edit .env with your credentials (see ADMIN_SETUP.md)
```

### Commands

```bash
# Development
npm run dev                 # Start dev server at localhost:4321

# Building
npm run build               # Build for production → dist/
npm run preview             # Preview production build locally

# Testing
npm test                    # Run tests (watch mode)
npm run test:ui             # Run tests with UI
npm run test:coverage       # Run tests with coverage report

# Astro CLI
npm run astro ...           # Run Astro CLI commands
npm run astro -- --help     # Get help
```

### Testing Philosophy

**Per user's global requirement:**
> "never skip any test. always make sure all test pass"

**This means:**
- ALWAYS run `npm test` before committing
- Fix ALL failing tests - never skip
- Add tests for new features/components
- Maintain test coverage for critical paths

**Test Structure:**
- React components: Use Testing Library
- Utilities: Use Vitest
- Coverage reports: Generated in `coverage/` directory

### Code Quality

```bash
# TypeScript type checking
npx astro check              # Check Astro files
npx tsc --noEmit             # Check TypeScript files

# Linting (if configured)
npm run lint                 # Run linter
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Site Configuration
SITE=http://localhost:4321              # Production: https://skillseekersweb.com

# GitHub OAuth (Admin Authentication)
GITHUB_OAUTH_CLIENT_ID=your_client_id   # From GitHub OAuth App
GITHUB_OAUTH_CLIENT_SECRET=your_secret  # From GitHub OAuth App

# GitHub API (Repository Operations)
GITHUB_TOKEN=ghp_xxxxx                  # Personal Access Token with repo scope

# Admin Access Control
ADMIN_GITHUB_USERNAMES=username1,username2  # Comma-separated list

# Sentry (Error Monitoring)
SENTRY_DSN=https://...                  # Sentry project DSN
SENTRY_AUTH_TOKEN=sntrys_...            # Sentry auth token

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://...      # Upstash Redis URL
UPSTASH_REDIS_REST_TOKEN=xxxxx          # Upstash Redis token
```

**Security:**
- NEVER commit `.env` to git (it's in `.gitignore`)
- Use different tokens for development and production
- Rotate tokens periodically
- See `ADMIN_SETUP.md` for detailed setup instructions

## Deployment

### Vercel Deployment

**Platform:** Vercel Edge (automatic via GitHub integration)

**Configuration:**
- Adapter: `@astrojs/vercel`
- Output: `server` (SSR enabled)
- Build command: `npm run build`
- Output directory: `dist/`

**Environment Variables:**
- Set in Vercel Dashboard → Settings → Environment Variables
- Must include all variables from `.env.example`
- Update `SITE` to production URL

**Automatic Deployments:**
- Production: `main` branch → https://skillseekersweb.com
- Preview: Pull requests → Preview URLs

### Build Process

```bash
npm run build               # Builds to dist/
# Vercel automatically runs this on deployment
```

## Integration with Skill_Seekers

This website integrates with the [Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) repository:

**Config Submission Flow:**
1. User validates config on `/configs` page
2. Clicks "Submit to GitHub"
3. Creates GitHub Issue with labels: `config-submission`, `needs-review`
4. Admin reviews via `/admin` dashboard
5. On approval:
   - Config committed to `Skill_Seekers/configs/[name].json`
   - Issue labeled `approved` and closed
6. On rejection:
   - Issue labeled `rejected` and closed with reason

**GitHub API Operations:**
- List issues with label `config-submission`
- Create commits to `Skill_Seekers` repository
- Add labels to issues
- Post comments on issues
- Close issues

## Common Tasks

### Adding a New Documentation Page

```bash
# 1. Create markdown file
touch src/content/docs/new-page.md

# 2. Add frontmatter
# ---
# title: "Page Title"
# description: "Page description"
# ---

# 3. Write content in markdown

# 4. Test locally
npm run dev
# Visit: http://localhost:4321/docs/new-page

# 5. Add Chinese translation (optional)
touch src/content/docs-zh/new-page.md
```

### Adding a New API Endpoint

```bash
# 1. Create TypeScript file in src/pages/api/
touch src/pages/api/my-endpoint.ts

# 2. Export GET/POST/etc handlers
# Example:
# export async function GET({ request }) {
#   return new Response(JSON.stringify({ success: true }));
# }

# 3. Test locally
npm run dev
# Test: http://localhost:4321/api/my-endpoint
```

### Updating Admin Whitelist

```bash
# Local development
# Edit .env
ADMIN_GITHUB_USERNAMES=user1,user2,user3

# Production (Vercel)
# 1. Go to Vercel Dashboard → Environment Variables
# 2. Update ADMIN_GITHUB_USERNAMES value
# 3. Redeploy or wait for next commit
```

## Testing Guidelines

### Running Tests

```bash
# Run all tests (watch mode)
npm test

# Run tests once (CI mode)
npm test -- --run

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- src/test/example.test.ts

# Run with UI
npm run test:ui
```

### Writing Tests

**React Component Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

**Utility Function Tests:**
```typescript
import { expect, test } from 'vitest';
import { myUtility } from './utils';

test('myUtility works correctly', () => {
  expect(myUtility('input')).toBe('expected output');
});
```

## Key Documentation Files

- `ADMIN_SETUP.md` - Comprehensive guide for setting up admin dashboard
- `EMAIL_NOTIFICATIONS_SETUP.md` - Email notification configuration
- `SENTRY_SETUP.md` - Error monitoring setup
- `RATE_LIMITING.md` - API rate limiting documentation
- `TRANSLATION_PROGRESS.md` - i18n translation status
- `.env.example` - Environment variables template

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, run tests
npm test

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request
# → Vercel creates preview deployment automatically
# → Test preview URL before merging
```

## Troubleshooting

### Dev Server Issues

**Problem:** Port 4321 already in use
**Solution:**
```bash
# Kill existing process
lsof -ti:4321 | xargs kill -9
npm run dev
```

**Problem:** Build fails with type errors
**Solution:**
```bash
# Check for type errors
npx astro check
npx tsc --noEmit
```

### Admin Dashboard Issues

**Problem:** "Unauthorized" error
**Solution:** Session expired, sign in again via GitHub OAuth

**Problem:** "Not an admin" error
**Solution:** Your GitHub username not in `ADMIN_GITHUB_USERNAMES` environment variable

**Problem:** "Failed to fetch submissions"
**Solution:** Check `GITHUB_TOKEN` is valid and has `repo` scope

### Test Failures

**Problem:** Tests failing after dependency update
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

**Problem:** DOM-related test errors
**Solution:** Ensure `jsdom` environment is configured in `vitest.config.ts`

## Best Practices

### Do's ✅

- Run all tests before committing (`npm test`)
- Update documentation when adding features
- Add tests for new components/utilities
- Use TypeScript types for all new code
- Follow existing code structure and patterns
- Test admin features in local development before production
- Keep environment variables secure (never commit `.env`)
- Update Chinese translations when modifying English content

### Don'ts ❌

- Don't skip tests (user's explicit requirement)
- Don't commit `.env` file to git
- Don't bypass admin authentication checks
- Don't expose GitHub tokens or OAuth secrets
- Don't modify production environment variables without testing
- Don't add admin users without verification
- Don't deploy without testing preview URLs first

## Related Projects

- **Skill_Seekers** - Python package this website supports
  Repository: https://github.com/yusufkaraaslan/Skill_Seekers
  PyPI: https://pypi.org/project/skill-seekers/

## Support & Resources

- **GitHub Issues:** https://github.com/yusufkaraaslan/skillseekersweb/issues
- **Astro Docs:** https://docs.astro.build
- **React Docs:** https://react.dev
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

**Last Updated:** 2026-02-03
**Astro Version:** 5.16.6
**React Version:** 18.3.1
**Deployment:** Vercel Edge (SSR)
