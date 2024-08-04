interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  previousRank: number; // 이전 순위
}

interface FullRankingListProps {
  rankings: Student[];
}

function FullRankingList({ rankings }: FullRankingListProps) {
  return (
    <div>
      <h2>전체 랭킹 리스트</h2>
      <ul>
        {rankings.map((student, index) => (
          <li key={student.id}>
            {index + 1}. {student.name} - 공부시간: {student.studyTime}, 누적시간: {student.totalTime}, 반:{' '}
            {student.class}, 이전 순위: {student.previousRank}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FullRankingList;
