import { instance } from './instance';

// 비밀번호 업데이트
export const postPwUpdate = async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
  const response = await instance('members', {
    body: JSON.stringify({ oldPassword, newPassword }),
    method: 'POST',
  });
  return response;
};
