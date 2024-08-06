'use client';

// components/Timer.js
import React, { useState, useEffect } from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import styles from './Timer.module.css';
import { Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';

interface ITimer {
  maxTime: number;
}
const loadingColor = '#8274EA';
const completeColor = '#8274EA';

export default function Timer({ maxTime }: ITimer) {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [loadTime, setLoadingTime] = useState(0);

  const outerRadius = isMobile ? 45 : 51.7;
  const innerRadius = isMobile ? 40 : 49.2;
  const innerStroke = 2.5;

  useEffect(() => {
    let interval = undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        setLoadingTime((prevLoadingTime) => {
          if (prevLoadingTime >= maxTime) {
            return 0;
          }
          return prevLoadingTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, maxTime]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return time >= 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };

  const progress = (loadTime / maxTime) * 100;

  return (
    <div className={styles.container}>
      <Text as="p" className={styles.title} size={'4'} weight={'medium'} align={'center'}>
        다음 레벨업까지
        <br />
        <i>02:59:47</i>
      </Text>

      <div className={styles.relativeWrapper}>
        <div className={styles.svgContainer}>
          <svg className={styles.svg} viewBox="0 0 110 100">
            <circle cx="55" cy="50" r={outerRadius} stroke="#F0F0FE" strokeWidth="6.5" fill="none" />
            <circle cx="55" cy="50" r={innerRadius} stroke="#DBDBFF" strokeWidth={innerStroke} fill="none" />
            {(isActive || time > 0) && (
              <circle
                cx="55"
                cy="50"
                r={innerRadius}
                stroke={progress >= 100 ? completeColor : loadingColor}
                strokeWidth={innerStroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * (2 * Math.PI * innerRadius)} ${2 * Math.PI * innerRadius}`}
                className={styles.svgCircle}
                transform="rotate(-90 55 50)"
              />
            )}
          </svg>
        </div>

        <Flex
          align="center"
          justify="center"
          direction={'column'}
          position={'absolute'}
          inset={'0'}
          gap={'5px'}
          className={styles.timerWrapper}
        >
          {/* 시간 표시 */}
          <Text className={styles.time}>{formatTime(time)}</Text>

          {/* 시작/정지 토글 버튼 */}
          {!isMobile && (
            <Toggle.Root
              pressed={isActive}
              onPressedChange={handleToggle}
              className={`${styles.toggleButton} ${isActive && styles.active}`}
            >
              {isActive ? '정지' : '시작!'}
            </Toggle.Root>
          )}
        </Flex>
      </div>

      {isMobile && (
        <Toggle.Root
          pressed={isActive}
          onPressedChange={handleToggle}
          className={`${styles.toggleButton} ${isActive && styles.active}`}
        >
          {isActive ? '정지' : '시작!'}
        </Toggle.Root>
      )}
    </div>
  );
}
