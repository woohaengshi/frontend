'use client';

import { Box, Text, Strong } from '@radix-ui/themes';
import styles from '../layout.module.css';
import Link from 'next/link';
import CommonButton from '@/components/common/CommonButton';

export default function Login() {
  const login = (e) =>{    
    e.preventDefault();
    const form = e.target;
  }
  
  return (
    <Box className="member_wrap">
      <div className={styles.title}>
        <Strong>로그인</Strong>
      </div>
      <Box mt="6" className="content" asChild>
        <section>
          <form action="" onSubmit={login}>
            <div className="input_box">
              <Box className="row">
                <Text as="label" weight="medium" htmlFor="user_email">이메일</Text>
                <Box mt="2">
                  <input type="text" id="user_email" placeholder="이메일을 입력해주세요." />
                </Box>
              </Box>
              <Box mt="3" className="row">
              <Text as="label" weight="medium" htmlFor="user_pw">비밀번호</Text>
                <Box mt="2">
                  <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요." />
                </Box>
              </Box>
            </div>
            <Box mt="6" className="btn_login">
              <CommonButton type="submit">로그인</CommonButton>
              <Text as="p" align="right" mt="3">
                <Link href={'/pwfind'}>비밀번호 찾기</Link>
              </Text>
            </Box>
          </form>
          <Box mt="6" className="btn_join">
            <Text as="p">아직 회원이 아니신가요?</Text>
            <Box mt="3">
              <CommonButton type="link" href="/join">회원가입</CommonButton>
            </Box>
          </Box>
        </section>
      </Box>
    </Box>
  );
}
