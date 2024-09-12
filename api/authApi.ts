'use server';

import { auth } from '@/auth';
import { instance } from './instance';
import { cookies } from 'next/headers';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });

  // console.log('signInFromBackend response', response);
  return response;
};

export const reissueToken = async () => {
  const session = await auth();
  const refreshToken = session?.user?.refreshToken;

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
  const response = await instance('sign-out', {
    method: 'POST',
    Credentials: 'include',
  });

  return response;
};
