'use server';

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

  const response = await instance('reissue', {
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
    method: 'POST',
  });

  return response;
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
  const refreshToken = cookies().get('refresh_token')?.value;

  const response = await instance('sign-out', {
    method: 'POST',
    Cookie: `refresh_token=${refreshToken}`,
  });

  return response;
};
