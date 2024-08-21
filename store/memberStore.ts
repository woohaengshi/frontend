import { create } from 'zustand';

interface PwUpdateState {
  oldPassword: string;
  newPassword: string;
  checkPassword: string;
  setOldPassword: (oldPassword: string) => void;
  setNewPassword: (newPassword: string) => void;
  setCheckPassword: (newPassword: string) => void;
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
