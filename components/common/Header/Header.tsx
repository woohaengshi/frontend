'use client';

import Link from 'next/link';
import { Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import Image from 'next/image';

import Cookies from 'js-cookie';
import { API_ROUTE_URL } from '@/constants/url';
import useSWR from 'swr';
import useUserInfo from '@/hook/useUserInfo';
import { useUserInfoStore } from '@/store/memberStore';

export default function Header() {
  useSWR('reissue-token', revaildateToken);
  const { setUserInfo } = useUserInfoStore();

  // eslint-disable-next-line func-style
  async function revaildateToken() {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken && refreshToken) {
      const response = await fetch(`${API_ROUTE_URL}/api/reissue-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error('Failed to login');
      }

      const data = await response.json();

      // 토큰을 성공적으로 재발급받은 후 페이지 리로드
      window.location.reload();
      return data;
    }

    if (!accessToken && !refreshToken) {
      localStorage.removeItem('userInfo');
      setUserInfo(null);
    }
  }

  const userInfo = useUserInfo();

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
