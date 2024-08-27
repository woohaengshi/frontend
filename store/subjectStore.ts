import { create } from 'zustand';
import Cookies from 'js-cookie';

interface Subject {
  id: number;
  name: string;
}

interface SubjectStoreState {
  subjects: Subject[];
  initialSelectedSubjects: Subject[];
  initialSubjects: Subject[];
  selectedSubjects: Subject[];
  addedSubjects: Subject[];
  isEditing: boolean;
  deletedSubjects: Subject[];
  setInitialSubjects: () => void;
  addSubject: (subject: Subject) => void;
  deleteSubject: (subjectId: number) => void;
  selectSubject: (subject: Subject) => void;
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

  // 과목 추가
  addSubject: (subject: Subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
      addedSubjects: [...state.addedSubjects, subject],
    })),

  // 과목 삭제
  deleteSubject: (subjectId) =>
    set((state) => {
      const subjectIndex = state.subjects.findIndex((s) => s.id === subjectId);
      const subjectToDelete = state.subjects.find((s) => s.id === subjectId);

      // 추가된 과목인지 확인
      const isAddedSubject = state.addedSubjects.some((subject) => subject.id === subjectId);

      // 만약 추가된 과목이라면, 삭제 목록에 포함시키지 않고, 단순히 addedSubjects에서 제거
      const newAddedSubjects = isAddedSubject
        ? state.addedSubjects.filter((subject) => subject.id !== subjectId)
        : state.addedSubjects;

      return {
        subjects: state.subjects.filter((s) => s.id !== subjectId),
        selectedSubjects: state.selectedSubjects.filter((s) => s.id !== subjectId),
        deletedSubjects:
          !isAddedSubject && subjectIndex !== -1 && subjectToDelete
            ? [...state.deletedSubjects, subjectToDelete]
            : state.deletedSubjects,
        addedSubjects: newAddedSubjects,
      };
    }),

  // 선택한과목
  selectSubject: (subject) => {
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subject)
        ? state.selectedSubjects.filter((s) => s.id !== subject.id)
        : [...state.selectedSubjects, subject],
    }));
    Cookies.set('selectedSubjects', JSON.stringify(get().selectedSubjects));
  },

  // 선택한과목 배열 저장
  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.map((s) => s.name).join(', ')}`);
  },

  setEditing: (isEditing) => set({ isEditing }),

  saveEditing: () => {
    set({ deletedSubjects: [], addedSubjects: [], isEditing: false });
  },

  resetDeletedSubjects: () => set({ deletedSubjects: [] }),

  resetAddedSubjects: () => set({ addedSubjects: [] }),

  setSubjects: (subjects) => set({ subjects }),
}));
