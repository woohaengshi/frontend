'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import TimerToggleBtn from './TimerToggleBtn';
import leftBtn from '../../assets/icons/left_btn.png';
import rightBtn from '../../assets/icons/right_btn.png';
import Image from 'next/image';

interface ITimer {
  maxTime: number;
}

const subjects = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'];

const loadingColor = '#8274EA';

const formatTime = (time: number) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return time >= 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export default function Timer({ maxTime }: ITimer) {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0); // 초 단위
  const [progress, setProgress] = useState(0); // 진행률
  const [remainingTime, setRemainingTime] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const outerRadius = isMobile ? 45 : 51.7;
  const innerRadius = isMobile ? 40 : 49.2;
  const innerStroke = 2.5;

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

  const handleToggle = () => setIsActive((prev) => !prev);

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
        mt={isMobile ? '0px' : '-32px'}
        width={isMobile ? '90%' : '80%'}
        wrap="wrap"
        height="auto"
      >
        {subjects.slice(0, 5).map((subject, index) => (
          <div key={index} className={styles.subject_item}>
            <Text as="p" size={isMobile ? '2' : '3'} className={styles.subject_item_text}>
              # {subject}
            </Text>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
