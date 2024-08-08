//fullRankingList.tsx
import React from 'react';
import Image from 'next/image';
import styles from './fullRankingList.module.css';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  rank: number;
  imageUrl?: any;
}

interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null; 
}

function FullRankingList({ rankings, currentUser }: FullRankingListProps) {

  const otherRankings = rankings.filter((student) => student.name !== currentUser?.name);

  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  return (
    <div>
      <table className={styles.full_ranking_table_wrap}>
        <thead className={styles.full_ranking_thead_wrap}>
          <tr className={styles.full_ranking_tr}>
            <th>순위</th>
            <th></th>
            <th>이름</th>
            <th></th>
            <th>반</th>
            <th>공부시간</th>
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
