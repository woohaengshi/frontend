import instance from './instance';

// 타이머 조회
export const signIn = async ({ email, password }: { email: string; password: string }) => {
  // try {
  const response = await instance.post('sign-in', {
    body: JSON.stringify({ email, password }),
  });
  return response;
  // } catch (error) {
  //   // Handle the error here
  //   console.error('Error while fetching timers:', error);
  //   throw error;
  // }
};

// 타이머 기록
export const postTimer = async ({ time, subjects }: { time: number; subjects: string[] }) => {
  try {
    const response = await instance.post('timers', {
      body: JSON.stringify({ time, subjects }),
    });
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error while posting timer:', error);
    throw error;
  }
};
