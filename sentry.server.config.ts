import * as Sentry from '@sentry/astro';

// Initialize Sentry for server-side error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production (0.1 = 10% of transactions)
  tracesSampleRate: 1.0,

  // Environment (production, development, staging)
  environment: process.env.NODE_ENV || 'production',

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',

  // Attach stack traces to all messages
  attachStacktrace: true,

  // Ignore certain errors on server
  ignoreErrors: [
    // Expected errors
    'ECONNRESET',
    'EPIPE',
    'ETIMEDOUT',
  ],

  // Filter sensitive data from events before sending to Sentry
  beforeSend(event, hint) {
    // Remove sensitive headers
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
      delete event.request.headers['x-api-key'];
    }

    // Remove sensitive query parameters
    if (event.request?.query_string) {
      const url = new URLSearchParams(event.request.query_string);
      if (url.has('token')) url.delete('token');
      if (url.has('api_key')) url.delete('api_key');
      event.request.query_string = url.toString();
    }

    return event;
  },
});
