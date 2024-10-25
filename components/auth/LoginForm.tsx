'use client';

import InputField from '@/components/auth/InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box, Text } from '@radix-ui/themes';
import AuthFormLayout from './AuthFormLayout';
import { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<{ message: string } | undefined>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const response = await onLogin(email, password);

    if (typeof response === 'object' && response.message) {
      // 응답이 정상적이지 않을 때 오류 처리
      alert('로그인에 실패했습니다.');
      throw new Error('Failed to login');
    } else {
      setEmail('');
      setPassword('');

      window.location.href = '/study';
      alert('로그인에 성공했습니다.');
    }
  };

  return (
    <AuthFormLayout title="로그인">
      <form onSubmit={handleLogin}>
        <div className="input_box">
          <Box mt="3" className="row">
            <InputField
              label="이메일"
              id="user_email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mt="3" className="row">
            <InputField
              label="비밀번호"
              id="user_pw"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </div>
        <Box mt="6" className="btn_login">
          <CommonButton type="submit" style="dark_purple">
            로그인
          </CommonButton>
          {/* <Text as="p" align="right" mt="2">
            <Link href={'/pwfind'}>비밀번호 찾기</Link>
          </Text> */}
        </Box>
      </form>
      <Box mt="6" className="btn_join">
        <Text as="p">아직 회원이 아니신가요?</Text>
        <Box mt="3">
          <CommonButton type="link" href="/join" style="light_purple">
            회원가입
          </CommonButton>
        </Box>
      </Box>
    </AuthFormLayout>
  );
}
