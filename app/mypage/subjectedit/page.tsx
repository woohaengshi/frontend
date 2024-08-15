// Page.tsx
'use client';

import SubjectEdit from '@/components/study/SubjectEdit';
import { useSubjectStore } from '../../../store/subjectStore';

export default function Page() {
  // Zustand 스토어에서 상태와 액션 가져오기
  const { subjects, isEditing, setEditing, addSubject, deleteSubject, saveEditing } = useSubjectStore((state) => ({
    subjects: state.subjects,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
    addSubject: state.addSubject,
    deleteSubject: state.deleteSubject,
    saveEditing: state.saveEditing,
  }));

  const customStyle = {
    height: '400px',
  };

  const subjectChoiceBoxStyle = {
    maxHeight: '200px', // 원하는 높이 설정
  };

  return (
    <SubjectEdit
      subjects={subjects}
      onAddSubject={addSubject}
      onDeleteSubject={deleteSubject}
      onSaveEditing={() => {
        saveEditing();
        setEditing(false); // 편집 후 상태를 false로 설정
      }}
      showCancelButton={false} // 취소 버튼 숨김
      style={customStyle} // 스타일 전달
      subjectChoiceBoxStyle={subjectChoiceBoxStyle}
    />
  );
}
