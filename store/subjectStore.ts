import { create } from 'zustand';

interface Subject {
  id: number;
  name: string;
}

interface SubjectStoreState {
  subjects: Subject[];
  initialSelectedSubjects: string[];
  initialSubjects: Subject[];
  selectedSubjects: string[];
  addedSubjects: string[];
  isEditing: boolean;
  deletedSubjects: number[];
  setInitialSubjects: () => void;
  addSubject: (subject: Subject) => void;
  deleteSubject: (subjectId: number) => void;
  selectSubject: (subjectName: string) => void;
  setEditing: (isEditing: boolean) => void;
  saveSelected: () => void;
  saveEditing: () => void;
  resetDeletedSubjects: () => void;
  resetAddedSubjects: () => void;
  revertChanges: () => void;
  setSubjects: (subjects: Subject[]) => void;
}

export const useSubjectStore = create<SubjectStoreState>((set, get) => ({
  subjects: [],
  initialSubjects: [],
  selectedSubjects: [],
  addedSubjects: [],
  initialSelectedSubjects: [],
  isEditing: false,
  deletedSubjects: [],

  setInitialSubjects: () => set({ initialSubjects: get().subjects, initialSelectedSubjects: get().selectedSubjects }),

  revertChanges: () =>
    set((state) => ({
      subjects: state.initialSubjects,
      selectedSubjects: state.initialSelectedSubjects,
      addedSubjects: [],
      deletedSubjects: [],
    })),

  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
      addedSubjects: [...state.addedSubjects, subject.name],
    })),

  deleteSubject: (subjectId) =>
    set((state) => {
      const subjectIndex = state.subjects.findIndex((s) => s.id === subjectId);
      return {
        subjects: state.subjects.filter((s) => s.id !== subjectId),
        selectedSubjects: state.selectedSubjects.filter((s) => s !== state.subjects[subjectIndex]?.name),
        deletedSubjects: subjectIndex !== -1 ? [...state.deletedSubjects, subjectId] : state.deletedSubjects,
      };
    }),

  selectSubject: (subjectName) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subjectName)
        ? state.selectedSubjects.filter((s) => s !== subjectName)
        : [...state.selectedSubjects, subjectName],
    })),

  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
  },

  setEditing: (isEditing) => set({ isEditing }),

  saveEditing: () => {
    set({ deletedSubjects: [], addedSubjects: [], isEditing: false });
  },

  resetDeletedSubjects: () => set({ deletedSubjects: [] }),

  resetAddedSubjects: () => set({ addedSubjects: [] }),

  setSubjects: (subjects) => set({ subjects }),
}));
