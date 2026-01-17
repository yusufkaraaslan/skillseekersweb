import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Check if Upstash credentials are configured
const isUpstashConfigured = !!(
  import.meta.env.UPSTASH_REDIS_REST_URL &&
  import.meta.env.UPSTASH_REDIS_REST_TOKEN
);

// Initialize Redis client (only if configured)
let redis: Redis | null = null;
if (isUpstashConfigured) {
  redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL!,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// Rate limit configurations
export const rateLimits = {
  // Config submission: 5 requests per hour per IP
  submitConfig: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1h'),
        prefix: 'ratelimit:submit',
        analytics: true,
      })
    : null,

  // Admin approve: 20 requests per hour per user
  adminApprove: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '1h'),
        prefix: 'ratelimit:admin:approve',
        analytics: true,
      })
    : null,

  // Admin reject: 20 requests per hour per user
  adminReject: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '1h'),
        prefix: 'ratelimit:admin:reject',
        analytics: true,
      })
    : null,

  // Admin submissions: 30 requests per hour per user
  adminSubmissions: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '1h'),
        prefix: 'ratelimit:admin:submissions',
        analytics: true,
      })
    : null,

  // OAuth: 10 requests per 15 minutes per IP
  oauth: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '15m'),
        prefix: 'ratelimit:oauth',
        analytics: true,
      })
    : null,
};

/**
 * Apply rate limiting to a request
 * Returns null if rate limiting is not configured (allows request)
 * Returns Response with 429 status if rate limit exceeded
 */
export async function applyRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<Response | null> {
  // If rate limiting is not configured, allow the request
  if (!limiter) {
    console.warn('Rate limiting not configured - Upstash credentials missing');
    return null;
  }

  const { success, reset } = await limiter.limit(identifier);

  if (!success) {
    const retryAfter = Math.floor((reset - Date.now()) / 1000);
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(limiter),
          'X-RateLimit-Reset': String(reset),
        },
      }
    );
  }

  return null;
}

/**
 * Get client IP address from request
 * Works with Vercel, Cloudflare, and other platforms
 */
export function getClientIP(request: Request): string {
  // Try various headers in order of preference
  const headers = request.headers;

  // Vercel
  const vercelIP = headers.get('x-real-ip');
  if (vercelIP) return vercelIP;

  // Cloudflare
  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  // Standard forwarded-for header
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in the chain
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to a default (should rarely happen)
  return 'unknown';
}
