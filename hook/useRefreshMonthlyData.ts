import { getRecordMonthly } from '@/apis/recordApi';
import useSWR from 'swr';

// 달력 이동 버튼을 누를때만 갱신된 데이터 가져옴
const useRefreshMonthlyData = (selectedYear: number, selectedMonth: number, shouldFetch: boolean) => {
  const { data: refreshMonthlyData, isLoading: refreshMonthlyLoading } = useSWR(
    shouldFetch ? ['MonthlyRecord', selectedYear, selectedMonth] : null,
    async () => {
      const result = await getRecordMonthly(selectedYear, selectedMonth);
      return result;
    },
    {
      revalidateOnFocus: false, // 화면이 포커스될 때 데이터 재요청 방지
      revalidateOnReconnect: false, // 네트워크 재연결 시 데이터 재요청 방지
    },
  );

  if (refreshMonthlyData?.error) {
    alert(refreshMonthlyData.error.message);
  }

  return { refreshMonthlyData, refreshMonthlyLoading };
};

export default useRefreshMonthlyData;
