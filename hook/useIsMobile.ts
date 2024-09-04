import { useEffect, useState } from 'react';

export default function useIsMobile(width: number) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let tiemout: NodeJS.Timeout;

    const checkScreenSize = () => {
      if (tiemout) {
        clearTimeout(tiemout);
      }

      tiemout = setTimeout(() => {
        setIsMobile(window.innerWidth <= width);
      }, 150);
    };

    // 초기 화면 크기를 감지
    checkScreenSize();

    // 화면 크기가 변경될 때마다 감지
    window.addEventListener('resize', checkScreenSize);

    // 클린업 함수
    return () => {
      clearTimeout(tiemout);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return isMobile;
}
