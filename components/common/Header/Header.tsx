'use client';

import Link from 'next/link';
import { Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import Image from 'next/image';

import useUserInfo from '@/hook/useUserInfo';
import { useUserInfoStore } from '@/store/memberStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Header() {
  const userInfo = useUserInfo();
  const { setUserInfo } = useUserInfoStore();

  const { data: session, update } = useSession();

  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;

  // update();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo && !accessToken && !refreshToken) {
      localStorage.removeItem('userInfo');
      setUserInfo(null);
    }
  }, [accessToken, refreshToken, setUserInfo]);

  return (
    <Box px="5" asChild>
      <header className={styles.header}>
        <Box className={styles.header_inner}>
          <Heading as="h1" className={styles.logo}>
            <Text as="p">
              <i>우</i>리들의<i>행</i>복한<i>시</i>간
            </Text>
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
