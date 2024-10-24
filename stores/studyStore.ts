import { Subject } from '@/types/studyType';
import { create } from 'zustand';

interface SelectedSubjectState {
  selectedSubjects: Subject[];
  setSelectedSubjects: (selectedSubjects: Subject[]) => void;
}

const dummySubjects: Subject[] = [
  { id: 49, name: 'Java' },
  { id: 50, name: 'Java Script' },
  { id: 51, name: 'Database' },
];

export const useSelectedSubjectStore = create<SelectedSubjectState>((set) => ({
  selectedSubjects: dummySubjects,
  setSelectedSubjects: (selectedSubjects: Subject[]) => set({ selectedSubjects }),
}));
