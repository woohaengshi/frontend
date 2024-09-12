'use server';

import { cookies } from 'next/headers'; // 서버 사이드에서 쿠키를 처리하기 위한 내장 모듈
import { BASE_URL } from '@/constants/url';
import { auth } from '@/auth';

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

const fetchInstance = async (url: string, options: RequestOptions = {}) => {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  // console.log('인스턴스로부터', session?.user);

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
