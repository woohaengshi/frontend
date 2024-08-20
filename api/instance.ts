'use server';

import { cookies } from 'next/headers'; // 서버 사이드에서 쿠키를 처리하기 위한 내장 모듈
import { reissueToken } from './authApi';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + 'api/v1/';

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

const fetchInstance = async (url: string, options: RequestOptions = {}, isRetry = false) => {
  const token = cookies().get('whs-access')?.value;

  const headers: RequestOptions['headers'] = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !isRetry) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers,
    });

    // 토큰 만료 등의 경우 401 처리
    if (response.status === (401 || 404) && !isRetry) {
      const newToken = await reissueToken();

      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        // 401 에러 발생 시 재시도 (isRetry 플래그를 사용하여 무한 재귀 방지)
        return fetchInstance(url, options, true);
      } else {
        return { error: { message: '토큰 재발급 실패' } };
      }
    }

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
