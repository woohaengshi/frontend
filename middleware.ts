'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './auth';
import { signOut as signOutFromAuth } from 'next-auth/react';
import { reissueToken, signOut as signOutFromBackend } from '@/api/authApi';
import { API_ROUTE_URL } from './constants/url';
import { encode } from 'next-auth/jwt';
import { ACCESS_TOKEN_EXPIRES } from './constants/token';
import { cookies } from 'next/headers';

export default async function middleware(request: NextRequest, response: NextResponse) {
  console.log('middleware 접속');

  const session = await auth();

  // 로그인 토큰을 확인
  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;

  console.log('current refreshToken from middleware', refreshToken);

  // const sessionCookie = API_ROUTE_URL!.startsWith('https://')
  //   ? '__Secure-authjs.session-token'
  //   : 'authjs.session-token';

  // console.log('sessionCookie', sessionCookie);

  // if (Date.now() >= session?.user?.expires_at!) {
  //   const newToken = await reissueToken(session?.user?.refreshToken!); // You'll need to implement your custom token refresh logic
  //   const newSessionToken = await encode({
  //     secret: process.env.AUTH_SECRET!,
  //     token: {
  //       ...session,
  //       ...newToken,
  //       expires_at: Date.now() + ACCESS_TOKEN_EXPIRES,
  //     },
  //     maxAge: 30 * 24 * 60 * 60, // 30 days
  //     salt: process.env.AUTH_SALT!,
  //   });
  //   const response = NextResponse.next();
  //   response.cookies.set(sessionCookie, newSessionToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production' || API_ROUTE_URL!.startsWith('https://'),
  //     sameSite: 'lax',
  //     maxAge: 30 * 24 * 60 * 60, // 30 days
  //     path: '/',
  //   });

  //   console.log('토큰 갱신 완료');
  //   return response;
  // }

  if (session?.error === 'RefreshAccessTokenError') {
    signOutFromAuth(); // 토큰 갱신 오류 시 로그아웃
    signOutFromBackend; // 백엔드 로그아웃
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken && !refreshToken) {
    console.log('No authToken found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/', '/ranking', '/record', '/study', '/mypage'],
};
