import type { APIRoute } from 'astro';

// Logout endpoint - clears session cookie
export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin',
      'Set-Cookie': 'gh_admin_session=; Path=/; Max-Age=0',
    },
  });
};
