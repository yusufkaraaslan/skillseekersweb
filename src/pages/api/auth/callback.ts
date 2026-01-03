import type { APIRoute } from 'astro';

// Handle GitHub OAuth callback
export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  // Verify state (CSRF protection)
  const storedState = request.headers.get('cookie')?.match(/oauth_state=([^;]+)/)?.[1];

  if (!code || !state || state !== storedState) {
    return redirect('/admin?error=invalid_state');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: import.meta.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: import.meta.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SkillSeekersWeb-Admin',
      },
    });

    const userData = await userResponse.json();

    // Check if user is in admin whitelist
    const adminWhitelist = import.meta.env.ADMIN_GITHUB_USERNAMES?.split(',') || [];

    if (!adminWhitelist.includes(userData.login)) {
      return redirect('/admin?error=not_authorized');
    }

    // Create session data (simple base64 encoding - in production use signed JWT)
    const sessionData = {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      timestamp: Date.now(),
    };

    const sessionCookie = btoa(JSON.stringify(sessionData));

    // Set session cookie and redirect to admin dashboard
    const headers = new Headers();
    headers.append('Location', '/admin');
    headers.append('Set-Cookie', `gh_admin_session=${sessionCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
    headers.append('Set-Cookie', 'oauth_state=; Path=/; Max-Age=0');

    return new Response(null, {
      status: 302,
      headers,
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return redirect('/admin?error=auth_failed');
  }
};
