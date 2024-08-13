import instance from './instance';

// 타이머 조회
export const getTimer = async () => {
  try {
    const response = await instance.get('/hot'); // 임시로 hot으로 설정
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error while fetching timers:', error);
    throw error;
  }
};

// 타이머 기록
export const postTimer = async ({ time, subjects }: { time: number; subjects: string[] }) => {
  try {
    const response = await instance.post('/timers', {
      body: JSON.stringify({ time, subjects }),
    });
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error while posting timer:', error);
    throw error;
  }
};
