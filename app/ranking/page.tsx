// app/ranking/page.tsx or app/ranking/Ranking.tsx (depending on your project structure)
'use client'
import React, { useEffect, useState } from 'react';
import TopRankings from '../../components/ranking/TopLanking';
import FullRankingList from '../../components/ranking/FullRankingList';
import { Grid } from '@radix-ui/themes';
import styles from './ranking.module.css';
import rankingImg from '../../assets/icons/ranking_profile_img.png';
import Image from 'next/image';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  rank: number;
  imageUrl?: any; 
}

function Ranking() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  // const [currentUser, setCurrentUser] = useState<Student | null>(null);

  const hongGilDongData: Record<string, Student> = {
    daily: {
      id: 1,
      name: '홍길동',
      studyTime: '5시간',
      totalTime: '20시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg, // Optional image URL
    },
    weekly: {
      id: 1,
      name: '홍길동',
      studyTime: '20시간',
      totalTime: '70시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg,
    },
    monthly: {
      id: 1,
      name: '홍길동',
      studyTime: '80시간',
      totalTime: '250시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg,
    },
  };

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await fetch('/api/currentUser'); // Update with your actual API endpoint
  //       const data = await response.json();
  //       setCurrentUser(data);
  //     } catch (error) {
  //       console.error('Failed to fetch current user data:', error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  const rankings: Record<string, Student[]> = {
    daily: [
      { id: 2, name: '학생A', studyTime: '5시간', totalTime: '20시간', class: '클라우드 서비스', rank: 1, imageUrl: rankingImg },
      { id: 3, name: '학생 B', studyTime: '4시간', totalTime: '18시간', class: 'AI 엔지니어링', rank: 2, imageUrl: rankingImg },
      { id: 4, name: '학생 C', studyTime: '3시간', totalTime: '15시간', class: '클라우드 엔지니어링', rank: 3, imageUrl: rankingImg },
      { id: 5, name: '학생 D', studyTime: '2시간', totalTime: '10시간', class: '클라우드 서비스', rank: 4, imageUrl: rankingImg },
    ],
    weekly: [
      { id: 2, name: '학생 E', studyTime: '15시간', totalTime: '100시간', class: 'AI 엔지니어링', rank: 1, imageUrl: rankingImg },
      { id: 3, name: '학생 F', studyTime: '12시간', totalTime: '90시간', class: '클라우드 엔지니어링', rank: 2, imageUrl: rankingImg },
      { id: 4, name: '학생 G', studyTime: '10시간', totalTime: '80시간', class: '클라우드 서비스', rank: 3, imageUrl: rankingImg },
      { id: 5, name: '학생 H', studyTime: '8시간', totalTime: '70시간', class: 'AI 엔지니어링', rank: 4, imageUrl: rankingImg },
    ],
    monthly: [
      { id: 2, name: '학생 I', studyTime: '50시간', totalTime: '300시간', class: '클라우드 서비스', rank: 1, imageUrl: rankingImg },
      { id: 3, name: '학생 J', studyTime: '45시간', totalTime: '280시간', class: 'AI 엔지니어링', rank: 2, imageUrl: rankingImg },
      { id: 4, name: '학생 K', studyTime: '40시간', totalTime: '250시간', class: '클라우드 엔지니어링', rank: 3, imageUrl: rankingImg },
      { id: 5, name: '학생 L', studyTime: '35시간', totalTime: '240시간', class: '클라우드 서비스', rank: 4, imageUrl: rankingImg },
    ],
  };

    const currentUser = hongGilDongData[activeTab];

  return (
    <Grid columns="1" gap="2" rows="repeat(1, 100px)" className={styles.ranking_wrap}>
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
          <TopRankings rankings={rankings[activeTab]} activeTab={activeTab} />
        </Grid>
      </Grid>
      <Grid className={styles.full_ranking_wrap}>
        <FullRankingList
          rankings={rankings[activeTab]}
          currentUser={currentUser} 
          activeTab={activeTab}
        />
      </Grid>
    </Grid>
  );
}

export default Ranking;
