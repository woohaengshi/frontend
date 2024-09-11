'use server';

import { instance } from './instance';

interface SubjectPayload {
  addedSubjects: string[]; // 추가된 과목 리스트 (과목 이름)
  deletedSubjects: number[]; // 삭제된 과목 리스트 (과목 ID)
}

// 삭제한 과목 id, 추가된 과목명 보내기
export const postSubjectItem = async (payload: SubjectPayload) => {
  const requestBody: { addedSubjects: string[]; deletedSubjects: number[] } = {
    addedSubjects: [], // 기본값으로 빈 배열
    deletedSubjects: [], // 기본값으로 빈 배열
  };

  // 추가된 과목이 있으면 requestBody에 추가, 빈 배열일 때는 빈 배열만 전송
  if (payload.addedSubjects.length >= 0) {
    requestBody.addedSubjects = payload.addedSubjects;
  }

  // 삭제된 과목이 있으면 requestBody에 추가, 빈 배열일 때는 빈 배열만 전송
  if (payload.deletedSubjects.length >= 0) {
    requestBody.deletedSubjects = payload.deletedSubjects;
  }

  const response = await instance('subjects', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (response.error) {
    console.error('과목 처리 중 오류 발생:', response.error);
    return { success: false, message: '요청을 처리하는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.' };
  }

  if (requestBody.addedSubjects.length === 0 && requestBody.deletedSubjects.length === 0) {
    return { success: true };
  }

  return { success: true };
};

interface Subject {
  id: number;
  name: string;
}

interface SubjectsResponse {
  subjects: Subject[];
}

// 과목 편집 목록 가져오기 (선택x)
export const getSubjectEditList = async (): Promise<SubjectsResponse> => {
  const response = await instance('timer', { method: 'GET' });

  if (response.error) {
    throw new Error('과목 페치 에러: ' + response.error.message);
  }

  return response;
};
