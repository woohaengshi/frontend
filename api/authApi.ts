'use server';

import { instance } from './instance';
import { cookies } from 'next/headers';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });

  const accessToken = response.accessToken;
  if (accessToken) {
    cookies().set('whs-access', accessToken, { httpOnly: true, secure: true });
    cookies().set('whs-user', response.name, { httpOnly: true, secure: true });
  }

  const cookie = response.cookie;

  if (cookie) {
    // 서버 사이드에서 쿠키 설정
    const refreshToken = cookie.split(';')[0].split('=')[1];
    const path = cookie.split(';')[1].split('=')[1];
    const maxAge = cookie.split(';')[2].split('=')[1];
    const expires = cookie.split(';')[3].split('=')[1];

    cookies().set('whs-refresh', refreshToken, {
      path,
      maxAge: parseInt(maxAge),
      expires: new Date(expires),
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });
  }

  return response;
};

export const reissueToken = async () => {
  const refreshToken = cookies().get('whs-refresh')?.value;
  const accessToken = cookies().get('whs-access')?.value;
  const name = cookies().get('whs-user')?.value;

  const response = await instance(
    'reissue',
    {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
      body: JSON.stringify({ name, image: '', accessToken }),
      method: 'POST',
    },
    true,
  ); // 재발급 시도 시 재귀 방지를 위해 isRetry를 true로 설정

  if (!response.error) {
    const { accessToken } = response;
    cookies().set('whs-access', accessToken, { httpOnly: true, secure: true });
    return accessToken;
  } else {
    console.error('Token reissue failed');
    return null;
  }
};

export const signUp = async ({
  name,
  email,
  password,
  course,
}: {
  name: string;
  email: string;
  password: string;
  course: string;
}) => {
  const response = await instance('sign-up', {
    body: JSON.stringify({ name, email, password, course }),
    method: 'POST',
  });
  return response;
};
