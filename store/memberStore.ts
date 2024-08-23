import { create } from 'zustand';

// 유저정보 조회
interface IuserInfo {
  name: string;
  course: string;
}

interface UserInfoState {
  userInfo: IuserInfo | null;
  setUserInfo: (userInfo: IuserInfo | null) => void;
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: IuserInfo | null) => set({ userInfo }),
}));

// 비밀번호 수정
interface PwUpdateState {
  oldPassword: string;
  newPassword: string;
  checkPassword: string;
  setOldPassword: (oldPassword: string) => void;
  setNewPassword: (newPassword: string) => void;
  setCheckPassword: (checkPassword: string) => void;
  setAllEmpty: () => void;
}

export const usePwUpdateStore = create<PwUpdateState>((set) => ({
  oldPassword: '',
  newPassword: '',
  checkPassword: '',
  setOldPassword: (oldPassword: string) => set({ oldPassword }),
  setNewPassword: (newPassword: string) => set({ newPassword }),
  setCheckPassword: (checkPassword: string) => set({ checkPassword }),
  setAllEmpty: () => set({ oldPassword: '', newPassword: '', checkPassword: '' }),
}));
