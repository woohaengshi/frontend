'use server';

import { cookies } from 'next/headers'; // 서버 사이드에서 쿠키를 처리하기 위한 내장 모듈

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + 'api/v1/';

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

const fetchInstance = async (url: string, options: RequestOptions = {}) => {
  let token: string | undefined;

  if (typeof window === 'undefined') {
    // 서버 사이드에서 쿠키 가져오기
    const cookieStore = cookies();
    token = cookieStore.get('whs-token')?.value;
  } else {
    // 클라이언트 사이드에서 쿠키 가져오기
    token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('whs-token='))
      ?.split('=')[1];
  }

  try {
    const headers: RequestOptions['headers'] = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(BASE_URL + url, {
      ...options,
      headers,
    });

    // 토큰 만료 등의 경우 401 처리
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        // 리프레시 토큰
      }
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      // throw errorResponse;
      return { error: errorResponse };
    }

    // Content-Type이 JSON이면 JSON으로 파싱
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return await response.json();
    } else {
      console.log('Response is not JSON');
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;
