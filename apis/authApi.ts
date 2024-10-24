'use server';

import { BASE_URL } from '@/constants/url';
import { instance } from './instance';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });

  if (response.error) {
    console.error('SignIn error:', response.error);
    throw new Error('Failed to SignIn');
  }

  const { accessToken, cookie } = response;
  const refreshToken = cookie.split(';')[0].split('=')[1];

  return { accessToken, refreshToken };
};

export const reissueToken = async (refresh_token: string) => {
  const response = await fetch(`${BASE_URL}reissue`, {
    headers: {
      Cookie: `refresh_token=${refresh_token}`,
    },
    method: 'POST',
  });

  if (!response.ok) {
    console.error('Token Expired');
    console.error('Fetch Error:', await response.json());
    console.error(response.status);
    return { error: 'Token Expired' };
  }

  const cookie = response.headers.get('Set-Cookie');
  const { accessToken } = await response.json();
  const refreshToken = cookie?.split(';')[0].split('=')[1];

  return { accessToken, refreshToken };
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

export const signOut = async () => {
  const response = await instance('sign-out', {
    method: 'POST',
    Credentials: 'include',
  });

  return response;
};
