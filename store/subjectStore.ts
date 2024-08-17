// stores/subjectStore.ts
import { create } from 'zustand';

interface SubjectStoreState {
  subjects: string[];
  selectedSubjects: string[];
  isEditing: boolean;
  deletedSubjects: number[];
  addSubject: (subject: string) => void;
  deleteSubject: (subject: string) => void;
  selectSubject: (subject: string) => void;
  setEditing: (isEditing: boolean) => void;
  saveSelected: () => void;
  saveEditing: () => void;
  resetDeletedSubjects: () => void;
}

export const useSubjectStore = create<SubjectStoreState>((set, get) => ({
  subjects: ['html', 'css', 'javascript'],
  selectedSubjects: [],
  isEditing: false,
  deletedSubjects: [],

  // 과목 추가
  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),

  // 과목 삭제
  deleteSubject: (subject) =>
    set((state) => {
      const subjectIndex = state.subjects.indexOf(subject);
      return {
        subjects: state.subjects.filter((s) => s !== subject),
        selectedSubjects: state.selectedSubjects.filter((s) => s !== subject),
        deletedSubjects: subjectIndex !== -1 ? [...state.deletedSubjects, subjectIndex] : state.deletedSubjects,
      };
    }),

  // 과목 선택
  selectSubject: (subject) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subject)
        ? state.selectedSubjects.filter((s) => s !== subject)
        : [...state.selectedSubjects, subject],
    })),

  // 과목 편집
  setEditing: (isEditing) => set({ isEditing }),

  // 과목 선택 저장
  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    set({ selectedSubjects: [] });
  },

  // 과목 편집 저장
  saveEditing: () => {
    const { deletedSubjects } = get();
    alert(`삭제한 과목은 ${deletedSubjects.join(', ')} 입니다`);
    set({ deletedSubjects: [], isEditing: false });
  },

  // 삭제한 과목 리셋
  resetDeletedSubjects: () => set({ deletedSubjects: [] }),
}));
