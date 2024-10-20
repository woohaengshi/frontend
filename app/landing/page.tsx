'use client'
import { Box, Text } from '@radix-ui/themes';
import styles from './page.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const timerRef = useRef(null);
  useEffect(() => {
    const timerTitle = document.querySelector(`.${styles.timer_title}`);
    const timerDetail = document.querySelector(`.${styles.timer_detail}`);
    const timerImgWrap = document.querySelector(`.${styles.timer_img_wrap}`);

    const commonGsapAni = {
      y: 0,
      opacity: 1,
      ease: "circ.out",
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timerRef.current,
        start: '10% 80%',
        end: '50% 50%',
        scrub: true,
        markers: false,
      },
    });

    tl.to(timerTitle, commonGsapAni).to(timerDetail, commonGsapAni).to(timerImgWrap, commonGsapAni);
  }, []);

  return (
    <Box className={styles.landing_wrap}>
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
      <section className={styles.add_explane}>
        <Text className={styles.add_explane_text}>
          시간 측정부터 과목 선택, 랭킹 확인까지 한 번에! <br />
          교육생의 학습 시간을 체계적으로 관리할 수 있는 서비스, <br />
          우행시와 함께라면 성장을 눈으로 확인할 수 있습니다.
        </Text>
      </section>
      {/* 타이머 소개 섹션 */}
      <section ref={timerRef} className={styles.timer}>
        <div className={styles.timer_detail_wrap}>
          <Text size="8" className={styles.timer_title}>
            <img src="/imgs/landing/clock.png" alt="타이머아이콘" className={styles.timer_title_icon} />
            공부시작
            <br />
          </Text>
          <Text size="6" className={styles.timer_detail}>
            <br />
            내가 선택한 과목으로 공부 시간을 실시간으로 측정할 수 있어요. <br />
            언제 어디서든 공부를 시작하고 시간을 기록해보세요.
          </Text>
        </div>
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
      {/* 순위조회 소개 섹션 */}
      <section className={styles.ranking}>
        <div className={styles.ranking_detail_wrap}>
          <Text size="8" className={styles.ranking_title}>
            <img src="/imgs/landing/trophy.png" alt="트로피아이콘" className={styles.ranking_title_icon} />
            순위조회
            <br />
          </Text>
          <Text size="6" className={styles.ranking_detail}>
            <br />
            일, 주, 월별로 나의 학습 순위를 확인하고, <br />
            다른 반 학생들과 경쟁할 수 있어요. <br />
            매일 꾸준히 공부한 시간만큼 높은 순위에 오를 수 있습니다!
          </Text>
        </div>
        <div className={styles.ranking_img_wrap}>
          <img
            src="/imgs/landing/landing_ranking_desktop.png"
            alt="랜딩랭킹데스크탑"
            className={styles.ranking_img_desktop}
          />
        </div>
      </section>
      {/* 기록확인 소개 섹션 */}
      <section className={styles.ranking}>
        <div className={styles.ranking_img_wrap}>
          <img
            src="/imgs/landing/landing_cal_desktop.png"
            alt="랜딩랭킹데스크탑"
            className={styles.ranking_img_desktop}
          />
        </div>
        <div className={styles.ranking_detail_wrap}>
          <Text size="8" className={styles.ranking_title}>
            <img src="/imgs/landing/trophy.png" alt="트로피아이콘" className={styles.ranking_title_icon} />
            랭킹확인
            <br />
          </Text>
          <Text size="6" className={styles.ranking_detail}>
            <br />
            일, 주, 월별로 나의 학습 순위를 확인하고, <br />
            다른 반 학생들과 경쟁할 수 있어요. <br />
            매일 꾸준히 공부한 시간만큼 높은 순위에 오를 수 있습니다!
          </Text>
        </div>
      </section>
    </Box>
  );
}
