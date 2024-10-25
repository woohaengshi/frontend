'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './fullRankingList.module.css';
import InfiniteScroll from 'react-infinite-scroller';
import { Student } from '@/types/rankingType';
import rankingImg from '@/public/imgs/ranking/ranking_profile_img.png';
import { formatTime } from '@/utils/formatTimeUtils';

interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null;
  activeTab: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  loadMore: () => void;
  hasMore: boolean;
}

export default function FullRankingList({ rankings, currentUser, activeTab, loadMore, hasMore }: FullRankingListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const otherRankings = rankings.filter((student) => student.id !== currentUser?.id);
  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  const timeLabel = activeTab === 'DAILY' ? '일간시간' : activeTab === 'WEEKLY' ? '주간시간' : '월간시간';
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.scroll_table} ref={containerRef}>
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
        <table>
          <colgroup>
            <col style={{ width: isMobile ? '20%' : '15%' }} />
            <col style={{ width: isMobile ? '13%' : '50px' }} />
            <col style={{ width: isMobile ? '42%' : 'auto' }} />
            {!isMobile && <col width="20%" />}
            <col style={{ width: isMobile ? '25%' : '15%' }} />
            {!isMobile && <col width="20%" />}
          </colgroup>
          <thead>
            <tr>
              <th className={styles.radius_left}>순위</th>
              <th></th>
              <th className={styles.name}>이름</th>
              <th>반</th>
              <th className={isMobile ? styles.radius_right : ''}>{timeLabel}</th>
              <th className={styles.radius_right}>누적시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className={styles.blank}></td>
            </tr>
            {allRankings.map((student) => (
              <tr key={student.id} className={styles.full_ranking_student}>
                <td>
                  {currentUser && student.id === currentUser.id && currentUser.rank
                    ? currentUser.rank
                    : student.rank || '-'}
                </td>
                <td>
                  <Image
                    src={student.image || rankingImg}
                    alt={`${student.name} 프로필 이미지`}
                    className={styles.student_image}
                  />
                </td>
                <td className={styles.name}>
                  {student.name}
                  {currentUser && student.id === currentUser.id && (
                    <span className={styles.current_user_label}>(나)</span>
                  )}
                </td>
                <td>{student.course}</td>
                <td>{formatTime(student.studyTime)}</td>
                <td>{formatTime(student.totalTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
