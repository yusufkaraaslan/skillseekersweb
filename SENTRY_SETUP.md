# Sentry Error Monitoring Setup Guide

This guide explains how to set up Sentry for error monitoring and performance tracking on the Skill Seekers website.

## Overview

Sentry is configured for both client-side (React) and server-side (Astro SSR/API routes) error tracking.

**What's already configured:**
- ✅ `@sentry/astro` package installed
- ✅ Error boundaries on critical React components
- ✅ Client and server Sentry configuration files
- ✅ Source map upload integration
- ✅ Environment variables template

**What you need to do:**
- Create Sentry account and project
- Add Sentry credentials to environment variables
- Deploy and verify

---

## Step 1: Create Sentry Account (5 minutes)

### 1.1 Sign Up

1. Go to **https://sentry.io/signup**
2. Sign up with GitHub (recommended) or email
3. Choose the **Free Developer** plan
   - 5,000 errors per month
   - 1 project
   - 7-day retention
   - Performance monitoring included

### 1.2 Create Project

1. Click **"Create Project"**
2. Select **Platform:** "Astro"
3. **Alert frequency:** "Alert me on every new issue"
4. **Project name:** `skillseekersweb` (or your choice)
5. Click **"Create Project"**

### 1.3 Get Your DSN

After creating the project, you'll see your **DSN** (Data Source Name).

**It looks like:**
```
https://abc123def456@o1234567.ingest.sentry.io/7654321
```

**Copy this DSN** - you'll need it in Step 2.

---

## Step 2: Configure Environment Variables

### 2.1 Local Development (.env)

Add to `.env` file (create if it doesn't exist):

```env
# Sentry Error Monitoring
SENTRY_DSN=https://your-actual-dsn-here@o1234567.ingest.sentry.io/7654321
PUBLIC_SENTRY_DSN=https://your-actual-dsn-here@o1234567.ingest.sentry.io/7654321
SENTRY_AUTH_TOKEN=your-auth-token-here
SENTRY_PROJECT=skillseekersweb
```

**Note:** Use the **same DSN** for both `SENTRY_DSN` and `PUBLIC_SENTRY_DSN`.

### 2.2 Create Auth Token (for source maps)

Source maps allow you to see your actual code in stack traces (not minified).

1. Go to **https://sentry.io/settings/account/api/auth-tokens/**
2. Click **"Create New Token"**
3. **Name:** "Skill Seekers Web - Source Maps"
4. **Scopes:** Select:
   - `project:read`
   - `project:write`
   - `project:releases`
   - `org:read`
5. Click **"Create Token"**
6. **Copy the token** and add to `.env` as `SENTRY_AUTH_TOKEN`

**⚠️ Important:** Save this token securely. You won't be able to see it again!

### 2.3 Production (Vercel)

Add environment variables to Vercel:

1. Go to **https://vercel.com/yusufkaraaslan/skillseekersweb**
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `SENTRY_DSN` | Your DSN | Production, Preview, Development |
| `PUBLIC_SENTRY_DSN` | Your DSN | Production, Preview, Development |
| `SENTRY_AUTH_TOKEN` | Your auth token | Production, Preview, Development |
| `SENTRY_PROJECT` | `skillseekersweb` | Production, Preview, Development |

4. Click **"Save"**
5. **Redeploy** your site for changes to take effect

---

## Step 3: Test Error Tracking (5 minutes)

### 3.1 Test Locally

```bash
# Start dev server
npm run dev
```

### 3.2 Trigger a Test Error

Add this to any page temporarily:

```typescript
// Trigger a test error
if (typeof window !== 'undefined') {
  setTimeout(() => {
    throw new Error('Test error from Skill Seekers - DELETE ME');
  }, 2000);
}
```

### 3.3 Check Sentry Dashboard

1. Go to **https://sentry.io/organizations/your-org/issues/**
2. You should see the test error appear within ~10 seconds
3. Click on the error to see:
   - Stack trace with source maps
   - Breadcrumbs (user actions before error)
   - User context (browser, OS, etc.)
   - Performance data

**If you see the error in Sentry: ✅ It's working!**

### 3.4 Remove Test Error

Don't forget to remove the test error code before deploying!

---

## Step 4: Verify Production Deployment

### 4.1 Deploy to Production

```bash
# Commit changes
git add .
git commit -m "feat: Add Sentry error monitoring"
git push origin master
```

Vercel will automatically deploy.

### 4.2 Check Build Logs

In Vercel deployment logs, you should see:

```
[sentry-vite-plugin] Info: Successfully uploaded source maps to Sentry
```

If you see warnings about missing auth token, double-check Step 2.3.

### 4.3 Test in Production

1. Visit **https://skillseekersweb.com**
2. Try triggering an error (e.g., submit invalid config)
3. Check Sentry dashboard for the error

---

## What's Being Monitored

### ✅ Client-Side (React)
- **AdminDashboard** - Wrapped in ErrorBoundary
- **ConfigValidator** - Wrapped in ErrorBoundary
- **ConfigGallery** - Wrapped in ErrorBoundary
- **All unhandled React errors**
- **JavaScript errors in browser**
- **Performance metrics** (LCP, FID, CLS)

### ✅ Server-Side (Astro SSR/API)
- **API endpoint errors** (/api/admin/*, /api/auth/*, /api/submit-config)
- **Server rendering errors**
- **GitHub API failures**
- **Rate limiting errors**
- **Authentication failures**

### 🔒 Privacy & Security

**What Sentry captures:**
- ✅ Error messages and stack traces
- ✅ User browser/OS info
- ✅ Page URLs
- ✅ User actions (breadcrumbs)

**What Sentry does NOT capture:**
- ❌ Passwords
- ❌ API keys/tokens
- ❌ Authorization headers
- ❌ Sensitive form data

Sensitive data is filtered in `sentry.server.config.ts` before sending to Sentry.

---

## Sentry Dashboard Features

### Issues Tab

View all errors grouped by type:
- **New issues** - Recently appeared
- **Unresolved** - Open errors
- **Resolved** - Fixed errors
- **Ignored** - Errors you've chosen to ignore

### Performance Tab

Monitor app performance:
- **Transaction traces** - API endpoint performance
- **Web Vitals** - LCP, FID, CLS scores
- **Slow pages** - Pages taking >1 second to load

### Releases Tab

Track errors by deployment:
- See which commit introduced an error
- Compare error rates between releases
- Identify regressions

### Alerts

Set up notifications:
- **Email alerts** - Get notified of new errors
- **Slack integration** - Send errors to Slack channel
- **Threshold alerts** - Alert if error count > X in Y minutes

---

## Common Errors You'll See

### 1. GitHub API Rate Limit Exceeded

**Error:** `Error: GitHub API rate limit exceeded`

**Where:** `/api/admin/approve`, `/api/admin/submissions`

**Fix:**
- Wait for rate limit to reset
- Use authenticated requests (already done)
- Implement caching for GitHub API calls

### 2. Config Validation Errors

**Error:** `ValidationError: Missing required field: name`

**Where:** ConfigValidator component

**Fix:**
- These are expected user errors
- You can ignore or filter them out in Sentry

### 3. Authentication Failures

**Error:** `Unauthorized: Not an admin user`

**Where:** `/api/auth/callback`

**Fix:**
- User is not in `ADMIN_GITHUB_USERNAMES` list
- Expected behavior, can be ignored

---

## Adjusting Sentry Settings

### Reduce Performance Monitoring (Save Quota)

In `sentry.client.config.ts` and `sentry.server.config.ts`:

```typescript
// Change from 1.0 (100%) to 0.1 (10%)
tracesSampleRate: 0.1,
```

### Ignore Specific Errors

In `sentry.client.config.ts`:

```typescript
ignoreErrors: [
  'NetworkError',
  'Failed to fetch',
  'ValidationError', // Add this to ignore validation errors
],
```

### Filter by Environment

```typescript
// Only track errors in production
if (import.meta.env.PROD) {
  Sentry.init({ /* config */ });
}
```

---

## Troubleshooting

### Issue: No errors appearing in Sentry

**Check:**
1. ✅ `SENTRY_DSN` and `PUBLIC_SENTRY_DSN` are set correctly
2. ✅ DSN is valid (copy-paste from Sentry dashboard)
3. ✅ Site is deployed (Sentry won't work on localhost without DSN)
4. ✅ Check browser console for Sentry initialization errors

### Issue: Source maps not working (seeing minified code)

**Check:**
1. ✅ `SENTRY_AUTH_TOKEN` is set
2. ✅ Token has correct scopes (`project:releases`, etc.)
3. ✅ Check Vercel build logs for source map upload success
4. ✅ Verify token is added to both local `.env` and Vercel

### Issue: Too many errors (quota exceeded)

**Solution:**
- Ignore known errors (validation errors, network errors)
- Reduce `tracesSampleRate` to 0.1 (10%)
- Upgrade to paid plan ($29/mo for 50K errors)

### Issue: Build warnings about auth token

**Warning:**
```
[sentry-vite-plugin] Warning: No auth token provided
```

**This is OK if:**
- Source maps are optional for you
- You don't need to see exact code lines in errors

**To fix:**
- Add `SENTRY_AUTH_TOKEN` to environment variables

---

## Cost & Scaling

### Free Tier (Current)
- **5,000 errors/month** (~160 errors/day)
- **1 project**
- **7-day retention**
- **Performance monitoring included**

**Expected usage:** 1,000-2,000 errors/month (well within free tier)

### If You Outgrow Free Tier

**Team Plan: $29/month**
- 50,000 errors/month
- Unlimited projects
- 90-day retention
- Priority support

**Very unlikely to need this unless site has major traffic spike.**

---

## File Structure

```
skillseekersweb/
├── astro.config.mjs                # Sentry integration
├── sentry.client.config.ts         # Client-side Sentry config
├── sentry.server.config.ts         # Server-side Sentry config
├── .env.example                    # Environment variable template
├── src/
│   └── components/
│       └── react/
│           └── ErrorBoundary.tsx   # React error boundary
└── src/pages/
    ├── admin.astro                 # AdminDashboard wrapped
    └── configs.astro               # ConfigValidator/Gallery wrapped
```

---

## GitHub Integration (Optional)

Link errors to GitHub commits:

1. Go to **Sentry → Settings → Integrations**
2. Click **"GitHub"**
3. Authorize Sentry
4. Select `yusufkaraaslan/skillseekersweb` repository
5. Now you'll see which commit introduced each error!

---

## Slack Integration (Optional)

Get error notifications in Slack:

1. Go to **Sentry → Settings → Integrations**
2. Click **"Slack"**
3. Authorize Slack
4. Choose channel (e.g., `#errors` or `#dev`)
5. Configure alert rules:
   - Alert on new issues
   - Alert on regression (error reappears after being fixed)

---

## Success Metrics

After 2 weeks, you should have:
- ✅ Zero unhandled production errors
- ✅ All critical errors fixed
- ✅ Error rate < 1% of total requests
- ✅ Stack traces with source maps working
- ✅ GitHub commits linked to errors

---

## Support & Documentation

- **Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/astro/
- **Dashboard:** https://sentry.io/organizations/your-org/issues/
- **Support:** https://sentry.io/support/

---

**Last Updated:** 2026-01-17
**Status:** ✅ Fully implemented, waiting for Sentry account setup
