import { create } from 'zustand';

interface loginState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const useLoginStore = create<loginState>((set) => ({
  email: '',
  password: '',
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
}));

interface joinState {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
}

export const useJoinStore = create<joinState>((set) => ({
  email: '',
  name: '',
  password: '',
  passwordCheck: '',
  setEmail: (email: string) => set({ email }),
  setName: (name: string) => set({ name }),
  setPassword: (password: string) => set({ password }),
  setPasswordCheck: (passwordCheck: string) => set({ passwordCheck }),
}));
