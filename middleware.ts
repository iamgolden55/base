// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Get your JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// A simple regular expression to allow public assets (like images, css, etc.)
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass middleware for public routes and static files.
  if (
    pathname.startsWith('/auth') || // login, register and other auth pages
    pathname.startsWith('/api/public') || // any public API endpoints you might have
    pathname.startsWith('/_next') || // Next.js internals
    pathname.match(PUBLIC_FILE) // static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // 2. Check for the authentication token in cookies.
  const token = request.cookies.get('accessToken')?.value;
  if (!token) {
    // No token found, redirect to login.
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Optionally verify the token (assuming it's a JWT).
  try {
    // This will throw an error if the token is invalid or expired.
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Invalid token, redirect to login.
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If everything checks out, continue with the request.
  return NextResponse.next();
}

// Specify which routes the middleware applies to.
export const config = {
  matcher: [
    // Adjust these paths to match your protected routes.
    //'/role/:path*',
    //'/protected/:path*',
   // '/dashboard/:path*',
  ],
};