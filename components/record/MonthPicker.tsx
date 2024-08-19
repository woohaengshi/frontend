import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './MonthPicker.module.css';
import { useEffect } from 'react';
import { usePickYearStore, useSelectedMonthStore, useSelectedYearStore, useTodayStore } from '@/store/recordStore';

export default function MonthPicker({ onClose }) {
  const today = useTodayStore();
  const { pickYear, setPickYear } = usePickYearStore();
  const { selectedYear, setSelectedYear } = useSelectedYearStore();
  const { setSelectedMonth } = useSelectedMonthStore();

  useEffect(() => {
    setPickYear(selectedYear);
  }, [setPickYear, selectedYear]);

  const months = Array.from({ length: 12 }, (_, index) => (
    <li key={index}>
      <Flex
        justify="center"
        direction="column"
        className={`${today.year == pickYear && today.month - 1 == index ? styles.active : ''} ${styles.month}`}
        onClick={() => {
          setSelectedYear(pickYear);
          setSelectedMonth(index + 1);
          onClose(); // 월 선택기 닫기
        }}
      >
        <Text as="p" weight="medium">
          {index + 1}월
        </Text>
        <i>10:10</i>
      </Flex>
    </li>
  ));

  return (
    <Box className={styles.month_picker} p="2">
      <Flex justify="between" align="center" className={styles.year_list}>
        <button
          onClick={() => {
            setPickYear(pickYear - 1);
          }}
        >
          <ChevronLeftIcon />
        </button>
        <Text as="p">{pickYear}년</Text> {/* 현재 년도 표시 */}
        <button
          onClick={() => {
            setPickYear(pickYear + 1);
          }}
        >
          <ChevronRightIcon />
        </button>
      </Flex>
      <Box className={styles.month_list} mt="2">
        <Flex asChild wrap="wrap">
          <ul>{months}</ul>
        </Flex>
      </Box>
    </Box>
  );
}
