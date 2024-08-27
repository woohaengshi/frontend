import { create } from 'zustand';

interface joinState {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
  course: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setCourse: (course: string) => void;
  setAllEmpty: () => void;
}

export const useJoinStore = create<joinState>((set) => ({
  email: '',
  name: '',
  password: '',
  passwordCheck: '',
  course: '',
  setEmail: (email: string) => set({ email }),
  setName: (name: string) => set({ name }),
  setPassword: (password: string) => set({ password }),
  setPasswordCheck: (passwordCheck: string) => set({ passwordCheck }),
  setCourse: (course: string) => set({ course }),
  setAllEmpty: () => set({ email: '', name: '', password: '', passwordCheck: '', course: '' }),
}));
