# AGENTS.md - skillseekersweb

Guidelines for AI coding agents working on this Astro + React SSR project.

## Build, Test & Lint Commands

```bash
# Development
npm run dev                   # Start dev server at localhost:4321

# Building
npm run build                 # Production build → dist/
npm run preview               # Preview production build

# Testing (CRITICAL: Never skip tests)
npm test                      # Run all tests (watch mode)
npm test -- --run             # Run tests once (CI mode)
npm test -- src/components/react/ConfigValidator.test.tsx  # Run single test file
npm test -- --reporter=verbose                              # Verbose output
npm run test:coverage         # Run with coverage report

# Type Checking
npx astro check               # Check Astro files
npx tsc --noEmit              # Check TypeScript files

# Astro CLI
npm run astro -- --help       # Astro CLI help
```

**Testing Policy:** Always run `npm test` before committing. Fix ALL failing tests. Never skip or disable tests.

## Code Style Guidelines

### TypeScript
- Strict mode enabled (extends `astro/tsconfigs/strict`)
- Use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `satisfies` for configuration objects

### Imports (Ordered)
1. React imports
2. Third-party libraries (Sentry, etc.)
3. Type imports (`import type { ... }`)
4. Local utilities (`@/utils/...`)
5. Local components (`@/components/...`)

Example:
```typescript
import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/astro';
import type { Config } from '@/utils/types';
import { getDownloadUrl } from '@/utils/api';
import ConfigCard from './ConfigCard';
```

### React Components
- Functional components with hooks
- Props interface named `Props` or `{ComponentName}Props`
- Default exports for page components
- Tailwind classes only (no CSS modules)
- Error boundaries for critical components
- Client hydration: Use `client:load` directive in Astro

```typescript
interface Props {
  config: Config;
  onSelect?: (id: string) => void;
}

export default function ConfigCard({ config, onSelect }: Props) {
  // implementation
}
```

### Astro Components
- Use `---` frontmatter for server-side code
- Props interface with `interface Props`
- Access props via `Astro.props`
- Use `<slot />` for content composition

```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<h1>{title}</h1>
<slot />
```

### Naming Conventions
- **Components:** PascalCase (`ConfigValidator.tsx`)
- **Utilities:** camelCase (`ratelimit.ts`)
- **Pages:** lowercase (`index.astro`, `[...slug].astro`)
- **API routes:** lowercase (`submit-config.ts`)
- **Types/Interfaces:** PascalCase (`interface ConfigResponse`)
- **Constants:** UPPER_SNAKE_CASE for true constants

### Error Handling
- Use try/catch for async operations
- Log errors to Sentry in catch blocks
- User-friendly error messages in UI
- Never expose stack traces or internal details to users

```typescript
try {
  const data = await fetchConfig(id);
  setConfig(data);
} catch (error) {
  Sentry.captureException(error);
  setError('Failed to load configuration. Please try again.');
}
```

### CSS/Tailwind
- Use custom color palette from `tailwind.config.ts`
- Dark mode is default (`darkMode: 'class'`)
- Custom colors: `dark.bg`, `dark.surface`, `brand.primary`
- No arbitrary values; extend config if needed

### Testing Conventions
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Use `@testing-library/react` for component tests
- Mock external API calls
- Test user interactions with `userEvent`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/utils/api', () => ({
  fetchConfig: vi.fn(),
}));

describe('ConfigValidator', () => {
  it('validates config on submit', async () => {
    render(<ConfigValidator />);
    await userEvent.click(screen.getByText('Validate'));
    expect(screen.getByText('Valid!')).toBeInTheDocument();
  });
});
```

## Security Rules
- NEVER commit `.env` (in `.gitignore`)
- NEVER expose tokens or secrets in client code
- Validate all user input server-side
- Apply rate limiting to mutation endpoints

## Project Structure Quick Reference
```
src/
  components/react/     # React interactive components
  components/astro/     # Astro static components
  pages/               # File-based routing
  pages/api/           # API endpoints
  content/             # Content collections (docs, blog)
  utils/               # Shared utilities
  i18n/                # Translations
```

**Last Updated:** 2026-03-21
