import { create } from 'zustand';

// 오늘 날짜
interface TodayStoreState {
  startDate: string;
  setStartDate: (startDate: string) => void;
}

export const useTimerStore = create<TodayStoreState>(() => ({
  startDate: '',
  setStartDate: (startDate: string) => ({ startDate }),
}));
