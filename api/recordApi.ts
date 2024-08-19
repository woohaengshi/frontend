import { instance } from './instance';

// 캘린더 월간 조회
export const getRecordMonthly = async (year: number, month: number | String) => {
  if (typeof month === 'number') {
    month = month < 10 ? `0${month}` : `${month}`;
  }

  const response = await instance(`study-record/monthly?date=${year}-${month}`, {
    method: 'GET',
  });

  return response;
};

// 캘린더 연간 조회
export const getRecordYearly = async (year: number) => {
  const response = await instance(`study-record/yearly?year=${year}`, {
    method: 'GET',
  });

  return response;
};
