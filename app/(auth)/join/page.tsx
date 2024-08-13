'use client';

import { Box, Flex, RadioGroup, Strong, Text } from '@radix-ui/themes';
import styles from '../layout.module.css';
import CommonButton from '@/components/common/CommonButton';

export default function Join() {
  const join = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.user_cls.value);
  };

  return (
    <Box className="member_wrap">
      <div className={styles.title}>
        <Strong>회원가입</Strong>
      </div>
      <Box mt="6" className="content" asChild>
        <section>
          <form action="" onSubmit={join}>
            <div className="input_box">
              <Box className="row">
                <Text as="label" weight="medium" htmlFor="user_email">
                  이메일
                </Text>
                <Box mt="2">
                  <input type="text" id="user_email" placeholder="이메일을 입력해주세요." />
                </Box>
              </Box>
              <Box mt="3" className="row">
                <Text as="label" weight="medium" htmlFor="user_name">
                  이름
                </Text>
                <Box mt="2">
                  <input type="text" id="user_name" placeholder="이름을 입력해주세요." />
                </Box>
              </Box>
              <Box mt="3" className="row">
                <Text as="label" weight="medium" htmlFor="user_pw">
                  비밀번호
                </Text>
                <Box mt="2">
                  <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요." />
                </Box>
              </Box>
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
        </section>
      </Box>
    </Box>
  );
}
