import { create } from 'zustand';

// 오늘 날짜
interface TodayStoreState {
  year: number;
  month: number;
  date: number;
  day: number;
}

export const useTodayStore = create<TodayStoreState>(() => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  day: new Date().getDay(),
}));

// 월간 달력에서 선택한 연도
interface SelectedYearStoreState {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const useSelectedYearStore = create<SelectedYearStoreState>((set) => ({
  selectedYear: new Date().getFullYear(),
  setSelectedYear: (year: number) => set({ selectedYear: year }),
}));

// 월간 달력에서 선택한 달
interface SelectedMonthStoreState {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export const useSelectedMonthStore = create<SelectedMonthStoreState>((set) => ({
  selectedMonth: new Date().getMonth() + 1,
  setSelectedMonth: (month: number) => set({ selectedMonth: month }),
}));

// 연간 달력에서 선택한 연도
interface PickYearStoreState {
  pickYear: number;
  setPickYear: (year: number) => void;
}

export const usePickYearStore = create<PickYearStoreState>((set) => ({
  pickYear: new Date().getFullYear(),
  setPickYear: (year: number) => set({ pickYear: year }),
}));

// csr에서 인터렉션 발생시에만 데이터 패치 되도록 하는 boolean state
interface FetchStoreState {
  shouldFetch: boolean;
  setShouldFetch: (shouldFetch: boolean) => void;
}

export const useFetchStore = create<FetchStoreState>((set) => ({
  shouldFetch: false,
  setShouldFetch: (shouldFetch: boolean) => set({ shouldFetch }),
}));

// 모달에서 변경값 감지
interface EventStoreState {
  eventChange: boolean;
  setEventChange: (eventChange: boolean) => void;
}

export const useEventStore = create<EventStoreState>((set) => ({
  eventChange: false,
  setEventChange: (eventChange: boolean) => set({ eventChange }),
}));

// 회고 textarea value 유지
interface TextareaStoreState {
  textValue: string;
  setTextValue: (textValue: string) => void;
}
export const useTextareaStore = create<TextareaStoreState>((set) => ({
  textValue: '',
  setTextValue: (textValue: string) => set({ textValue }),
}));
