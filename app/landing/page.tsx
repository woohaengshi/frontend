'use client'
import { Box, Text } from '@radix-ui/themes';
import styles from './page.module.css';

export default function Landing() {
  return (
    <Box px="9" className={styles.landing_wrap}>
      <section className={styles.intro}>
        <div className={styles.intro_section}>
          <div className={styles.timer_icon_wrap}>
            <img src="/imgs/landing/landing_timer_icon.png" alt="랜딩타이머아이콘" className={styles.timer_icon} />
          </div>
          <div className={styles.intro_text_wrap}>
            <Text className={styles.intro_text}>
              우행시
              <br />
            </Text>
            <Text size="6" className={styles.intro_text_detail}>
              <strong>우</strong>리들의 <strong>행</strong>복한 <strong>시</strong>간을 효율적으로 관리하자!
              <br />
              쉽고 간편하게 공부 기록을 확인해보세요.
            </Text>
            <div className={styles.intro_btn_wrap}>
              <a
                href="https://docs.google.com/forms/d/1N7evntVJ_DmTpZdOxVvR3y8IHkLWBoiKxLxFbTDtFtE/edit?ts=66ce99ee"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.intro_btn}>문의하기</button>
              </a>
              <a
                href="https://ionized-toad-6ee.notion.site/woohaengshi-8e37b80ac8c64feba132ae91bde8d4c8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.intro_btn}>노션보러가기</button>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.intro_arrow_wrap}>
          <img src="/imgs/landing/arrow.png" alt="스크롤 유도 아이콘" className={styles.arrow} />
        </div>
      </section>
      {/* 타이머 소개 섹션 */}
      <section className={styles.timer_detail}>
        <div className={styles.timer_img_wrap}>
          <img
            src="/imgs/landing/landing_timer_desktop.png"
            alt="랜딩타이머데스크탑"
            className={styles.timer_img_desktop}
          />
          <img
            src="/imgs/landing/landing_timer_mobile.png"
            alt="랜딩타이머모바일"
            className={styles.timer_img_mobile}
          />
        </div>
      </section>
      <section>3</section>
    </Box>
  );
}
