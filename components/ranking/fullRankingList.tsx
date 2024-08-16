'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './fullRankingList.module.css';
import InfiniteScroll from 'react-infinite-scroller';
import { Student } from '@/types/rankingType'; // Student 타입 import
import rankingImg from '@/assets/icons/ranking_profile_img.png';


interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null;
  activeTab: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  loadMore: () => void;
  hasMore: boolean;
}

function FullRankingList({ rankings, currentUser, activeTab, loadMore, hasMore }: FullRankingListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const otherRankings = rankings.filter((student) => student.id !== currentUser?.id);
  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  const timeLabel = activeTab === 'DAILY' ? '일간시간' : activeTab === 'WEEKLY' ? '주간시간' : '월간시간';

  // 시간 포맷팅 함수 - 초를 시간과 분으로 변환
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600); // 초를 시간으로 변환
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // 나머지 초를 분으로 변환
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className={styles.full_ranking_container}>
      <table className={styles.full_ranking_table_wrap}>
        <thead className={styles.full_ranking_thead_wrap}>
          <tr className={styles.full_ranking_tr}>
            <th>순위</th>
            <th></th>
            <th>이름</th>
            <th></th>
            <th>반</th>
            <th>{timeLabel}</th>
            <th>누적시간</th>
          </tr>
        </thead>
      </table>
      <div className={styles.scrollable_tbody}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={
            <div className={styles.loader} key={0}>
              Loading...
            </div>
          }
          useWindow={false}
          getScrollParent={() => containerRef.current}
        >
          <table className={styles.full_ranking_table_wrap}>
            <tbody className={styles.full_ranking_tbody_wrap}>
              {allRankings.map((student) => (
                <tr key={student.id} className={styles.full_ranking_student}>
                  <td>{student.rank}</td>
                  <td>
                  <Image 
                      src={student.image || rankingImg} // Use rankingImg if student.image is null
                      alt="Student Image"
                      className={styles.student_image} 
                    />
                  </td>
                  <td>
                    {student.name}
                    {currentUser && student.id === currentUser.id && (
                      <span className={styles.current_user_label}>(나)</span>
                    )}
                  </td>
                  <td></td>
                  <td>{student.course}</td>
                  <td>{formatTime(student.studyTime)}</td>
                  <td>{formatTime(student.totalTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default FullRankingList;
