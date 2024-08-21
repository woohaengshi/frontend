import UserProfile from '@/components/mypage/UserProfile';
import { Box, Container, Flex } from '@radix-ui/themes';
import styles from './layout.module.css';
import SmallButton from '@/components/common/SmallButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container size="2" p="6">
      <Box p="4" pt="9" className={styles.inner}>
        {/* 마이페이지 공통 프로필 영역 */}
        <UserProfile />
      </Box>
      <Box mt="3" p="4" py="6" className={styles.inner} asChild>
        <section>{children}</section>
      </Box>
      {/* 유저 유틸 버튼 */}
      <Flex mt="3" justify="end" gap="10px" asChild>
        <ul>
          <li>
            <SmallButton>로그아웃</SmallButton>
          </li>
          <li>
            <SmallButton>회원탈퇴</SmallButton>
          </li>
        </ul>
      </Flex>
    </Container>
  );
}
