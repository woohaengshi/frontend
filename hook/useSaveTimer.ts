'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Subject } from '../types/studyType';
import { postTimer } from '@/api/studyApi';
import { getCurrentDate } from '@/utils/formatTimeUtils';

const useSaveTimer = (time: number, selectedSubjects: Subject[]) => {
  // 페이지 경로가 변경될 때 서버에 시간 저장
  const currentPath = usePathname();

  useEffect(() => {
    console.log('currentPath: ', currentPath); // 경로 확인

    if (!currentPath.startsWith('/study')) {
      console.log('saveTimer 호출');
      saveTimer(time, selectedSubjects);
    }
  }, [currentPath]);

  const saveTimer = async (time: number, subjects: Subject[]) => {
    const date = getCurrentDate();
    const subjectIds = subjects.map((subject) => subject.id);
    const response = await postTimer({ date, time, subjects: subjectIds });
    console.log(response);

    return response;
  };
};

export default useSaveTimer;
