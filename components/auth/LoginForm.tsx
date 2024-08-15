'use client';

import InputField from '@/components/auth/InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box, Text } from '@radix-ui/themes';
import Link from 'next/link';
import AuthFormLayout from './AuthFormLayout';
import { useState } from 'react';
import { useLoginStore } from '@/store/authStore';

export default function LoginForm() {
  const { email, password, setEmail, setPassword } = useLoginStore();

  return (
    <AuthFormLayout title="로그인">
      <form>
        <div className="input_box">
          <InputField
            label="이메일"
            id="user_email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="비밀번호"
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Box mt="6" className="btn_login">
          <CommonButton type="submit" style="dark_purple">
            로그인
          </CommonButton>
          <Text as="p" align="right" mt="3">
            <Link href={'/pwfind'}>비밀번호 찾기</Link>
          </Text>
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
