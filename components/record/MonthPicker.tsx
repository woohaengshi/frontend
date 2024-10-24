'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './MonthPicker.module.css';
import { useEffect } from 'react';
import {
  useFetchStore,
  usePickYearStore,
  useSelectedMonthStore,
  useSelectedYearStore,
  useTodayStore,
} from '@/stores/recordStore';
import useSWR from 'swr';
import { getRecordYearly } from '@/apis/recordApi';
import { formatTime } from '@/utils/formatTimeUtils';

interface IOnClose {
  onClose: () => void;
}

interface IYearlyDataRecord {
  month: number;
  total: number;
}

export default function MonthPicker({ onClose }: IOnClose) {
  const today = useTodayStore();
  const { pickYear, setPickYear } = usePickYearStore();
  const { selectedYear, setSelectedYear } = useSelectedYearStore();
  const { setSelectedMonth } = useSelectedMonthStore();

  // 모달을 열었을때 데이터 yearlyData fetch
  const { data: yearlyData, isLoading: yearLoading } = useSWR(['YearlyRecord', pickYear], async () => {
    const result = await getRecordYearly(pickYear);
    return result;
  });

  if (yearlyData?.error) {
    alert(yearlyData.error.message);
  }

  const records: IYearlyDataRecord[] = yearlyData?.records;
  const { setShouldFetch } = useFetchStore();

  useEffect(() => {
    setPickYear(selectedYear);
  }, [setPickYear, selectedYear]);

  const months = Array.from({ length: 12 }, (_, index) => (
    <li key={index}>
      <Flex
        justify="center"
        direction="column"
        gap="10px"
        className={`${today.year == pickYear && today.month - 1 == index ? styles.active : ''} ${styles.month}`}
        onClick={() => {
          setSelectedYear(pickYear);
          setSelectedMonth(index + 1);
          setShouldFetch(true);
          onClose(); // 월 선택기 닫기
        }}
      >
        <Text as="p" weight="medium">
          {index + 1}월
        </Text>
        <Text as="p" className={styles.total_time}>
          {records?.map((record) => {
            return record.month == index + 1 && <i key={`${pickYear}${index + 1}`}>{formatTime(record.total)}</i>;
          })}
        </Text>
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
