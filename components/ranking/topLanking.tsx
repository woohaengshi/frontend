import { Grid, Text } from '@radix-ui/themes';
import styles from './topRankingList.module.css';
import rankingOne from '../../assets/icons/ranking_1.png';
import rankingTwo from '../../assets/icons/ranking_2.png';
import rankingThird from '../../assets/icons/ranking_3.png';
import Image from 'next/image';

interface Student {
  id: number;
  name: string;
  studyTime: number; 
  totalTime: number; 
  course: string; 
  imageUrl?: string;
  isCurrentUser?: boolean;
}

interface TopRankingsProps {
  rankings: Student[];
  activeTab: 'daily' | 'weekly' | 'monthly';
}

function TopRankings({ rankings, activeTab }: TopRankingsProps) {
  const modifiedRankings = [...rankings];

  // 랭킹 순서 변경
  if (modifiedRankings.length > 1) {
    [modifiedRankings[0], modifiedRankings[1]] = [modifiedRankings[1], modifiedRankings[0]];
  }

  // 탭에 따라 라벨 설정
  const timeLabel = activeTab === 'daily' ? '일시간' : activeTab === 'weekly' ? '주시간' : '월시간';

  return (
    <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.top_ranking_box_wrap}>
      {modifiedRankings.slice(0, 3).map((student, index) => {
        const sizeClass = index === 1 ? styles.ranking_box_size_large : styles.ranking_box_size_small;
        const medalImage = index === 0 ? rankingTwo : index === 1 ? rankingOne : rankingThird;
        const medalSizeClass = index === 1 ? styles.medal_image_large : styles.medal_image_small;

        // 시간 포맷팅
        const formattedStudyTime = `${Math.floor(student.studyTime / 60)}시간 ${student.studyTime % 60}분`;
        const formattedTotalTime = `${Math.floor(student.totalTime / 60)}시간 ${student.totalTime % 60}분`;

        return (
          <div key={student.id} className={`${styles.top_ranking_box} ${sizeClass}`}>
            <div className={styles.medal_image_wrap}>
              <Image
                src={medalImage}
                alt={`${index + 1}등 메달`}
                className={`${styles.medal_image} ${medalSizeClass}`}
              />
            </div>
            <Image src={student.imageUrl} alt={`${student.name} 이미지`} className={styles.student_image} />
            <Grid columns="1" gap="2" rows="repeat(1, 10px)">
              <Text as="p" size="2" weight="medium" className={styles.student_name}>
                {student.name}
              </Text>
              <Text as="p" size="2" className={styles.student_class}>
                {student.course} {/* 'class'를 'course'로 변경 */}
              </Text>
            </Grid>
            <Grid columns="2" gap="1" className={styles.student_info}>
              <Text as="p" size="2" className={styles.details_time}>
                <Text as="p" weight="medium">
                  {timeLabel}
                </Text>
                <Text as="p" className={styles.studyTime}>
                  {formattedStudyTime}
                </Text>
              </Text>
              <Text as="p" size="2" className={styles.accumulate_time}>
                <Text as="p" weight="medium">
                  누적시간
                </Text>
                <Text as="p" className={styles.totalTime}>
                  {formattedTotalTime}
                </Text>
              </Text>
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
}

export default TopRankings;
