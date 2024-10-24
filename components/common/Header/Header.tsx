'use client';

import Link from 'next/link';
import { Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import rankingImg from '@/public/imgs/ranking/ranking_profile_img.png';
import Image from 'next/image';

import { useUserInfoStore } from '@/stores/memberStore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/apis/memberApi';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const { userInfo, setUserInfo } = useUserInfoStore();

  const { data: session } = useSession();

  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;

  // 루트 경로에서만 특정 이벤트 추가
  const pathname = usePathname();
  const isRootPath = pathname === '/';

  useEffect(() => {
    if (isRootPath) {
      const header = document.querySelector(`.${styles.header_landing}`);

      gsap.to(header, {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        scrollTrigger: {
          trigger: document.body,
          start: '2% 0%',
          end: '10% 20%',
          scrub: true,
          markers: false,
        },
      });
    }
  }, [isRootPath]);

  // update();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo && !accessToken && !refreshToken) {
      localStorage.removeItem('userInfo');
      setUserInfo(null);
    }
  }, [accessToken, refreshToken, setUserInfo]);

  // 유저정보조회
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('userInfo') && accessToken && refreshToken) {
        const result = await getUserInfo();
        const storedUserInfo = { name: result.name, course: result.course, email: result.email };
        if (result) {
          localStorage.setItem('userInfo', JSON.stringify(storedUserInfo));
          setUserInfo(result);
        }
      }
    })();
  });

  return (
    <Box px="5" asChild>
      <header className={`${isRootPath ? styles.header_landing : styles.header}`}>
        <Box className={styles.header_inner}>
          <Heading as="h1" className={styles.logo}>
            <Link href="/">
              <Text as="p">
                <i>우</i>리들의<i>행</i>복한<i>시</i>간
              </Text>
            </Link>
          </Heading>
          <nav className={styles.gnb}>
            <HeaderNav />
          </nav>
          {userInfo && (
            <div className={styles.user_info}>
              <Flex align="center" gap="2" asChild>
                <Link href="/mypage">
                  <div
                    className={styles.user_name}
                    style={{
                      // 유저 프로필 이미지
                      backgroundImage: `url('')`,
                    }}
                  >
                    {/* 기본 이미지 */}
                    <Image src={rankingImg} alt={`프로필 이미지`} width={40} height={40} />
                  </div>
                  <div className={styles.user_txt}>
                    <Strong>{userInfo?.name}</Strong>
                    <Text as="p" size="2" mt="1" weight="medium">
                      {userInfo?.course}
                    </Text>
                  </div>
                </Link>
              </Flex>
            </div>
          )}
        </Box>
      </header>
    </Box>
  );
}
