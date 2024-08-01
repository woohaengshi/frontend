import { create } from 'zustand';

// 상태 타입 정의
interface StoreState {
  count: number;
  setCount: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));
