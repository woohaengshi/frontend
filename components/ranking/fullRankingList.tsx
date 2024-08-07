import React from 'react';
import styles from './fullRankingList.module.css';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  rank: number;
}

interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null; // Change to accept currentUser as a prop
}

function FullRankingList({ rankings, currentUser }: FullRankingListProps) {
  // Filter out the current user from the rankings
  const otherRankings = rankings
    .filter((student) => student.name !== currentUser?.name);

  // Combine the current user with the other rankings
  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  return (
    <div>
      <table className={styles.full_ranking_table_wrap}>
        <thead className={styles.full_ranking_thead_wrap}>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>반</th>
            <th>공부시간</th>
            <th>누적시간</th>
          </tr>
        </thead>
        <tbody className={styles.full_ranking_tbody_wrap}>
          {allRankings.map((student) => (
            <tr key={student.id} className={styles.full_ranking_student}>
              <td>{student.rank}</td> {/* 순위 표시 */}
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.studyTime}</td>
              <td>{student.totalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FullRankingList;
