import { useEffect, useState } from 'react';

export default function useIsMobile(width: number) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // 초기 상태 설정
    setIsMobile(mediaQuery.matches);

    // 미디어 쿼리 변경 감지 리스너 추가
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // 클린업 함수
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [width]);

  return isMobile;
}
