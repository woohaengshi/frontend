'use client';

import Link from "next/link";
import styles from './MypageTabMenu.module.css';
import { Box, ChevronDownIcon } from "@radix-ui/themes";
import { useState } from "react";

export default function MypageTabMenu() {
  const [openTab, setOpenTab] = useState(false);
  return (
    <Box mt="6" className={styles.tab_menu}>
      <a href="#" onClick={(e)=>{e.preventDefault(); setOpenTab(!openTab);}}>
        내 배지 조회
        <ChevronDownIcon />
      </a>
      {
        openTab &&
        <ul>
          <li>
            <Link href="">내 배지 조회</Link>
          </li>
          <li>
            <Link href="">과목 편집</Link>
          </li>
          <li>
            <Link href="">비밀번호 수정</Link>
          </li>
        </ul>
      }
    </Box>
  );
}