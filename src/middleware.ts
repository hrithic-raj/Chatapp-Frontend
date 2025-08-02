import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/refreshToken';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedRoutes = ['/chat', '/profile'];
  const authRoutes = ['/login', '/set-username'];
  const accessToken = request.cookies.get('accessToken')?.value;

  // Skip middleware for API routes
  if (path.startsWith('/api')) return NextResponse.next();

  // Check if user is authenticated
  const isAuthenticated = accessToken && await verifyToken(accessToken);
  const userData = isAuthenticated ? await verifyToken(accessToken) : null;

  // Handle unauthenticated users trying to access protected routes
  if (!isAuthenticated && protectedRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle authenticated users trying to access auth routes
  if (isAuthenticated && authRoutes.includes(path)) {
    if (userData?.newUser || !userData?.username) {
      return NextResponse.redirect(new URL('/set-username', request.url));
    }
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  // Handle users without username trying to access protected routes
  if (isAuthenticated && protectedRoutes.some(route => path.startsWith(route))) {
    if (userData?.newUser || !userData?.username) {
      return NextResponse.redirect(new URL('/set-username', request.url));
    }
  }

  return NextResponse.next();
}
