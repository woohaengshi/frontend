'use client';

// components/Timer.js
import React, { useState, useEffect } from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import styles from './Timer.module.css';
import { Text } from '@radix-ui/themes';

interface ITimer {
  maxTime: number;
}

const outerRadius = 46;
const innerRadius = 42;
const innerStroke = 2.5;

export default function Timer({ maxTime }: ITimer) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [loadTime, setLoadingTime] = useState(0);
  const loadingColor = '#8274EA';
  const completeColor = '#8274EA';

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
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const progress = (loadTime / maxTime) * 100;

  return (
    <div className={styles.container}>
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
        <Text size="9" className={`${styles.innerText} ${styles.responsiveText}`}>
          {formatTime(time)}
        </Text>
      </div>

      <Toggle.Root
        pressed={isActive}
        onPressedChange={handleToggle}
        className={`${styles.toggleButton} ${isActive && styles.active}`}
      >
        {isActive ? 'STOP' : 'START'}
      </Toggle.Root>
    </div>
  );
}
