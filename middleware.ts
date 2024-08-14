import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('middleware 접속');

  // 로그인 토큰을 확인
  const token = request.cookies.get('whs-token')?.value;

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    console.log('No authToken found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 헤더에 토큰을 추가하여 다음 미들웨어나 API로 전달
  const modifiedRequest = new Request(request.url, {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.next({
    request: modifiedRequest,
  });
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/', '/ranking', '/record', '/study', '/mypage'],
};
