'use client';
import React, { useState } from 'react';
import TopRankings from '../../components/ranking/topLanking';
import FullRankingList from '../../components/ranking/fullRankingList';
import { Grid } from '@radix-ui/themes';
import styles from './ranking.module.css';

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


function Ranking() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily'); // 초기 상태 'daily'

  const rankings: Record<string, Student[]> = {
    daily: [
      { id: 1, name: '학생 A', studyTime: '5시간', totalTime: '20시간', class: '클라우드 서비스', previousRank: 2, imageUrl: '/assets/icons/ranking_profile_img.png' },
      { id: 2, name: '학생 B', studyTime: '4시간', totalTime: '18시간', class: 'AI 엔지니어링', previousRank: 1, imageUrl: '/images/student-b.jpg' },
      { id: 3, name: '학생 C', studyTime: '3시간', totalTime: '15시간', class: '클라우드 엔지니어링', previousRank: 3, imageUrl: '/images/student-c.jpg' },
      { id: 4, name: '학생 D', studyTime: '2시간', totalTime: '10시간', class: '클라우드 서비스', previousRank: 4, imageUrl: '/images/student-d.jpg' },
    ],
    weekly: [
      { id: 1, name: '학생 E', studyTime: '15시간', totalTime: '100시간', class: 'AI 엔지니어링', previousRank: 1, imageUrl: '/images/student-e.jpg' },
      { id: 2, name: '학생 F', studyTime: '12시간', totalTime: '90시간', class: '클라우드 엔지니어링', previousRank: 2, imageUrl: '/images/student-f.jpg' },
      { id: 3, name: '학생 G', studyTime: '10시간', totalTime: '80시간', class: '클라우드 서비스', previousRank: 3, imageUrl: '/images/student-g.jpg' },
      { id: 4, name: '학생 H', studyTime: '8시간', totalTime: '70시간', class: 'AI 엔지니어링', previousRank: 4, imageUrl: '/images/student-h.jpg' },
    ],
    monthly: [
      { id: 1, name: '학생 I', studyTime: '50시간', totalTime: '300시간', class: '클라우드 서비스', previousRank: 1, imageUrl: '/images/student-i.jpg' },
      { id: 2, name: '학생 J', studyTime: '45시간', totalTime: '280시간', class: 'AI 엔지니어링', previousRank: 2, imageUrl: '/images/student-j.jpg' },
      { id: 3, name: '학생 K', studyTime: '40시간', totalTime: '250시간', class: '클라우드 엔지니어링', previousRank: 3, imageUrl: '/images/student-k.jpg' },
      { id: 4, name: '학생 L', studyTime: '35시간', totalTime: '240시간', class: '클라우드 서비스', previousRank: 4, imageUrl: '/images/student-l.jpg' },
    ],
  };

  return (
    <div className={styles.ranking_wrap}>
      <Grid columns="1" gap="3" rows="repeat(1, 64px)" className={styles.ranking_wrap_inner}>
        <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.date_tap_wrap}>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'daily' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            일간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'weekly' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            주간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'monthly' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            월간
          </button>
        </Grid>
        <Grid className={styles.top_rankings_wrap}>
          <TopRankings rankings={rankings[activeTab || 'daily']} />
        </Grid>
        <Grid className={styles.full_ranking_wrap}>
          <FullRankingList rankings={rankings[activeTab || 'daily']} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Ranking;

