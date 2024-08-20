'use client';

import { signIn } from '@/api/authApi';
import LoginForm from '@/components/auth/LoginForm';
import { useLoginStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { email, password, setAllEmpty } = useLoginStore();
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn({ email, password });

    // response가 error 속성을 가지고 있다면 에러 처리
    if (response.error) {
      alert(response.error.message);
    } else {
      alert('로그인 되었습니다.');

      route.push('/study');
    }
    setAllEmpty();
  };

  return <LoginForm onLogin={handleLogin} />;
}
