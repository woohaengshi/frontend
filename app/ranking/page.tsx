'use client';
import React, { useState } from 'react';
import TopRankings from '../../components/ranking/topLanking';
import FullRankingList from '../../components/ranking/fullRankingList';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  previousRank: number; // 이전 순위
}

function Ranking() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const rankings: Record<string, Student[]> = {
    daily: [
      { id: 1, name: '학생 A', studyTime: '5시간', totalTime: '20시간', class: '클라우드 서비스', previousRank: 2 },
      { id: 2, name: '학생 B', studyTime: '4시간', totalTime: '18시간', class: 'AI 엔지니어링', previousRank: 1 },
      { id: 3, name: '학생 C', studyTime: '3시간', totalTime: '15시간', class: '클라우드 엔지니어링', previousRank: 3 },
      { id: 4, name: '학생 D', studyTime: '2시간', totalTime: '10시간', class: '클라우드 서비스', previousRank: 4 },
    ],
    weekly: [
      { id: 1, name: '학생 E', studyTime: '15시간', totalTime: '100시간', class: 'AI 엔지니어링', previousRank: 1 },
      {
        id: 2,
        name: '학생 F',
        studyTime: '12시간',
        totalTime: '90시간',
        class: '클라우드 엔지니어링',
        previousRank: 2,
      },
      { id: 3, name: '학생 G', studyTime: '10시간', totalTime: '80시간', class: '클라우드 서비스', previousRank: 3 },
      { id: 4, name: '학생 H', studyTime: '8시간', totalTime: '70시간', class: 'AI 엔지니어링', previousRank: 4 },
    ],
    monthly: [
      { id: 1, name: '학생 I', studyTime: '50시간', totalTime: '300시간', class: '클라우드 서비스', previousRank: 1 },
      { id: 2, name: '학생 J', studyTime: '45시간', totalTime: '280시간', class: 'AI 엔지니어링', previousRank: 2 },
      {
        id: 3,
        name: '학생 K',
        studyTime: '40시간',
        totalTime: '250시간',
        class: '클라우드 엔지니어링',
        previousRank: 3,
      },
      { id: 4, name: '학생 L', studyTime: '35시간', totalTime: '240시간', class: '클라우드 서비스', previousRank: 4 },
    ],
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('daily')}>일간</button>
        <button onClick={() => setActiveTab('weekly')}>주간</button>
        <button onClick={() => setActiveTab('monthly')}>월간</button>
      </div>
      <TopRankings rankings={rankings[activeTab]} />
      <FullRankingList rankings={rankings[activeTab]} />
    </div>
  );
}

export default Ranking;
