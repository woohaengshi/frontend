'use client';

import { getRecordMonthly } from '@/api/recordApi';
import FullCalendar from '@/components/record/FullCalendar';
import { useSelectedMonthStore, useSelectedYearStore } from '@/store/recordStore';
import useSWR from 'swr';

export default function Record() {
  const { selectedYear } = useSelectedYearStore();
  const { selectedMonth } = useSelectedMonthStore();

  const {
    data: monthlyData,
    error: monthlyError,
    isLoading: monthlyLoading,
  } = useSWR(['MonthlyRecord', selectedYear, selectedMonth], async () => {
    const result = await getRecordMonthly(selectedYear, selectedMonth);
    return result;
  });

  if (monthlyData?.error) {
    alert(monthlyData.error.message);
  }

  return <section>{!monthlyLoading && <FullCalendar monthlyData={monthlyData} />}</section>;
}
