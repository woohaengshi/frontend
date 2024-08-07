import { Box, Container } from '@radix-ui/themes';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
  return (
    <Container size="2" p="6">
      <Box>
        <div className={styles.member_wrap}>
          <header className={styles.title}>
            <h2>로그인</h2>
          </header>
          <section className={styles.content}>
            <form action="">
              <div className={styles.input_box}>
                <div className={styles.row}>
                  <label htmlFor="user_name">이름</label>
                  <div className={styles.input}>
                    <input type="text" id="user_name" placeholder="이름을 입력해주세요." />
                  </div>
                </div>
                <div className={styles.row}>
                  <label htmlFor="user_pw">비밀번호</label>
                  <div className={styles.input}>
                    <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요." />
                  </div>
                </div>
              </div>
              <div className={styles.btn_box}>
                <div id="loginBtn" className={styles.button}>
                  <button type="submit">로그인</button>
                </div>
              </div>
            </form>
            <div className={`${styles.btn_box} ${styles.btn_join}`}>
              <p>아직 회원이 아니신가요?</p>
              <div className={styles.button}>
                <Link href={'/join'}>회원가입</Link>
              </div>
            </div>
          </section>
        </div>
      </Box>
    </Container>
  );
}
