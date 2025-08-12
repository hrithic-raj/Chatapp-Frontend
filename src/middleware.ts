import { NextResponse, NextRequest } from 'next/server'
import { verifyRefreshToken } from './services/userService'

export async function middleware(req: NextRequest) {
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
    console.log("refreshtoken kitiyallodaa", refreshToken)
    if (!refreshToken) {
        if (pathname !== '/login') {
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }

    let user: { newUser?: boolean; username?: string } = {};

    if (pathname !== '/login') {
        
        try {
            console.log("entered into .")
            const tokenResponse = await verifyRefreshToken(refreshToken);
            user = tokenResponse.user;
            console.log("User data:", user);
        } catch (err) {
            console.log("error anallodaa", err)
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    } else {
        return NextResponse.next()
    }

    // const isNewUser = user?.newUser

    // if (pathname === '/login') {
    //     url.pathname = '/chat'
    //     return NextResponse.redirect(url)
    // }

    // if (isNewUser && pathname !== '/set-username') {
    //     url.pathname = '/set-username'
    //     return NextResponse.redirect(url)
    // }

    // if (!isNewUser && pathname === '/set-username') {
    //     url.pathname = '/chat'
    //     return NextResponse.redirect(url)
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/chat/:path*', '/profile', '/settings', '/login', '/set-username'],
}
