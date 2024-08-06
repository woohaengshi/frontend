'use client';

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, FaceIcon } from '@radix-ui/react-icons';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import styles from './FullCalendar.module.css';
import MonthPicker from './MonthPicker';

export default function FullCalendar() {
  // 오늘 날짜
  const today = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);

  // 매월 시작일 index (0 ~ 6)
  const startDay = new Date(selectedYear, selectedMonth-1, 1).getDay();
  // 매월 말일 날짜 (30, 31)
  const endDate = new Date(selectedYear, selectedMonth, 0).getDate();

  const weekNumber = Math.ceil((startDay+endDate)/7);

  // 이전달 보기
  const prevMonth = useCallback(()=>{
    if(selectedMonth === 1){
      //작년 12월
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    }else{
      setSelectedMonth(selectedMonth - 1);
    }
  },[selectedMonth]);

  // 다음달 보기
  const nextMonth = useCallback(()=>{
    if(selectedMonth === 12){
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    }else{
      setSelectedMonth(selectedMonth + 1);
    }
  },[selectedMonth]);

  const returnDay = useCallback(()=>{
		let days=[];
    let daysArr=[];
		let keyCnt=0;
    // 실질적인 날짜
		let nowDate=0;
		let nowDay=0;

		for(let i=0; i < weekNumber; i++){
      // 새로운 행을 위해 초기화
      days=[];
			for(let j=0; j<7; j++){
				if(startDay <= nowDay && nowDate < endDate){
					nowDate++;
					days.push(
						<td key={`days${keyCnt+1}`} 
							className={today.year == selectedYear && today.month == selectedMonth && today.date == nowDate ? styles.today : ''}>
							{/* 포멧팅된 날짜 표시 */}
              <Text as="p" align="center" className={styles.date}>
                {nowDate}
              </Text>
						</td>
					)
					keyCnt++;
				}else{
					days.push(<td key={`days${keyCnt+1}`} className="blank"></td>);
					keyCnt++;
				}
				nowDay++;
			}
      // 7일마다 새로운 행 추가
      daysArr.push(<tr key={`weeks${keyCnt}`} className={styles.content_row}>{days}</tr>);
		}

		return daysArr;
	},[selectedYear,selectedMonth,endDate,startDay]);

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
            {isMonthPickerOpen && <MonthPicker today={today} selectedYear={selectedYear} onSelectYear={setSelectedYear} onSelectMonth={setSelectedMonth} onClose={()=>{toggleMonthPicker()}}/>}
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
                  {returnDay()}
                </tbody>
              </table>
            </div>
        </Box>
      </Container>
    </div>
  );
}
