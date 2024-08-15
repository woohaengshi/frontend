import { instance } from './instance';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await instance('sign-in', {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    method: 'POST',
  });
  return response;
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await instance('reissue', {
      body: JSON.stringify({ refreshToken }),
      method: 'POST',
    });
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error while posting timer:', error);
    throw error;
  }
};

export const signUp = async ({
  name,
  email,
  password,
  course,
}: {
  name: string;
  email: string;
  password: string;
  course: string;
}) => {
  const response = await instance('sign-up', {
    body: JSON.stringify({ name, email, password, course }),
    method: 'POST',
  });
  return response;
};
