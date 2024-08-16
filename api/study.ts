'use server';

import { revalidatePath } from 'next/cache';
import { instance } from './instance';

// 타이머 조회
export const getTimer = async () => {
  const response = await instance('timer', {
    method: 'GET',
  });
  return response;
};

// 타이머 기록
export const postTimer = async ({ date, time, subjects }: { date: string; time: number; subjects: number[] }) => {
  const response = await instance('study-record', {
    body: JSON.stringify({ date, time, subjects }),
    method: 'POST',
  });
  revalidatePath('/study');
  return response;
};
