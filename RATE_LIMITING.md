# Rate Limiting Setup Guide

This guide explains how to set up and configure rate limiting for the Skill Seekers website API endpoints.

## Overview

Rate limiting protects the API endpoints from abuse and prevents exhausting GitHub API quota. The implementation uses **Upstash Redis** for distributed rate limiting that works with Vercel's serverless architecture.

## Why Rate Limiting?

- **Prevents spam:** Blocks automated bots from submitting hundreds of configs
- **Protects GitHub API quota:** Limits admin operations that call GitHub API
- **Prevents DoS attacks:** Stops malicious users from overwhelming the server
- **Fair usage:** Ensures all users get equal access to the API

## Rate Limits Configuration

| Endpoint | Limit | Window | Identifier |
|----------|-------|--------|------------|
| `POST /api/submit-config` | 5 requests | 1 hour | IP Address |
| `POST /api/admin/approve` | 20 requests | 1 hour | Username |
| `POST /api/admin/reject` | 20 requests | 1 hour | Username |
| `GET /api/admin/submissions` | 30 requests | 1 hour | Username |
| `GET /api/auth/github` | 10 requests | 15 minutes | IP Address |

## Setup Instructions

### 1. Create Upstash Account

1. Go to https://upstash.com/
2. Sign up for a free account
3. Free tier includes:
   - 10,000 commands per day
   - Up to 256MB storage
   - No credit card required

### 2. Create Redis Database

1. Click "Create Database" in Upstash dashboard
2. Select region closest to your Vercel deployment
3. Choose "Global" for multi-region replication (optional)
4. Click "Create"

### 3. Get API Credentials

1. Open your Redis database in Upstash
2. Go to "REST API" tab
3. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 4. Configure Environment Variables

#### Local Development

Add to `.env`:
```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
```

#### Vercel Production

1. Go to Vercel dashboard: https://vercel.com/yusufkaraaslan/skillseekersweb
2. Navigate to Settings → Environment Variables
3. Add:
   - `UPSTASH_REDIS_REST_URL` = (your URL)
   - `UPSTASH_REDIS_REST_TOKEN` = (your token)
4. Click "Save"
5. Redeploy the site

## How It Works

### Rate Limiting Flow

```
1. Request arrives → Extract identifier (IP or username)
2. Check Upstash Redis for rate limit status
3. If under limit → Allow request, increment counter
4. If over limit → Return 429 Too Many Requests with Retry-After header
```

### Graceful Degradation

If Upstash is not configured:
- ⚠️ **Warning logged** to console
- ✅ **Request allowed** to proceed
- ⚠️ **No rate limiting** applied

This prevents the site from breaking if Upstash credentials are missing.

### Response Headers

When rate limited, the response includes:
```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 3421
X-RateLimit-Limit: ...
X-RateLimit-Reset: 1737120000

{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 3421
}
```

## Implementation Details

### Rate Limiting Utility

Located at `src/utils/ratelimit.ts`:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const rateLimits = {
  submitConfig: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1h'),
    prefix: 'ratelimit:submit',
    analytics: true,
  }),
  // ... other limiters
};
```

### Applying Rate Limits

Example from `src/pages/api/submit-config.ts`:

```typescript
import { rateLimits, applyRateLimit, getClientIP } from '../../utils/ratelimit';

export const POST: APIRoute = async ({ request }) => {
  // Apply rate limiting
  const clientIP = getClientIP(request);
  const rateLimitResponse = await applyRateLimit(rateLimits.submitConfig, clientIP);
  if (rateLimitResponse) {
    return rateLimitResponse; // Returns 429 if rate limited
  }

  // ... rest of handler
};
```

### IP Address Detection

The `getClientIP()` function detects the client IP from various headers:

1. `x-real-ip` (Vercel)
2. `cf-connecting-ip` (Cloudflare)
3. `x-forwarded-for` (Standard)
4. Fallback to `'unknown'`

## Monitoring

### Upstash Dashboard

View rate limiting analytics in Upstash:
1. Go to your database dashboard
2. Check "Analytics" tab
3. See request counts, hit rates, and usage patterns

### Vercel Logs

Check Vercel function logs for rate limiting warnings:
```
Warning: Rate limiting not configured - Upstash credentials missing
```

## Testing Rate Limiting

### Test Locally

```bash
# Set up .env with Upstash credentials
# Start dev server
npm run dev

# Test rate limit (submit 6 configs within an hour)
for i in {1..6}; do
  curl -X POST http://localhost:4321/api/submit-config \
    -H "Content-Type: application/json" \
    -d '{"config": {...}}'
done

# 6th request should return 429
```

### Test in Production

1. Deploy to Vercel with Upstash configured
2. Use browser DevTools or curl to make multiple requests
3. Verify 429 response after exceeding limits

## Adjusting Rate Limits

To change rate limits, edit `src/utils/ratelimit.ts`:

```typescript
submitConfig: new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1h'), // Change from 5 to 10
  // ...
})
```

Then redeploy the site.

## Cost & Scaling

### Upstash Free Tier

- **10,000 commands/day** = ~416 commands/hour
- **Example:** If each config submission = 2 commands (check + increment):
  - Can handle ~5,000 submissions/day on free tier
  - Well above expected traffic for this site

### Paid Tier (if needed)

- **Pay-as-you-go** pricing: $0.20 per 100K commands
- **Pro tier:** $120/month for 500M commands

For this site, **free tier is sufficient** unless you get massive viral traffic.

## Troubleshooting

### Rate limiting not working

**Check:**
1. ✅ Upstash credentials set in environment variables
2. ✅ Vercel deployment restarted after adding credentials
3. ✅ Check Vercel function logs for errors

### "Upstash credentials missing" warning

**Solution:**
- Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to environment variables
- Redeploy the site

### 429 errors for legitimate users

**Solution:**
- Increase rate limits in `src/utils/ratelimit.ts`
- Consider different limits for authenticated vs anonymous users

## Security Considerations

✅ **DO:**
- Keep Upstash tokens secret (never commit to git)
- Use environment variables for credentials
- Monitor rate limit analytics for abuse patterns
- Adjust limits based on actual usage

❌ **DON'T:**
- Hardcode Upstash credentials in source code
- Share Upstash tokens publicly
- Set limits too low (frustrates legitimate users)
- Set limits too high (defeats the purpose)

## Additional Resources

- **Upstash Docs:** https://upstash.com/docs/redis
- **Rate Limiting SDK:** https://upstash.com/docs/redis/sdks/ratelimit-ts
- **Vercel Environment Variables:** https://vercel.com/docs/projects/environment-variables

---

**Last Updated:** 2026-01-17
**Status:** ✅ Implemented and tested
