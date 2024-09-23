'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './auth';
import { signOut as signOutFromAuth } from 'next-auth/react';
import { signOut as signOutFromBackend } from '@/apis/authApi';

export default async function middleware(request: NextRequest, response: NextResponse) {
  console.log('middleware 접속');

  const session = await auth();

  // 로그인 토큰을 확인
  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;

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
