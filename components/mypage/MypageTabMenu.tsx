'use client';

import Link from 'next/link';
import styles from './MypageTabMenu.module.css';
import { Box, ChevronDownIcon } from '@radix-ui/themes';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MypageTabMenu() {
  // 탭을 열고닫는 boolean
  const [openTab, setOpenTab] = useState(false);

  // path
  const pathname = usePathname();

  // 탭메뉴 배열
  const tabMenu = [
    { link: '/mypage', title: '내 배지 조회' },
    { link: '/mypage/subjectedit', title: '과목 편집' },
    { link: '/mypage/pwupdate', title: '비밀번호 수정' },
    { link: '/mypage/infoupdate', title: '회원정보 수정' },
  ];

  const [pathTabTitle] = tabMenu.filter((tab) => {
    return tab.link == pathname;
  });

  return (
    <Box mt="6" className={styles.tab_menu}>
      <button
        onClick={() => {
          setOpenTab(!openTab);
        }}
      >
        {pathTabTitle.title}
        <ChevronDownIcon />
      </button>
      {openTab && (
        <ul>
          {tabMenu.map((tab, i) => {
            return (
              <li key={`tabMenu${i}`}>
                <Link href={tab.link} legacyBehavior>
                  <a
                    onClick={() => {
                      setOpenTab(false);
                    }}
                  >
                    {tab.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
