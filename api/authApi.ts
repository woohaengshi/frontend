'use server';

import { BASE_URL } from '@/constants/url';
import { instance } from './instance';
import { cookies } from 'next/headers';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });

  return response;
};

export const reissueToken = async () => {
  const refreshToken = cookies().get('refresh_token')?.value;

  // 요청 내용을 출력합니다.
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh_token=${refreshToken}`,
    },
    method: 'POST',
  };

  // 실제 요청을 보냅니다.
  const response = await fetch(`${BASE_URL}reissue`, requestOptions);
  const data = await response.json();

  return { ...data, cookie: response.headers.get('set-cookie') };
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
