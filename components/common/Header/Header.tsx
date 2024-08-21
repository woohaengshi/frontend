'use client';

import Link from 'next/link';
import { Avatar, Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import Cookies from 'js-cookie';
import { API_ROUTE_URL } from '@/constants/url';
import useSWR from 'swr';

export default function Header() {
  useSWR('reissue-token', revaildateToken);

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
  }

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
          <div className={styles.user_info}>
            <Flex align="center" gap="2" asChild>
              <Link href="/mypage">
                <div
                  className={styles.user_name}
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop')`,
                  }}
                >
                  <Avatar fallback="A" />
                </div>
                <div className={styles.user_txt}>
                  <Strong>홍길동</Strong>
                  <Text as="p" size="2" mt="1" weight="medium">
                    클라우드 서비스
                  </Text>
                </div>
              </Link>
            </Flex>
          </div>
        </Box>
      </header>
    </Box>
  );
}
