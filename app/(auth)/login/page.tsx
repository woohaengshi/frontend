'use client';

import { handleCredentialsSignin } from '@/app/actions/authActions';
import LoginForm from '@/components/auth/LoginForm';
import { API_ROUTE_URL } from '@/constants/url';
import { signIn, SignInResponse } from 'next-auth/react';

export default function Login() {
  const handleLogin = async (email: string, password: string) => {
    const response = await handleCredentialsSignin({ email, password });

    console.log('response', response);
    return response;
  };

  return <LoginForm onLogin={handleLogin} />;
}
