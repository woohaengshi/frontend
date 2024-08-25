import { create } from 'zustand';

// Subject 타입 정의
interface Subject {
  id: number;
  name: string;
}

// 공통
interface CommonStoreState {
  setSubjects: (subjects: Subject[]) => void;
  setInitialSubjects: () => void;
  setEditing: (isEditing: boolean) => void;
  subjects: Subject[];
  initialSubjects: Subject[];
  initialSelectedSubjects: Subject[];
  selectedSubjects: Subject[];
  isEditing: boolean;
  addedSubjects: Subject[];
  deletedSubjects: Subject[];
}

// 공통
const createCommonStore = (set: any, get: any): CommonStoreState => ({
  subjects: [],
  initialSubjects: [],
  initialSelectedSubjects: [],
  selectedSubjects: [],
  addedSubjects: [],
  deletedSubjects: [],
  isEditing: false,

  setSubjects: (subjects) => set({ subjects }),

  setInitialSubjects: () =>
    set({
      initialSubjects: get().subjects,
      initialSelectedSubjects: get().selectedSubjects,
    }),

  setEditing: (isEditing) => set({ isEditing }),
});

// 추가 기능
interface AddStoreState extends CommonStoreState {
  addSubject: (subject: Subject) => void;
  resetAddedSubjects: () => void;
}

export const useAddStore = create<AddStoreState>((set, get) => ({
  ...createCommonStore(set, get),

  addedSubjects: [],

  addSubject: (subject: Subject) =>
    set((state) => ({
      addedSubjects: [...state.addedSubjects, subject],
      subjects: [...state.subjects, subject],
    })),

  resetAddedSubjects: () => set({ addedSubjects: [] }),
}));

// 삭제 기능
interface DeleteStoreState extends CommonStoreState {
  deleteSubject: (subjectId: number) => void;
  resetDeletedSubjects: () => void;
}

export const useDeleteStore = create<DeleteStoreState>((set, get) => ({
  ...createCommonStore(set, get),

  deletedSubjects: [],
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

  resetDeletedSubjects: () => set({ deletedSubjects: [] }),
}));

// 저장 기능
interface SaveStoreState extends CommonStoreState {
  saveSelected: () => void;
  saveEditing: () => void;
}

export const useSaveStore = create<SaveStoreState>((set, get) => ({
  ...createCommonStore(set, get),

  saveSelected: () => {
    const { selectedSubjects } = get();
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.map((s) => s.name).join(', ')}`);
  },

  saveEditing: () => {
    set({ deletedSubjects: [], addedSubjects: [], isEditing: false });
  },
}));

// 선택 관련 기능
interface SelectStoreState extends CommonStoreState {
  selectSubject: (subject: Subject) => void;
}

export const useSelectStore = create<SelectStoreState>((set, get) => ({
  ...createCommonStore(set, get),

  selectSubject: (subject: Subject) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subject)
        ? state.selectedSubjects.filter((s) => s.id !== subject.id)
        : [...state.selectedSubjects, subject],
    })),
}));

// 리셋 기능
interface ResetStoreState extends CommonStoreState {
  revertChanges: () => void;
}

export const useResetStore = create<ResetStoreState>((set, get) => ({
  ...createCommonStore(set, get),

  revertChanges: () =>
    set((state) => ({
      subjects: state.initialSubjects,
      selectedSubjects: state.initialSelectedSubjects,
      addedSubjects: [],
      deletedSubjects: [],
    })),
}));
