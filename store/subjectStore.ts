// stores/subjectStore.ts
import { create } from 'zustand';

interface SubjectStoreState {
  subjects: string[];
  selectedSubjects: string[];
  isEditing: boolean;
  deletedSubjects: string[];
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
  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),
  deleteSubject: (subject) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s !== subject),
      selectedSubjects: state.selectedSubjects.filter((s) => s !== subject),
      deletedSubjects: [...state.deletedSubjects, subject],
    })),
  selectSubject: (subject) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subject)
        ? state.selectedSubjects.filter((s) => s !== subject)
        : [...state.selectedSubjects, subject],
    })),
  setEditing: (isEditing) => set({ isEditing }),
  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    set({ selectedSubjects: [] });
  },
  saveEditing: () => {
    const { deletedSubjects } = get();
    alert(`삭제한 과목은 ${deletedSubjects.join(', ')} 입니다`);
    set({ deletedSubjects: [], isEditing: false });
  },
  resetDeletedSubjects: () => set({ deletedSubjects: [] }),
}));
