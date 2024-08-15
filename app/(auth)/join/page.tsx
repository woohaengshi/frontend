'use client';

import { signUp } from '@/api/auth';
import JoinForm from '@/components/auth/JoinForm';
import { useJoinStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Join() {
  const { email, name, password, course, setAllEmpty } = useJoinStore();
  const route = useRouter();

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signUp({ email, name, password, course });

    // response가 error 속성을 가지고 있다면 에러 처리
    if (response.error) {
      alert(response.error.message);
    } else {
      alert('회원가입 되었습니다.');
      setAllEmpty();
      route.push('/login');
    }
  };

  return <JoinForm onJoin={handleJoin} />;
}
