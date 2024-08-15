import { getRecordMonthly } from '@/api/record';
import FullCalendar from '@/components/record/FullCalendar';
import { redirect } from 'next/navigation';

export default async function Record({ searchParams }) {
  // 서치 파라미터로 조회할 해당년도와 월을 받아옴
  const year = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;

  // 유효성 검사
  if (year < 2020 || month < 1 || month > 12) {
    if (typeof window !== 'undefined') {
      alert('올바르지 않은 년도 또는 월입니다.');
    }
    redirect('/record');
  }

  const monthlyResponse = await getRecordMonthly(year, month);

  return (
    <section>
      <FullCalendar monthlyData={monthlyResponse}/>
    </section>
  );
}
