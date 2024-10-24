'use client';
import { Box, Text } from '@radix-ui/themes';
import styles from './Landing.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const timerRef = useRef(null);
  const rankingRef = useRef(null);
  const calRef = useRef(null);

  const timerDetailRef = useRef(null);
  const timerImgWrapRef = useRef(null);
  const rankingDetailRef = useRef(null);
  const rankingImgWrapRef = useRef(null);
  const calDetailRef = useRef(null);
  const calImgWrapRef = useRef(null);

  useEffect(() => {
    const commonGsapAni = {
      y: 0,
      opacity: 1,
      ease: 'circ.out',
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timerRef.current,
        start: '0% 80%',
        end: '50% 50%',
        scrub: true,
        markers: false,
      },
    });

    tl.to(timerDetailRef.current, commonGsapAni).to(timerImgWrapRef.current, commonGsapAni);

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: rankingRef.current,
        start: '60% bottom',
        end: 'bottom 70%',
        scrub: true,
        markers: false,
      },
    });

    t2.to(rankingDetailRef.current, commonGsapAni, 0).to(rankingImgWrapRef.current, commonGsapAni, 0);

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: calRef.current,
        start: '0% 50%',
        end: '50% 30%',
        scrub: true,
        markers: false,
      },
    });

    t3.to(calDetailRef.current, commonGsapAni, 0).to(calImgWrapRef.current, commonGsapAni, 0);
  }, []);

  return (
    <Box className={styles.landing_wrap}>
      <section className={styles.intro}>
        <div className={styles.intro_section}>
          <div className={styles.timer_icon_wrap}>
            <Image
              src="/imgs/landing/landing_timer_icon.png"
              alt="랜딩타이머아이콘"
              className={styles.timer_icon}
              width={500}
              height={500}
              quality={100}
              layout="responsive"
            />
          </div>
          <div className={styles.intro_text_wrap}>
            <Text className={styles.intro_text}>우행시</Text>
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
                className={styles.intro_btn}
              >
                <img src="/imgs/landing/inquiry.png" alt="문의하기아이콘" className={styles.inquiry_icon} />
                문의하기
              </a>
              <a
                href="https://ionized-toad-6ee.notion.site/woohaengshi-8e37b80ac8c64feba132ae91bde8d4c8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.intro_btn}
              >
                <img src="/imgs/landing/notion.png" alt="노션아이콘" className={styles.notion_icon} />
                노션보러가기
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
        <div ref={timerDetailRef} className={styles.timer_detail_wrap}>
          <Text size="8" className={styles.timer_title}>
            <img src="/imgs/landing/clock.png" alt="타이머아이콘" className={styles.timer_title_icon} />
            공부시작
          </Text>
          <Text size="5" className={styles.timer_detail}>
            내가 선택한 과목으로 공부 시간을 실시간으로 측정할 수 있어요. <br />
            언제 어디서든 공부를 시작하고 시간을 기록해보세요.
          </Text>
        </div>
        <div ref={timerImgWrapRef} className={styles.timer_img_wrap}>
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
      <section ref={rankingRef} className={styles.ranking}>
        <div className={styles.ranking_inner}>
          <div ref={rankingDetailRef} className={styles.ranking_detail_wrap}>
            <Text size="8" className={styles.ranking_title}>
              <Image
                src="/imgs/landing/trophy.png"
                width={50}
                height={50}
                quality={100}
                alt="트로피아이콘"
                className={styles.ranking_title_icon}
              />
              순위조회
              <br />
            </Text>
            <Text size="5" className={styles.ranking_detail}>
              일, 주, 월별로 나의 학습 순위를 확인하고, <br />
              다른 반 학생들과 경쟁할 수 있어요. <br />
              매일 꾸준히 공부한 시간만큼 높은 순위에 오를 수 있습니다!
            </Text>
          </div>
          <div ref={rankingImgWrapRef} className={styles.ranking_img_wrap}>
            <img
              src="/imgs/landing/landing_ranking_desktop.png"
              alt="랜딩랭킹데스크탑"
              className={styles.ranking_img_desktop}
            />
          </div>
        </div>
      </section>
      {/* 기록확인 소개 섹션 */}
      <section ref={calRef} className={styles.cal}>
        <div className={styles.cal_inner}>
          <div ref={calImgWrapRef} className={styles.cal_img_wrap}>
            <img src="/imgs/landing/landing_cal_desktop.png" alt="랜딩캘린더모달" className={styles.cal_img_desktop} />
            <img
              src="/imgs/landing/landing_cal_record.png"
              alt="랜딩캘린더기록확인"
              className={styles.cal_record_img}
            />
          </div>
          <div ref={calDetailRef} className={styles.cal_detail_wrap}>
            <Text size="8" className={styles.cal_title}>
              <Image
                src="/imgs/landing/cal.png"
                width={50}
                height={50}
                quality={100}
                alt="트로피아이콘"
                className={styles.cal_title_icon}
              />
              기록확인
              <br />
            </Text>
            <Text size="5" className={styles.cal_detail}>
              한눈에 나의 학습 기록을 확인해보세요.
              <br />
              일별 공부 시간을 달력에 표시하고, <br />
              각 날짜에 공부한 과목을 쉽게 확인할 수 있어요.
              <br />
              해당 날짜를 클릭하면, <br />
              모달창에서 나만의 회고록을 작성할 수 있습니다.
            </Text>
          </div>
        </div>
      </section>
    </Box>
  );
}
