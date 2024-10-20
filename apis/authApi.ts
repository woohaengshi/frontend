'use server';

import { BASE_URL } from '@/constants/url';
import { instance } from './instance';

// 로그인
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

// 회원가입
export const signUp = async ({
  name,
  email,
  password,
  image,
  course,
}: {
  name: string;
  email: string;
  password: string;
  image: string;
  course: string;
}) => {
  const response = await instance('sign-up', {
    body: JSON.stringify({ name, email, password, image, course }),
    method: 'POST',
  });
  return response;
};

//로그아웃
export const signOut = async () => {
  const response = await instance('sign-out', {
    method: 'POST',
    Credentials: 'include',
  });

  return response;
};

//프로필 이미지 업데이트
export const patchProfileImg = async (formData: FormData) => {

  console.log('in call()');

  const response = await instance('members/image', {
    body: formData,
    method: 'PATCH',
    header : {
      'Content-Type': 'multipart/form-data',
    },
    credentials: 'include',
    isMultipart: true, //멀티파트 폼 데이터가 서버로 전송된다는 것을 명시
  });
  console.log('in call()22');

  

  return response;
};
