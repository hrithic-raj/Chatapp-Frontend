// import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { refreshToken } = await req.json();

//   if (!refreshToken) {
//     return NextResponse.json(
//       { error: 'Refresh token missing' },
//       { status: 400 }
//     );
//   }
// console.log('Setting refresh token cookie');
//   const res = NextResponse.json({ success: true });

//   res.cookies.set({
//     name: 'refreshToken',
//     value: refreshToken,
//     httpOnly: true,
//     secure: true,
//     sameSite: 'none',
//     path: '/',
//     maxAge: 60 * 60 * 24 * 7,
//   });

//   return res;
// }
