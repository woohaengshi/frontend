'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';
import styles from './FullCalendar.module.css';
import MonthPicker from './MonthPicker';
import { useSelectedMonthStore, useSelectedYearStore, useTodayStore } from '@/store/recordStore';
import CalendarRecord from './CalendarRecord';
import { getRecordMonthly } from '@/api/recordApi';
import useSWR from 'swr';

interface IMonthlyData {
  year: number;
  month: number;
  records: IMonthlyDataRecord[];
}

interface IMonthlyDataRecord {
  day: number;
  time: number;
  subjects: any[];
}

// 달력 이동 버튼을 누를때만 갱신된 데이터 가져옴
const useRefreshMonthyData = (selectedYear: number, selectedMonth: number, shouldFetch: boolean) => {
  const { data: refreshMonthlyData, isLoading: refreshMonthlyLoading } = useSWR(
    shouldFetch ? ['MonthlyRecord', selectedYear, selectedMonth] : null,
    async () => {
      const result = await getRecordMonthly(selectedYear, selectedMonth);
      return result;
    },
    {
      revalidateOnFocus: false, // 화면이 포커스될 때 데이터 재요청 방지
      revalidateOnReconnect: false, // 네트워크 재연결 시 데이터 재요청 방지
    },
  );

  if (refreshMonthlyData?.error) {
    alert(refreshMonthlyData.error.message);
  }

  return { refreshMonthlyData, refreshMonthlyLoading };
};

export default function FullCalendar({ monthlyData }: { monthlyData: IMonthlyData }) {
  const today = useTodayStore();
  const { selectedYear, setSelectedYear } = useSelectedYearStore();
  const { selectedMonth, setSelectedMonth } = useSelectedMonthStore();

  // 초기 렌더링시 데이터 패치를 막기 위함
  const [shouldFetch, setShouldFetch] = useState(false);

  const [records, setRecords] = useState<IMonthlyDataRecord[]>(monthlyData?.records);

  // 매월 시작일 index (0 ~ 6)
  const startDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  // 매월 말일 날짜 (30, 31)
  const endDate = new Date(selectedYear, selectedMonth, 0).getDate();
  const weekNumber = Math.ceil((startDay + endDate) / 7);

  // 커스텀 훅 호출
  const { refreshMonthlyData, refreshMonthlyLoading } = useRefreshMonthyData(selectedYear, selectedMonth, shouldFetch);

  // 이전달 보기
  const prevMonth = useCallback(async () => {
    let newYear = selectedYear;
    let newMonth = selectedMonth - 1;
    if (newMonth < 1) {
      newYear = selectedYear - 1;
      newMonth = 12;
    }

    // 상태 업데이트
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);

    // 버튼을 눌렀을때 데이터 불러오도록 트리거
    setShouldFetch(true);
  }, [selectedMonth, selectedYear, setSelectedMonth, setSelectedYear]);

  // 다음달 보기
  const nextMonth = useCallback(async () => {
    let newYear = selectedYear;
    let newMonth = selectedMonth + 1;

    if (newMonth > 12) {
      newYear = selectedYear + 1;
      newMonth = 1;
    }

    // 상태 업데이트
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);

    // 버튼을 눌렀을때 데이터 불러오도록 트리거
    setShouldFetch(true);
  }, [selectedMonth, selectedYear, setSelectedMonth, setSelectedYear]);

  useEffect(() => {
    // 데이터 패치가 갱신됐을때
    if (refreshMonthlyData) {
      // records에 새로운 데이터 대입
      setRecords(refreshMonthlyData.records);
      // 패치 트리거 false
      setShouldFetch(false);
    }
  }, [refreshMonthlyData]);

  const returnDay = useCallback(() => {
    let days = [];
    let daysArr = [];
    let keyCnt = 0;

    // 실질적인 날짜
    let nowDate = 0;
    let nowDay = 0;

    for (let i = 0; i < weekNumber; i++) {
      // 새로운 행을 위해 초기화
      days = [];
      for (let j = 0; j < 7; j++) {
        if (startDay <= nowDay && nowDate < endDate) {
          nowDate++;
          days.push(
            <td
              key={`days${keyCnt + 1}`}
              className={
                today.year == selectedYear && today.month == selectedMonth && today.date == nowDate ? styles.today : ''
              }
            >
              <Flex direction="column" gap="10px" className={styles.cell}>
                {/* 포멧팅된 날짜 표시 */}
                <Text as="p" align="center" className={styles.date}>
                  {nowDate}
                </Text>
                {records?.map((record) => {
                  return (
                    record.day == nowDate && (
                      <CalendarRecord key={`record${nowDate}`} nowDate={nowDate} record={record} />
                    )
                  );
                })}
              </Flex>
            </td>,
          );
          keyCnt++;
        } else {
          days.push(<td key={`days${keyCnt + 1}`} className="blank"></td>);
          keyCnt++;
        }
        nowDay++;
      }
      // 7일마다 새로운 행 추가
      daysArr.push(
        <tr key={`weeks${keyCnt}`} className={styles.content_row}>
          {days}
        </tr>,
      );
    }

    return daysArr;
  }, [selectedYear, selectedMonth, records, today, weekNumber, endDate, startDay]);

  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false); // 월 선택기 열림 상태

  // 월 선택기 열림/닫힘 토글
  const toggleMonthPicker = () => {
    setIsMonthPickerOpen(!isMonthPickerOpen);
  };

  return (
    <div className={styles.full_calendar}>
      <Container size="3" p="6">
        <Box p="4" className={styles.container_inner}>
          <div className={styles.calendar_header}>
            <Flex justify="between" align="center">
              <button onClick={prevMonth} className={styles.arr}>
                <ArrowLeftIcon />
              </button>
              <Heading
                as="h2"
                onClick={toggleMonthPicker} // 클릭 시 월 선택기 열기
              >
                <button className={styles.btn_open_month_picker}>
                  {selectedYear}년 {selectedMonth}월
                </button>
              </Heading>
              <button onClick={nextMonth} className={styles.arr}>
                <ArrowRightIcon />
              </button>
            </Flex>
            {/* 월 선택기 렌더링 */}
            {isMonthPickerOpen && (
              <MonthPicker
                onClose={() => {
                  toggleMonthPicker();
                }}
              />
            )}
          </div>
          <div className={styles.calendar_table}>
            <table>
              <thead>
                <tr>
                  <th className={styles.radius_left}>일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th className={styles.radius_right}>토</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.blank_row}>
                  <td key={`daysBlank`} colSpan={7}></td>
                </tr>
                {returnDay()}
              </tbody>
            </table>
          </div>
          <Flex mt="3" gap="20px" className={styles.level_list}>
            <Text as="p" size="2">
              레벨 별 누적시간
            </Text>
            <Flex gap="10px" asChild>
              <ul>
                <li className={styles.level1}>
                  <Text as="span" size="2">
                    0 ~ 3
                  </Text>
                </li>
                <li className={styles.level2}>
                  <Text as="span" size="2">
                    3 ~ 6
                  </Text>
                </li>
                <li className={styles.level3}>
                  <Text as="span" size="2">
                    6 ~
                  </Text>
                </li>
              </ul>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </div>
  );
}
