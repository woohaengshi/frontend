import { instance } from './instance';

// 유저정보 조회
export const getUserInfo = async () => {
  const response = await instance(`members`, {
    method: 'GET',
  });

  return response;
};
