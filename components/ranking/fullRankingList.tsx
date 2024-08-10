// fullRankingList.tsx
import React from 'react';
import Image from 'next/image';
import styles from './fullRankingList.module.css';

// Student 인터페이스 정의
interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  rank: number;
  imageUrl?: string;
}

// FullRankingListProps 인터페이스 정의 
interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null;
  activeTab: 'daily' | 'weekly' | 'monthly';  // activeTab 추가
}

// FullRankingList 컴포넌트 정의
function FullRankingList({ rankings, currentUser, activeTab }: FullRankingListProps) {

  const otherRankings = rankings.filter((student) => student.name !== currentUser?.name);

  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  // 탭에 따라 라벨 설정
  const timeLabel = activeTab === 'daily' ? '일시간' : activeTab === 'weekly' ? '주시간' : '월시간';

  return (
    <div>
      <table className={styles.full_ranking_table_wrap}>
        {/* <colgroup>
          <col width="100px" />
          <col width="200px" />
          <col width="300px" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
        </colgroup> */}
        <thead className={styles.full_ranking_thead_wrap}>
          <tr className={styles.full_ranking_tr}>
            <th>순위</th>
            <th></th>
            <th>이름</th>
            <th></th>
            <th>반</th>
            <th>{timeLabel}</th> {/* 수정된 부분 */}
            <th>누적시간</th>
          </tr>
        </thead>
        <tbody className={styles.full_ranking_tbody_wrap}>
          {allRankings.map((student) => (
            <tr key={student.id} className={styles.full_ranking_student}>
              <td>{student.rank}</td>
              <td>
                {student.imageUrl && (
                  <Image
                    src={student.imageUrl}
                    alt="Student Image"
                    className={styles.student_image}
                  />
                )}
              </td>
              <td>
                {student.name}
                {currentUser && student.id === currentUser.id && (
                  <span className={styles.current_user_label}> (나)</span>
                )}
              </td>
              <td></td>
              <td>{student.class}</td>
              <td>{student.studyTime}</td> {/* 기존 studyTime 사용 */}
              <td>{student.totalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FullRankingList;
