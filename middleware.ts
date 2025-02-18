import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Log session information for debugging
    console.log('Session:', session);

    // Auth page is accessible only if there's no session
    if (session && req.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Protected routes require a session
    if (!session && req.nextUrl.pathname !== '/auth') {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    // Optionally handle errors, e.g., redirect to an error page
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
};