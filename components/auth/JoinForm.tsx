'use client';

import InputField from './InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import AuthFormLayout from './AuthFormLayout';
import { useJoinStore } from '@/store/authStore';

export default function JoinForm() {
  const { email, name, password, passwordCheck, setEmail, setName, setPassword, setPasswordCheck } = useJoinStore();

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form = e.target;
    // console.log(form.user_cls.value);
  };

  return (
    <AuthFormLayout title="회원가입">
      <form onSubmit={handleJoin}>
        <div className="input_box">
          <InputField
            label="이메일"
            id="user_email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="이름"
            id="user_name"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="비밀번호"
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="비밀번호 확인"
            id="user_pw_re"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
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
              <RadioGroup.Root defaultValue="ai" name="user_cls" size="3">
                <RadioGroup.Item id="user_cls_ai" value="ai">
                  AI 엔지니어링
                </RadioGroup.Item>
                <RadioGroup.Item id="user_cls_cloud" value="cloud">
                  클라우드 엔지니어링
                </RadioGroup.Item>
                <RadioGroup.Item id="user_cls_service" value="service">
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
