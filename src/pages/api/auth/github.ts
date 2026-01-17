import type { APIRoute } from 'astro';
import { rateLimits, applyRateLimit, getClientIP } from '../../../utils/ratelimit';

// Initiate GitHub OAuth flow
export const GET: APIRoute = async ({ request, redirect }) => {
  // Apply rate limiting (10 requests per 15 minutes per IP)
  const clientIP = getClientIP(request);
  const rateLimitResponse = await applyRateLimit(rateLimits.oauth, clientIP);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }
  const clientId = import.meta.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new Response('GitHub OAuth not configured', { status: 500 });
  }

  // Generate random state for CSRF protection
  const state = Math.random().toString(36).substring(7);

  // Redirect to GitHub OAuth authorize URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', `${import.meta.env.SITE}/api/auth/callback`);
  githubAuthUrl.searchParams.set('scope', 'read:user');
  githubAuthUrl.searchParams.set('state', state);

  // Store state in cookie for verification in callback
  return new Response(null, {
    status: 302,
    headers: {
      Location: githubAuthUrl.toString(),
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
    },
  });
};
