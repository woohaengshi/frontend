// stores/subjectStore.ts
import { create } from 'zustand';

// Define the type for a subject
interface Subject {
  id: number;
  name: string;
}

interface SubjectStoreState {
  subjects: Subject[];
  selectedSubjects: string[];
  addedSubjects: string[];
  isEditing: boolean;
  deletedSubjects: number[];
  addSubject: (subject: Subject) => void;
  deleteSubject: (subjectId: number) => void;
  selectSubject: (subjectName: string) => void;
  setEditing: (isEditing: boolean) => void;
  saveSelected: () => void;
  saveEditing: () => void;
  resetDeletedSubjects: () => void;
  resetAddedSubjects: () => void;
}

export const useSubjectStore = create<SubjectStoreState>((set, get) => ({
  subjects: [
    { id: 1, name: 'html' },
    { id: 2, name: 'css' },
    { id: 3, name: 'javascript' },
  ],
  selectedSubjects: [],
  addedSubjects: [],
  isEditing: false,
  deletedSubjects: [],

  // 과목 추가
  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
      addedSubjects: [...state.addedSubjects, subject.name],
    })),

  // 과목 삭제
  deleteSubject: (subjectId) =>
    set((state) => {
      const subjectIndex = state.subjects.findIndex((s) => s.id === subjectId);
      return {
        subjects: state.subjects.filter((s) => s.id !== subjectId),
        selectedSubjects: state.selectedSubjects.filter((s) => s !== state.subjects[subjectIndex]?.name),
        deletedSubjects: subjectIndex !== -1 ? [...state.deletedSubjects, subjectId] : state.deletedSubjects,
      };
    }),

  // 선택한 과목
  selectSubject: (subjectName) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subjectName)
        ? state.selectedSubjects.filter((s) => s !== subjectName)
        : [...state.selectedSubjects, subjectName],
    })),

  // 선택한 과목 저장
  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    set({ selectedSubjects: [] });
  },


  // 과목 편집
  setEditing: (isEditing) => set({ isEditing }),

  // 편집된 과목 저장
  saveEditing: () => {
    const { deletedSubjects, addedSubjects } = get();
    alert(`삭제한 과목 ID는 ${deletedSubjects.join(', ')} 입니다\n추가된 과목은 ${addedSubjects.join(', ')} 입니다`);
    set({ deletedSubjects: [], addedSubjects: [], isEditing: false });
  },

  // 삭제된 과목 리셋
  resetDeletedSubjects: () => set({ deletedSubjects: [] }),

  // 추가한 과목 리셋
  resetAddedSubjects: () => set({ addedSubjects: [] }),
}));
