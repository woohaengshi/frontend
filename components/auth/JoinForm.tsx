'use client';

import InputField from './InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import AuthFormLayout from './AuthFormLayout';
import { useJoinStore } from '@/store/authStore';
import { useState } from 'react';
import { isValidPassword } from '@/utils/validateUtils';

interface JoinFormProps {
  onJoin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function JoinForm({ onJoin }: JoinFormProps) {
  const [error, setError] = useState({ email: false, password: false, passwordCheck: false });
  const { email, name, password, passwordCheck, course, setEmail, setName, setPassword, setPasswordCheck, setCourse } =
    useJoinStore();

  const handleEmailChange = (email: string) => {
    if (email.includes('@')) {
      setError((prev) => ({ ...prev, email: false }));
    } else {
      setError((prev) => ({ ...prev, email: true }));
    }
    setEmail(email);
  };

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);

    // 비밀번호 유효성 검사
    if (isValidPassword(password)) {
      setError((prev) => ({ ...prev, password: false }));
    } else {
      setError((prev) => ({ ...prev, password: true }));
    }

    // 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(password, passwordCheck);
  };

  const handlePasswordCheckChange = (passwordCheck: string) => {
    setPasswordCheck(passwordCheck);

    // 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(password, passwordCheck);
  };

  // 비밀번호와 비밀번호 확인 일치 여부를 검사하는 함수
  const checkPasswordMatch = (password: string, passwordCheck: string) => {
    setError((prev) => ({
      ...prev,
      passwordCheck: password !== passwordCheck,
    }));
  };

  const handleCourseChange = (value: string) => {
    setCourse(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error.email || error.password || error.passwordCheck) {
      alert('입력값을 확인해주세요.');
      return;
    }

    onJoin(e);
  };

  return (
    <AuthFormLayout title="회원가입">
      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <InputField
            label="이메일"
            id="user_email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(e.target.value)}
          />
          {error.email && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              이메일 형식이 올바르지 않습니다.
            </Text>
          )}
          <InputField
            label="이름"
            id="user_name"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
          />
          <InputField
            label="비밀번호"
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.target.value)}
          />
          {error.password && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              영어, 숫자, 특수문자를 포함한 최소 8자 이상, 최대 20자 이하여야 합니다.
            </Text>
          )}
          <InputField
            label="비밀번호 확인"
            id="user_pw_re"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordCheck}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordCheckChange(e.target.value)}
          />
          {error.passwordCheck && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              비밀번호가 일치하지 않습니다.
            </Text>
          )}
          <Box mt="3" className="row">
            <Text as="label" weight="medium" htmlFor="user_cls">
              클래스
            </Text>
            <Flex
              mt="2"
              justify="start"
              align="center"
              direction="row"
              gap="30px"
              gapY="10px"
              wrap="wrap"
              className="radio_box"
              asChild
            >
              <RadioGroup.Root
                defaultValue="ai"
                name="user_cls"
                size="3"
                value={course}
                onValueChange={handleCourseChange}
              >
                <RadioGroup.Item id="user_cls_ai" value="AI 엔지니어링">
                  AI 엔지니어링
                </RadioGroup.Item>
                <RadioGroup.Item id="user_cls_cloud" value="클라우드 엔지니어링">
                  클라우드 엔지니어링
                </RadioGroup.Item>
                <RadioGroup.Item id="user_cls_service" value="클라우드 서비스">
                  클라우드 서비스 개발
                </RadioGroup.Item>
              </RadioGroup.Root>
            </Flex>
          </Box>
        </div>
        <Box mt="6" className="btn_join">
          <CommonButton type="submit" style="dark_purple">
            회원가입
          </CommonButton>
        </Box>
      </form>
    </AuthFormLayout>
  );
}
