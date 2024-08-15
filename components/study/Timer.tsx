'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
import { Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import TimerToggleBtn from './TimerToggleBtn';
import { useSelectedSubjectStore } from '@/store/studyStore';
import { postTimer } from '@/api/study';
import { Subject } from '@/types/study';

// 추후 리팩토링
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate() - 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

interface ITimer {
  maxTime: number;
  currentTime: number;
}

const loadingColor = '#8274EA';
const innerStroke = 2.5;

const formatTime = (time: number) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return time >= 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export default function Timer({ maxTime, currentTime }: ITimer) {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const { selectedSubjects } = useSelectedSubjectStore();
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(currentTime); // 초 단위
  const [progress, setProgress] = useState((currentTime / maxTime) * 100);
  const [remainingTime, setRemainingTime] = useState(maxTime - (currentTime % maxTime));

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const outerRadius = isMobile ? 45 : 51.7;
  const innerRadius = isMobile ? 41 : 49.2;

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
  }, [isActive, maxTime]);

  const handleTimer = async (time: number, subjects: Subject[]) => {
    const date = getCurrentDate();
    const subjectIds = subjects.map((subject) => subject.id);
    const response = await postTimer({ date, time, subjects: subjectIds });

    console.log(date, time, subjectIds);

    if (response.error) {
      alert(response.error.message);
    } else {
      alert('기록이 저장되었습니다.');
    }
  };

  const handleToggle = () => {
    setIsActive((prev) => !prev);

    if (isActive) {
      handleTimer(time, selectedSubjects);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <div className={styles.container}>
        <Text as="p" className={styles.title} size="4" weight="medium" align="center">
          다음 레벨업까지
        </Text>
        <Text as="p" className={styles.remaining_time} size="4" weight="medium" align="center">
          {remainingTime > 0 ? formatTime(remainingTime) : formatTime(maxTime)}
        </Text>

        <div className={styles.relative_wrapper}>
          <div className={styles.svg_container}>
            <svg className={styles.svg} viewBox="0 0 110 100">
              <circle cx="55" cy="50" r={outerRadius} stroke="#F0F0FE" strokeWidth="6.5" fill="none" />
              <circle cx="55" cy="50" r={innerRadius} stroke="#DBDBFF" strokeWidth={innerStroke} fill="none" />
              {(isActive || time > 0) && (
                <circle
                  cx="55"
                  cy="50"
                  r={innerRadius}
                  stroke={loadingColor}
                  strokeWidth={innerStroke}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * innerRadius} // circumference
                  strokeDashoffset={2 * Math.PI * innerRadius * (1 - progress / 100)} // circumference * (1 - progress)
                  className={styles.svg_circle}
                  transform="rotate(-90 55 50)"
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
        </div>
      </div>

      {/* 공부중인 과목 리스트 */}
      <Flex
        justify="center"
        align="center"
        mb="60px"
        mt={isMobile ? '0px' : '38px'}
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
