'use server'

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
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    // 토큰 만료 등의 경우 401 처리
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        // 클라이언트 사이드에서만 쿠키 제거
        document.cookie = 'whs-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      }
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log('Fetch Error: 에러');
      console.log('errorResponse:', errorResponse);
      throw new Error(errorResponse.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const instance = {
  get: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'GET' }),
  post: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'POST' }),
  put: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'PUT' }),
  delete: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'DELETE' }),
};

export default instance;
