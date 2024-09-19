'use client';

import { handleCredentialsSignin } from '@/app/actions/authActions';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  const handleLogin = async (email: string, password: string) => {
    const response = await handleCredentialsSignin({ email, password });

    return response;
  };

  return <LoginForm onLogin={handleLogin} />;
}
