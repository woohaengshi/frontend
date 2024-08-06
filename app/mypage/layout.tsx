import UserProfile from '@/components/mypage/UserProfile';
import { Box, Container } from '@radix-ui/themes';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container size="2" p="6">
      <Box p="4" pt="9" className={styles.inner}>
        {/* 마이페이지 공통 프로필 영역 */}
        <UserProfile />
      </Box>
      <Box mt="3" p="4" className={`${styles.inner} ${styles.content}`} asChild>
        <section>
          {children}
        </section>
      </Box>
    </Container>
  );
}
