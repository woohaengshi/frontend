import Link from 'next/link';
import { Avatar, Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import Image from 'next/image';

export default function Header() {
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
                    // 유저 프로필 이미지
                    backgroundImage: `url('')`,
                  }}
                >
                  {/* 기본 이미지 */}
                  <Image src={rankingImg.src} alt={`프로필 이미지`} width={40} height={40} />
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
