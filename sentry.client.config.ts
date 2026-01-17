import * as Sentry from '@sentry/astro';

// Initialize Sentry for client-side error tracking
Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production (0.1 = 10% of transactions)
  tracesSampleRate: 1.0,

  // Environment (production, development, staging)
  environment: import.meta.env.MODE,

  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Ignore certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'fb_xd_fragment',
    // Random plugins/extensions
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    // Network errors that are expected
    'NetworkError',
    'Failed to fetch',
  ],

  // Filter out certain URLs from breadcrumbs
  beforeBreadcrumb(breadcrumb) {
    // Don't capture breadcrumbs from analytics scripts
    if (breadcrumb.category === 'xhr' && breadcrumb.data?.url?.includes('analytics')) {
      return null;
    }
    return breadcrumb;
  },
});
