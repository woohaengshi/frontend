interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  previousRank: number; // 이전 순위
}

interface TopRankingsProps {
  rankings: Student[];
}

function TopRankings({ rankings }: TopRankingsProps) {
  return (
    <div>
      <h2>상위 3명</h2>
      <ul>
        {rankings.slice(0, 3).map((student, index) => (
          <li key={student.id}>
            {index + 1}. {student.name} - 공부시간: {student.studyTime}, 누적시간: {student.totalTime}, 반:{' '}
            {student.class}, 이전 순위: {student.previousRank}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopRankings;
