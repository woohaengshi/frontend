import React from 'react';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  previousRank: number; // 이전 순위
  imageUrl?: string; // 학생 이미지 URL (선택 사항)
  isCurrentUser?: boolean; // 현재 사용자 여부
}

interface FullRankingListProps {
  rankings: Student[];
}

function FullRankingList({ rankings }: FullRankingListProps) {
  return (
    <div>
      {/* <h2>전체 랭킹 리스트</h2> */}
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>공부시간</th>
            <th>누적시간</th>
            <th>반</th>
            <th>이전 순위</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studyTime}</td>
              <td>{student.totalTime}</td>
              <td>{student.class}</td>
              <td>{student.previousRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FullRankingList;
