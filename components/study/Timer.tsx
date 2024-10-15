'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Timer.module.css';
import { Flex, Text, Box } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import TimerToggleBtn from './TimerToggleBtn';
import { Subject } from '@/types/studyType';
import { formatTime, getCurrentDate } from '@/utils/formatTimeUtils';
import { useSubjectStore } from '@/store/subjectStore';
import Cookies from 'js-cookie';
import { postTimer } from '@/apis/studyApi';
import { useRouter } from 'next/navigation';

interface ITimer {
  maxTime: number;
  currentTime: number;
  initialSubjects: Subject[];
}

const loadingColor = '#8274EA';

export default function Timer({ maxTime, currentTime, initialSubjects }: ITimer) {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const { selectedSubjects, selectSubject } = useSubjectStore();
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(currentTime); // 초 단위
  const [progress, setProgress] = useState((currentTime / maxTime) * 100);
  const [remainingTime, setRemainingTime] = useState(maxTime - (currentTime % maxTime));

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastSaveDateRef = useRef<string | null>(null); // 마지막 저장 날짜 -> 중복 저장 방지

  const svgSize = 110;
  const centerPoint = svgSize / 2;
  const strokeWidth = 2.5;
  const radius = svgSize / 2 - strokeWidth / 2;

  const router = useRouter();

  const saveTimer = async (time: number, subjects: Subject[]) => {
    const date = getCurrentDate();
    const subjectIds = subjects.map((subject) => subject.id);
    const response = await postTimer({ date, time, subjects: subjectIds });

    return response;
  };

  // 브라우저 닫힘 이벤트 처리
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 기본 알림 메시지를 설정합니다.
      event.preventDefault();
      event.returnValue = '정말로 페이지를 떠나시겠습니까?'; // 보안상 커스텀한 메시지로 알림불가
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //10분마다 자동 저장
  useEffect(() => {
    let timeAutoSave: NodeJS.Timeout;

    if (isActive) {
      timeAutoSave = setInterval(() => {
        // 현재 누적 시간 가져오기
        const time = Math.floor((Date.now() - startTimeRef.current!) / 1000);
        saveTimer(time, selectedSubjects);
      }, 600000);
    }

    return () => {
      clearInterval(timeAutoSave);
    };
  }, [isActive, selectedSubjects]);

  const handleTimer = async (time: number, subjects: Subject[]) => {
    const response = await saveTimer(time, subjects);

    if (response!.error) {
      alert(response!.error.message);
    } else {
      alert('기록이 저장되었습니다.');
    }
  };

  const checkAndSaveAt5AM = () => {
    const now = new Date();
    const currentDate = now.toDateString();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 5 && (minutes === 0 || minutes === 1) && currentDate !== lastSaveDateRef.current) {
      const currentTimeInSeconds = Math.floor((Date.now() - startTimeRef.current!) / 1000);

      handleTimer(currentTimeInSeconds, selectedSubjects);
      lastSaveDateRef.current = currentDate;

      setTime(0);
      setProgress(0);
      startTimeRef.current = Date.now();

      console.log('Saved at 5AM');
      alert('새로운 날이 시작되었습니다. 기록이 저장되었습니다.');
    }
  };

  const handleToggle = () => {
    setIsActive((prev) => !prev);

    if (isActive) {
      handleTimer(time, selectedSubjects);
    }
  };

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - time * 1000;

      const animate = () => {
        const now = Date.now(); // 현재 시간
        const elapsedTime = (now - startTimeRef.current!) / 1000; // 경과 시간
        const newTime = Math.floor(elapsedTime); // 소수점 버림
        const newProgress = ((elapsedTime % maxTime) / maxTime) * 100; // 진행률

        setTime(newTime);
        setProgress(newProgress);
        setRemainingTime(maxTime - (newTime % maxTime));

        if (newTime % 30 === 0) {
          // 30초마다 체크
          checkAndSaveAt5AM();
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, maxTime, time]);

  const flag = useRef(false);

  // 첫 렌더링 시 쿠키에서 선택 과목 값 가져오기
  useEffect(() => {
    if (selectedSubjects.length === 0 && !flag.current) {
      const cookieValue = Cookies.get('selectedSubjects') || '[]'; // 쿠키에서 값 가져오기
      const parsedCookieValue = JSON.parse(cookieValue);
      if (parsedCookieValue.length > 0 && parsedCookieValue[0].id !== 0) {
        parsedCookieValue.forEach((subject: Subject) => {
          if (initialSubjects.findIndex((initialSubject) => initialSubject.id === subject.id) === -1) {
            return;
          }
          selectSubject(subject);
          flag.current = true;
        });
      }
    }
  }, []);

  return (
    <Flex direction="column" align="center" justify="center">
      <Box pt={isMobile ? '20px' : '35px'} className={styles.title_wrap}>
        <Text as="p" className={styles.title} size="3" weight="medium" align="center">
          다음 레벨업까지
        </Text>
        <Text as="p" className={styles.remaining_time} size="3" weight="medium" align="center">
          {remainingTime > 0 ? formatTime(remainingTime) : formatTime(maxTime)}
        </Text>
      </Box>
      <Box px="9" className={styles.container}>
        <Box mt={isMobile ? '35px' : '40px'} className={styles.relative_wrapper}>
          <div className={styles.svg_container}>
            <svg
              className={styles.svg}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              width={isMobile ? '90px' : '100px'}
              height={isMobile ? '90px' : '100px'}
            >
              <circle
                cx={centerPoint}
                cy={centerPoint}
                r={radius}
                stroke="#F0F0FE"
                strokeWidth={strokeWidth * 3}
                fill="none"
              />
              <circle
                cx={centerPoint}
                cy={centerPoint}
                r={radius - 2}
                stroke="#DBDBFF"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {(isActive || time > 0) && (
                <circle
                  cx={centerPoint}
                  cy={centerPoint}
                  r={radius - 2}
                  stroke={loadingColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * radius}
                  strokeDashoffset={2 * Math.PI * radius * (1 - progress / 100)}
                  className={styles.svg_circle}
                  transform={`rotate(-90 ${centerPoint} ${centerPoint})`}
                />
              )}
            </svg>
          </div>

          <Flex
            align="center"
            justify="center"
            direction="column"
            position="absolute"
            inset="0"
            gap={isMobile ? '15px' : '10px'}
            className={styles.timer_wrapper}
          >
            <Text className={styles.time}>{formatTime(time)}</Text>

            <TimerToggleBtn isActive={isActive} onToggle={handleToggle} />
          </Flex>
        </Box>
      </Box>
      {/* 공부중인 과목 리스트 */}
      <Flex
        justify="center"
        align="center"
        mb="20px"
        mt={isMobile ? '30px' : '20px'}
        width={isMobile ? '90%' : '80%'}
        wrap="wrap"
        height="auto"
      >
        {selectedSubjects.map((subject, index) => (
          <div key={index} className={styles.subject_item}>
            <Text as="p" size={isMobile ? '2' : '3'} className={styles.subject_item_text}>
              # {subject.name}
            </Text>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
