import { NextResponse } from 'next/server';
import { signIn } from '@/api/authApi';

// eslint-disable-next-line func-style
export async function POST(request: Request) {
  // request.json()을 사용해 body 데이터를 파싱합니다.
  const { email, password } = await request.json();
  const response = await signIn({ email, password });

  const { accessToken, cookie } = response;

  if (response.error) {
    return NextResponse.error();
  }

  if (accessToken) {
    // set-cookies 하기
    const [refreshToken, path, maxAge, expires] = cookie
      ? cookie.split(';').map((item: string) => item.split('=')[1])
      : [null, null, null, null];

    // Headers 객체 생성
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `access_token=${accessToken}; Path=/; Secure; Expires=${new Date(Date.now() + 1000 * 3540).toUTCString()}`,
    );
    headers.append(
      'Set-Cookie',
      `refresh_token=${refreshToken}; Path=/; Secure; Max-Age=${maxAge}; Expires=${expires}`,
    );

    const res = new NextResponse(JSON.stringify({ accessToken }), { headers });

    return res;
  } else {
    console.error('토큰 재발급 실패', response);
  }

  return NextResponse.json({ accessToken });
}
