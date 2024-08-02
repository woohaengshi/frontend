'use client';

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, FaceIcon } from '@radix-ui/react-icons';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { useState } from 'react';
import styles from './FullCalendar.module.css';

export default function FullCalendar() {
  // 오늘 날짜
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false); // 월 선택기 열림 상태
  const [year, setYear] = useState(currentDate.getFullYear()); // 현재 년도

  // 날짜 클릭 핸들러
  const handleDateClick = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
  };

  // 월 변경 핸들러
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // 방향에 따라 월 변경
    setCurrentDate(newDate);
  };

  // 현재 월의 모든 날짜 생성
  const renderDays = () => {
    const days = [];
    const date = new Date(currentDate);
    date.setDate(1); // 현재 월의 첫 날로 설정

    // 현재 월의 모든 날짜 수 계산
    const monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // 1일의 요일을 계산
    const firstDayOfWeek = date.getDay();

    // 첫 번째 행 추가 (빈 칸 처리)
    let row = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      row.push(<td key={`empty-prev-${i}`}></td>);
    }

    // 현재 월의 모든 날짜 추가
    for (let day = 1; day <= monthDays; day++) {
      const formattedDay = String(day).padStart(2, '0');
      row.push(
        <td
          key={day}
          onClick={() => handleDateClick(day)} // 클릭 시 날짜 선택
          className={
            today.year == year && today.month - 1 == currentDate.getMonth() && today.date == day ? styles.today : ''
          }
        >
          {/* 포맷팅된 날짜 표시 */}
          <Text as="p" align="center" className={styles.date}>
            {formattedDay}
          </Text>
        </td>,
      );

      // 7일마다 새로운 행 추가
      if ((day + firstDayOfWeek) % 7 === 0) {
        days.push(
          <tr key={`row-${Math.floor((day + firstDayOfWeek) / 7)}`} className={styles.content_row}>
            {row}
          </tr>,
        );
        row = []; // 새로운 행을 위해 초기화
      }
    }

    let cnt = 7;
    // 마지막 행에 남은 날짜 추가
    if (row.length > 0) {
      days.push(
        <tr key={`row-last`} className={styles.content_row}>
          {row}
        </tr>,
      );
      for (let k = row.length; k < 7; k++) {
        row.push(<td key={`empty-next-${k}`}></td>);
      }
    }

    return days;
  };

  // 월 선택기 열림/닫힘 토글
  const toggleMonthPicker = () => {
    setIsMonthPickerOpen(!isMonthPickerOpen);
  };

  // 월 선택기 렌더링
  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, index) => (
      <li key={index}>
        <Flex
          justify="center"
          direction="column"
          className={`${today.year == year && today.month == index + 1 ? styles.active : ''} ${styles.month}`}
          onClick={() => {
            const newDate = new Date(year, index); // 선택한 월로 날짜 변경
            setCurrentDate(newDate);
            setIsMonthPickerOpen(false); // 월 선택기 닫기
          }}
        >
          <Text as="p" weight="medium">
            {index + 1}월
          </Text>
          <i></i>
        </Flex>
      </li>
    ));

    return (
      <Box className={styles.month_picker} p="2">
        <Flex justify="between" align="center" className={styles.year_list}>
          <button onClick={() => setYear(year - 1)}>
            <ChevronLeftIcon />
          </button>
          <Text as="p">{year}년</Text> {/* 현재 년도 표시 */}
          <button onClick={() => setYear(year + 1)}>
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
  };

  return (
    <div className={styles.full_calendar}>
      <Container size="3" p="3">
        <Box p="4" className={styles.container_inner}>
          <div className={styles.calendar_header}>
            <Flex justify="between">
              <button onClick={() => changeMonth(-1)} className={styles.arr}>
                <ArrowLeftIcon />
              </button>
              <Heading
                as="h2"
                onClick={toggleMonthPicker} // 클릭 시 월 선택기 열기
              >
                <button className={styles.btn_open_month_picker}>
                  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                </button>
              </Heading>
              <button onClick={() => changeMonth(1)} className={styles.arr}>
                <ArrowRightIcon />
              </button>
            </Flex>
            {/* 월 선택기 렌더링 */}
            {isMonthPickerOpen && renderMonthPicker()}
            {/* {renderMonthPicker()} */}
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
                  <td colSpan="7"></td>
                </tr>
                {renderDays()}
              </tbody>
            </table>
          </div>
        </Box>
      </Container>
    </div>
  );
}
