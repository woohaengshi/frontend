import { Grid, Text } from '@radix-ui/themes';
import styles from './topRankingList.module.css';
import rankingOne from '../../assets/icons/ranking_1.png';
import rankingTwo from '../../assets/icons/ranking_2.png';
import rankingThird from '../../assets/icons/ranking_3.png';
import Image from 'next/image'; // Image 컴포넌트를 import

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  imageUrl?: any; // 학생 이미지 URL (선택 사항)
  isCurrentUser?: boolean; // 현재 사용자 여부
}

interface TopRankingsProps {
  rankings: Student[];
}

function TopRankings({ rankings, activeTab }: TopRankingsProps & { activeTab: 'daily' | 'weekly' | 'monthly' }) {
  const modifiedRankings = [...rankings];
  if (modifiedRankings.length > 1) {
    [modifiedRankings[0], modifiedRankings[1]] = [modifiedRankings[1], modifiedRankings[0]];
  }

  // 탭에 따라 라벨 설정
  const timeLabel = activeTab === 'daily' ? '일시간' : activeTab === 'weekly' ? '주시간' : '월시간';

  return (
    <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.top_ranking_box_wrap}>
      {modifiedRankings.slice(0, 3).map((student, index) => {
        const sizeClass = index === 1 ? styles.size_large : styles.size_small;
        const medalImage = index === 0 ? rankingTwo : index === 1 ? rankingOne : rankingThird;
        const medalSizeClass = index === 1 ? styles.medal_image_large : styles.medal_image_small;

        return (
          <div key={student.id} className={`${styles.top_ranking_box} ${sizeClass}`}>
           <div className={styles.medal_image_wrap}>
              <Image src={medalImage} alt={`${index + 1}등 메달`} className={`${styles.medal_image} ${medalSizeClass}`} />
            </div>
            <Image src={student.imageUrl} alt={`${student.name} 이미지`} className={styles.student_image} />
            <Grid columns="1" gap="2" rows="repeat(1, 10px)">
              <Text as="p" size="2" weight="medium" className={styles.student_name}>{student.name}</Text>
              <Text as="p" size="2" className={styles.student_class}> {student.class}</Text>
            </Grid>
            <Grid columns="2" gap="1" className={styles.student_info}>
              <Text as="p" size="2" className={styles.details}>
                <Text as="p">{timeLabel}</Text>
                <Text as="p" className={styles.studyTime}>{student.studyTime}</Text>
              </Text>
              <Text as="p" size="2" className={styles.details}>
                <Text as="p">누적시간</Text>
                <Text as="p" className={styles.totalTime} >{student.totalTime}</Text>
              </Text>
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
}

export default TopRankings;
