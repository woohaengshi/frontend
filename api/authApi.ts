'use server';

import { instance } from './instance';
import { cookies } from 'next/headers';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });

  const { accessToken, name, cookie } = response;
  if (accessToken) {
    const [refreshToken, path, maxAge, expires] = cookie
      ? cookie.split(';').map((item: string) => item.split('=')[1])
      : [null, null, null, null];

    setCookies(accessToken, name, refreshToken, path, maxAge, expires);
  }

  return response;
};

export const reissueToken = async () => {
  const refreshToken = cookies().get('whs-refresh')?.value;

  const response = await instance(
    'reissue',
    {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
      method: 'POST',
    },
    true,
  ); // 재발급 시도 시 재귀 방지를 위해 isRetry를 true로 설정

  if (!response.error) {
    const { accessToken, name, cookie } = response;

    if (accessToken) {
      const [refreshToken, path, maxAge, expires] = cookie
        ? cookie.split(';').map((item: string) => item.split('=')[1])
        : [null, null, null, null];

      setCookies(accessToken, name, refreshToken, path, maxAge, expires);
    }
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

const setCookies = (
  accessToken: string,
  name: string,
  refreshToken?: string,
  path?: string,
  maxAge?: string,
  expires?: string,
) => {
  cookies().set('whs-access', accessToken, { httpOnly: true, secure: true });
  cookies().set('whs-user', name, { httpOnly: true, secure: true });

  if (refreshToken && path && maxAge && expires) {
    cookies().set('whs-refresh', refreshToken, {
      path,
      maxAge: parseInt(maxAge),
      expires: new Date(expires),
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });
  }
};
