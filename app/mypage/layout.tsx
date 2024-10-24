'use client';

import UserProfile from '@/components/mypage/UserProfile';
import { Box, Container, Flex } from '@radix-ui/themes';
import styles from './layout.module.css';
import SmallButton from '@/components/common/SmallButton';
import { signOut as signOutFromBackend } from '@/apis/authApi';
import { signOut as signOutFromAuth } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/stores/memberStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const { setUserInfo } = useUserInfoStore();

  const logoutHandler = async () => {
    // 로그아웃할건지 확인하는 모달창 띄우기
    const confirmLogout = confirm('로그아웃 하시겠습니까?');
    if (!confirmLogout) return;

    await signOutFromBackend();
    await signOutFromAuth();

    localStorage.removeItem('userInfo');
    setUserInfo(null);

    route.push('/login');
  };

  return (
    <Container size="2" p="6" className={styles.container}>
      <Box p="4" pt="9" className={styles.inner}>
        {/* 마이페이지 공통 프로필 영역 */}
        <UserProfile />
      </Box>
      <Box mt="3" p="4" className={styles.inner} asChild>
        <section>{children}</section>
      </Box>
      {/* 유저 유틸 버튼 */}
      <Flex mt="3" justify="end" gap="10px" asChild>
        <ul>
          <li>
            <SmallButton onClick={logoutHandler}>로그아웃</SmallButton>
          </li>
          <li>
            <SmallButton
              onClick={() => {
                alert('추후 업데이트 예정입니다!');
              }}
            >
              회원탈퇴
            </SmallButton>
          </li>
        </ul>
      </Flex>
    </Container>
  );
}
