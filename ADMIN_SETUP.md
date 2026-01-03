# Admin Dashboard Setup Guide

This guide explains how to set up the admin dashboard for reviewing and approving config submissions.

## Overview

The admin dashboard provides a web UI for:
- Viewing pending config submissions (from GitHub Issues)
- Approving configs (automatically commits to `Skill_Seekers/configs/` directory)
- Rejecting configs (closes issue with feedback)
- One-click workflow for managing submissions

## Prerequisites

- GitHub account with admin access to the Skill_Seekers repository
- Vercel account (for deployment)

## Step 1: Create GitHub OAuth App

The admin dashboard uses GitHub OAuth for authentication.

1. **Go to GitHub Developer Settings:**
   - Visit: https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Configure the OAuth App:**
   ```
   Application name: Skill Seekers Admin
   Homepage URL: https://skillseekersweb.com
   Authorization callback URL: https://skillseekersweb.com/api/auth/callback
   ```

3. **Save the credentials:**
   - After creating the app, note down:
     - **Client ID** (visible immediately)
     - **Client Secret** (click "Generate a new client secret")

   ⚠️ **IMPORTANT:** Keep the Client Secret safe - you'll need it for environment variables

## Step 2: Create GitHub Personal Access Token

The dashboard needs a GitHub Personal Access Token (PAT) to perform git operations (commit configs, close issues).

1. **Go to GitHub Token Settings:**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure the token:**
   ```
   Note: Skill Seekers Admin Dashboard
   Expiration: No expiration (or set your preferred expiration)

   Scopes:
   ✓ repo (Full control of private repositories)
     ✓ repo:status
     ✓ repo_deployment
     ✓ public_repo
     ✓ repo:invite
     ✓ security_events
   ```

3. **Generate and save the token:**
   - Click "Generate token"
   - **Copy the token immediately** - you won't be able to see it again
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

   ⚠️ **IMPORTANT:** This token has write access to your repositories. Keep it secret!

## Step 3: Configure Environment Variables

### Local Development

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your credentials:**
   ```env
   # Site Configuration
   SITE=http://localhost:4321

   # GitHub OAuth (from Step 1)
   GITHUB_OAUTH_CLIENT_ID=your_client_id_here
   GITHUB_OAUTH_CLIENT_SECRET=your_client_secret_here

   # GitHub PAT (from Step 2)
   GITHUB_TOKEN=ghp_your_token_here

   # Admin Whitelist
   ADMIN_GITHUB_USERNAMES=yusufkaraaslan
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```
   - Visit: http://localhost:4321/admin
   - Click "Sign in with GitHub"
   - Authorize the app
   - You should see the admin dashboard

### Production Deployment (Vercel)

1. **Go to Vercel Dashboard:**
   - Open your project: https://vercel.com/yusufkaraaslan/skillseekersweb
   - Go to Settings → Environment Variables

2. **Add each environment variable:**
   ```
   Name: SITE
   Value: https://skillseekersweb.com

   Name: GITHUB_OAUTH_CLIENT_ID
   Value: [your client ID from Step 1]

   Name: GITHUB_OAUTH_CLIENT_SECRET
   Value: [your client secret from Step 1]

   Name: GITHUB_TOKEN
   Value: [your PAT from Step 2]

   Name: ADMIN_GITHUB_USERNAMES
   Value: yusufkaraaslan
   ```

3. **Redeploy:**
   - After adding environment variables, trigger a new deployment
   - Vercel will rebuild with the new environment variables

## Step 4: Add Admin Users

To grant admin access to additional users:

1. **Update environment variable:**
   ```env
   ADMIN_GITHUB_USERNAMES=yusufkaraaslan,another_user,third_user
   ```

2. **Redeploy** (for production on Vercel)

Users not in this whitelist will see an error when trying to log in.

## Security Considerations

### ✅ DO:
- Keep `.env` file secret (it's in `.gitignore`)
- Use strong GitHub PAT with minimal required scopes
- Rotate OAuth secrets periodically
- Limit admin whitelist to trusted users only
- Use HTTPS in production (Vercel does this automatically)

### ❌ DON'T:
- **NEVER** commit `.env` to git
- **NEVER** share your GitHub token publicly
- **NEVER** add untrusted users to admin whitelist
- **NEVER** use the same token for multiple purposes

## How the Admin Workflow Works

### 1. User Submits Config
- User validates config on /configs page
- Clicks "Copy & Submit to GitHub"
- Creates GitHub Issue with labels: `config-submission`, `needs-review`

### 2. Admin Reviews Submission
- Admin visits https://skillseekersweb.com/admin
- Signs in with GitHub OAuth
- Sees list of pending submissions
- Reviews config details

### 3. Admin Approves Config
- Clicks "✓ Approve & Commit"
- Backend:
  1. Validates config structure
  2. Creates commit to `Skill_Seekers/configs/[name].json`
  3. Adds "approved" label to issue
  4. Closes issue with success comment
  5. Links to commit in comment
- Frontend: Shows success message with commit URL

### 4. Admin Rejects Config
- Clicks "✗ Reject"
- Enters rejection reason (optional)
- Backend:
  1. Adds "rejected" label to issue
  2. Posts comment with reason
  3. Closes issue
- Frontend: Shows confirmation

### 5. API Auto-Updates
- The api.skillseekersweb.com backend scans `Skill_Seekers/configs/` directory
- New configs are automatically available via API
- Website /configs page shows them immediately

## API Endpoints

The admin dashboard uses these endpoints:

- `GET /api/auth/github` - Initiate GitHub OAuth
- `GET /api/auth/callback` - Handle OAuth callback
- `GET /api/auth/logout` - Clear session
- `GET /api/admin/submissions` - List pending submissions
- `POST /api/admin/approve` - Approve config
- `POST /api/admin/reject` - Reject config

All admin endpoints check:
1. Valid session cookie (`gh_admin_session`)
2. User is in admin whitelist

## Troubleshooting

### "Unauthorized" error
- **Cause:** No session cookie or expired session
- **Fix:** Sign in again via GitHub OAuth

### "Forbidden: Not an admin" error
- **Cause:** Your GitHub username is not in `ADMIN_GITHUB_USERNAMES`
- **Fix:** Add your username to the whitelist environment variable

### "Failed to fetch submissions" error
- **Cause:** Invalid `GITHUB_TOKEN` or insufficient permissions
- **Fix:**
  1. Check token is valid: https://github.com/settings/tokens
  2. Ensure token has `repo` scope
  3. Update environment variable

### OAuth redirect not working
- **Cause:** Incorrect callback URL in GitHub OAuth app
- **Fix:**
  1. Check GitHub OAuth app settings
  2. Ensure callback URL matches: `https://skillseekersweb.com/api/auth/callback`
  3. For local dev: Update to `http://localhost:4321/api/auth/callback`

### "Failed to commit config" error
- **Cause:** GitHub API error or permission issue
- **Fix:**
  1. Check `GITHUB_TOKEN` has write access to repo
  2. Verify repo name is correct in code
  3. Check API rate limits

## Maintenance

### Rotate GitHub PAT
1. Generate new token with same scopes
2. Update environment variable
3. Delete old token

### Rotate OAuth Secrets
1. Generate new client secret in GitHub OAuth app
2. Update environment variable
3. Delete old secret (optional)

### Monitor Submissions
- Check admin dashboard regularly
- Enable GitHub notifications for `config-submission` label
- Set up email alerts (optional)

## Advanced: Custom Deployment

If deploying to platforms other than Vercel:

1. **Ensure environment variables are set:**
   - All variables from `.env.example`
   - `SITE` should match your deployment URL

2. **Build command:**
   ```bash
   npm run build
   ```

3. **Serve `dist/` directory:**
   - Astro outputs static files to `dist/`
   - But admin routes are server-side rendered
   - Need SSR adapter for non-Vercel platforms

4. **For SSR on other platforms:**
   - Add Astro adapter: https://docs.astro.build/en/guides/server-side-rendering/
   - Example: `@astrojs/node`, `@astrojs/netlify`, etc.

## Need Help?

- **GitHub Issues:** https://github.com/yusufkaraaslan/Skill_Seekers/issues
- **Astro Docs:** https://docs.astro.build
- **GitHub OAuth Docs:** https://docs.github.com/en/developers/apps/building-oauth-apps

---

**Last Updated:** 2026-01-03
**Author:** Claude Sonnet 4.5
