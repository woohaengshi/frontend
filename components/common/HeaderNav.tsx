'use client';

import { Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <Flex justify="center" align="center" gap="9" asChild>
      <ul>
        <li>
          <Link href="/study" className={pathname.startsWith('/study') ? `${styles.active}` : ''}>
            <Text as="p" size="4" weight="bold">
              공부하기
            </Text>
          </Link>
        </li>
        <li>
          <Link href="/ranking" className={pathname.startsWith('/ranking') ? `${styles.active}` : ''}>
            <Text as="p" size="4" weight="bold">
              순위확인
            </Text>
          </Link>
        </li>
        <li>
          <Link href="/record" className={pathname.startsWith('/record') ? `${styles.active}` : ''}>
            <Text as="p" size="4" weight="bold">
              기록확인
            </Text>
          </Link>
        </li>
      </ul>
    </Flex>
  );
}
