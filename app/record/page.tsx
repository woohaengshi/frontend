import { getRecordMonthly } from '@/apis/recordApi';
import FullCalendar from '@/components/record/FullCalendar';

export default async function Record() {
  // 첫 렌더링때 오늘 날짜로 서버에서 미리 받아놓음
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const monthlyResponse = await getRecordMonthly(year, month);

  if (monthlyResponse?.error) {
    console.log(monthlyResponse.error.message);
  }

  return (
    <section>
      <FullCalendar monthlyData={monthlyResponse} />
    </section>
  );
}
