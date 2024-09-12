'use server';

import { cookies } from 'next/headers'; // 서버 사이드에서 쿠키를 처리하기 위한 내장 모듈
import { BASE_URL } from '@/constants/url';
import { auth } from '@/auth';
import { redirect } from 'next/dist/server/api-utils';

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

const fetchInstance = async (url: string, options: RequestOptions = {}) => {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  const headers: RequestOptions['headers'] = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 403) {
        console.error('Token Expired');
      }
      console.error('Fetch Error:', errorResponse);
      return { error: errorResponse };
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const jsonResponse = await response.json();
      return { ...jsonResponse, cookie: response.headers.get('Set-Cookie') };
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;
