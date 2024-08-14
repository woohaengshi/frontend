'use client';

import SubjectEdit from '@/components/study/SubjectEdit';
import { useState } from 'react';

const initialSubjects: string[] = ['html', 'css', 'javascript'];

export default function Page() {
  const [subjects, setSubjects] = useState<string[]>(initialSubjects);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddSubject = (subject: string) => {
    setSubjects([...subjects, subject]);
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToDelete));
  };

  const handleSaveEditing = () => {
    // 저장 로직을 여기에 추가할 수 있습니다.
    console.log('저장되었습니다.');
    setIsEditing(false);
  };

  return (
    <SubjectEdit
      subjects={subjects}
      onAddSubject={handleAddSubject}
      onDeleteSubject={handleDeleteSubject}
      onSaveEditing={handleSaveEditing}
      showCancelButton={false} // 취소 버튼 숨김
    />
  );
}
