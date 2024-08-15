import instance from './instance';

// 캘린더 월간 조회
export const getRecordMonthly = async (year: number, month: number | String) => {
  if (typeof month === 'number') {
    month = month < 10 ? `0${month}` : `${month}`;
  }

  try {
    // const response = await instance.get(`study-record/monthly?date=${year}-${month}`);
    // return response;
  } catch (error) {
    console.error('Error while fetching getRecordMonthly():', error);
    throw error;
  }
};

// 캘린더 연간 조회
export const getRecordYearly = async (year: string) => {
  try {
    const response = await instance.get(`study-record/yearly?year=${year}`);
    return response;
  } catch (error) {
    console.error('Error while fetching getRecordYearly():', error);
    throw error;
  }
};
