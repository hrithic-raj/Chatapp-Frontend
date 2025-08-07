// import { NextResponse, type NextRequest } from 'next/server';
// // import { verifyToken } from '@/lib/refreshToken';
// import apiClient from '@/lib/axios.config';

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const authRoutes = ['/login', '/set-username'];
//   const protectedRoutes = ['/chat', '/chat/:path*'];
  
//   // Skip API routes
//   // if (path.startsWith('/api')) return NextResponse.next();

//   // Get token from cookies
//   const accessToken = request.cookies.get('accessToken')?.value;
//   console.log("got accessToken in middleware", accessToken);
//   // Verify authentication status with backend
//   let userData = null;
//   if (accessToken) {
//     try {
//       // Use existing axios client for token verification
//       const response = await apiClient.post('/auth/verify-token', {}, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });

//       console.log(response)
//       userData = response.data.user;
//       console.log("userData from middleware", userData)
//     } catch (error) {
//       console.error('Token verification failed:', error);
//     }
//   }
//   const isAuthenticated = !!userData;
//   console.log("isAuthenticated ", isAuthenticated);
//   const hasUsername = userData?.username && !userData?.newUser;
//   console.log("hasUsername ", hasUsername);

//   // 1. Handle unauthenticated users
//   if (!isAuthenticated) {
//     if (protectedRoutes.some(route => path.match(new RegExp(route.replace('*', '.*'))))) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//     return NextResponse.next();
//   }

//   // 2. Handle authenticated users
//   // Redirect from auth routes
//   if (authRoutes.includes(path)) {
//     const redirectPath = hasUsername ? '/chat' : '/set-username';
//     return NextResponse.redirect(new URL(redirectPath, request.url));
//   }

//   // Redirect from root path
//   if (path === '/') {
//     const redirectPath = hasUsername ? '/chat' : '/set-username';
//     return NextResponse.redirect(new URL(redirectPath, request.url));
//   }

//   // Protect routes requiring username
//   if (protectedRoutes.some(route => path.match(new RegExp(route.replace('*', '.*'))))) {
//     if (!hasUsername) {
//       return NextResponse.redirect(new URL('/set-username', request.url));
//     }
//   }

//   return NextResponse.next();
// }



import { NextResponse, NextRequest } from 'next/server'
import type { NextFetchEvent } from 'next/server'
import { verifyRefreshToken } from './services/userService'

export async function middleware(req: NextRequest, _ev: NextFetchEvent) {
    const url = req.nextUrl.clone()
    const pathname = url.pathname

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico')
    ) {
        return NextResponse.next()
    }

    const refreshToken = req.cookies.get('refreshToken')?.value

    if (!refreshToken) {
        if (pathname !== '/login') {
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }

    let decoded: any
    let user: any

    // ✅ Only verify token if not already on /login
    if (pathname !== '/login') {
        try {
            decoded = await verifyRefreshToken(refreshToken)
            user = decoded.user
        } catch (err) {
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    } else {
        // Skip verifying token if already on /login
        return NextResponse.next()
    }

    const isNewUser = user?.newUser

    if (pathname === '/login') {
        url.pathname = '/chat'
        return NextResponse.redirect(url)
    }

    if (isNewUser && pathname !== '/set-username') {
        url.pathname = '/set-username'
        return NextResponse.redirect(url)
    }

    if (!isNewUser && pathname === '/set-username') {
        url.pathname = '/chat'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/chat/:path*', '/profile', '/settings', '/login', '/set-username'],
}
