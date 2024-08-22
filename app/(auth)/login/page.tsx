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

    return response;
  };
  return <LoginForm onLogin={handleLogin} />;
}
