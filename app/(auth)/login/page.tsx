'use client';

import LoginForm from '@/components/auth/LoginForm';
import { API_ROUTE_URL } from '@/constants/url';

export default function Login() {
  const handleLogin = async (email: string, password: string) => {
    const response = await fetch(`${API_ROUTE_URL}/api/sign-in`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // 응답이 정상적이지 않을 때 오류 처리
      const errorText = await response.text(); // JSON이 아닐 수도 있으니 텍스트로 받아서 로그를 찍음
      console.error('Error response from server:', errorText);
      throw new Error('Failed to login');
    }

    const data = await response.json(); // 여기서 JSON 파싱
    return data;
  };
  return <LoginForm onLogin={handleLogin} />;
}
