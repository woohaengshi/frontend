import React, { useEffect, useState } from 'react';
import styles from './fullRankingList.module.css';
import { Container } from '@radix-ui/themes';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  previousRank: number;
  rank: number;
}

interface FullRankingListProps {
  rankings: Student[];
}

function FullRankingList({ rankings }: FullRankingListProps) {
  // const [currentUser, setCurrentUser] = useState<Student | null>(null);

  // useEffect(() => {
  //   // 서버에서 현재 사용자 데이터를 가져오는 함수
  //   const fetchCurrentUser = async () => {
  //     // 예시 API 호출
  //     try {
  //       const response = await fetch('/api/currentUser'); // 실제 API 엔드포인트로 변경
  //       const data = await response.json();
  //       setCurrentUser(data);
  //     } catch (error) {
  //       console.error('현재 사용자 데이터를 가져오는 중 오류 발생:', error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  // '홍길동'의 정보를 설정합니다.
  const currentUser: Student = {
    id: 1,
    name: '홍길동',
    studyTime: '5시간',
    totalTime: '20시간',
    class: '클라우드 서비스',
    previousRank: 77,
    rank: 78, // 가정된 순위
  };
  // 나머지 학생들을 순위에 따라 정렬합니다.
  const otherRankings = rankings
    .map((student) => ({
      ...student,
      rank: student.previousRank, // 기존 순위를 사용하여 정렬
    }))
    .filter((student) => student.name !== '홍길동');

  // 모든 학생을 합칩니다. 현재 사용자 데이터가 로드될 때까지 기다립니다.
  // const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  // 모든 학생을 합칩니다.

  const allRankings = [currentUser, ...otherRankings];

  return (
    <div>
      <table className={styles.full_ranking_table_wrap}>
        <thead className={styles.full_ranking_thead_wrap}>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>공부시간</th>
            <th>누적시간</th>
            <th>반</th>
            <th>이전 순위</th>
          </tr>
        </thead>
        <tbody className={styles.full_ranking_tbody_wrap}>
          {allRankings.map((student) => (
            <tr key={student.id} className={styles.full_ranking_student}>
              <td>{student.rank}</td> {/* 순위 표시 */}
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
