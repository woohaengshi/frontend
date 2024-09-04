'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
import { Flex, Text, Box } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import TimerToggleBtn from './TimerToggleBtn';
import { Subject } from '@/types/studyType';
import { formatTime, getCurrentDate } from '@/utils/formatTimeUtils';
import { useSubjectStore } from '@/store/subjectStore';
import Cookies from 'js-cookie';
import { postTimer } from '@/api/studyApi';
import { useUserInfoStore } from '@/store/memberStore';
import useSWR from 'swr';
import { getUserInfo } from '@/api/memberApi';

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

  // 유저정보조회
  const accessToken = Cookies.get('access_token');
  const { setUserInfo } = useUserInfoStore();
  const { data } = useSWR(accessToken ? ['userInfo'] : null, async () => {
    const result = await getUserInfo();
    const storedUserInfo = { name: result.name, course: result.course, image: result.image };
    localStorage.setItem('userInfo', JSON.stringify(storedUserInfo));
    setUserInfo(storedUserInfo);
  });

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastSaveDateRef = useRef<string | null>(null); // 마지막 저장 날짜 -> 중복 저장 방지

  const svgSize = 110;
  const centerPoint = svgSize / 2;
  const strokeWidth = 2.5;
  const radius = svgSize / 2 - strokeWidth / 2;

  const saveTimer = async (time: number, subjects: Subject[]) => {
    const date = getCurrentDate();
    const subjectIds = subjects.map((subject) => subject.id);
    const response = await postTimer({ date, time, subjects: subjectIds });

    return response;
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" align="center" justify="center">
      <Box px="5" className={styles.container}>
        <Text as="p" className={styles.title} size="4" weight="medium" align="center">
          다음 레벨업까지
        </Text>
        <Text as="p" className={styles.remaining_time} size="4" weight="medium" align="center">
          {remainingTime > 0 ? formatTime(remainingTime) : formatTime(maxTime)}
        </Text>

        <Box mt={isMobile ? '25px' : '45px'} className={styles.relative_wrapper}>
          <div className={styles.svg_container}>
            <svg
              className={styles.svg}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              width={isMobile ? '90px' : '103.4px'}
              height={isMobile ? '90px' : '103.4px'}
            >
              <circle
                cx={centerPoint}
                cy={centerPoint}
                r={radius}
                stroke="#F0F0FE"
                strokeWidth={strokeWidth * 2.6}
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
            gap="5px"
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
        mb="60px"
        mt={isMobile ? '25px' : '45px'}
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
