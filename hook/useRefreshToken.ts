// hooks/useRefreshToken.ts
import { reissueToken } from '@/api/authApi';
import { ACCESS_TOKEN_EXPIRES } from '@/constants/token';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await reissueToken();
        console.log('토큰 갱신 요청 from hook', response);

        if (response.error) {
          console.error('ReissueToken error:', response.error);
          throw new Error('Failed to ReissueToken');
        }

        const { accessToken, cookie } = response;

        const refreshToken = cookie.split(';')[0].split('=')[1];

        console.log('new refreshToken', refreshToken);

        await update({
          ...session,
          user: {
            ...session?.user,
            accessToken,
            refreshToken,
          },
        });

        console.log('토큰이 갱신되었습니다.');
      } catch (error) {
        console.error('Token refresh error:', error);
      }
    };

    const intervalId = setInterval(() => {
      if (session?.user.refreshToken) {
        refreshToken();
      }
    }, ACCESS_TOKEN_EXPIRES);

    return () => clearInterval(intervalId);
  }, [session, update]);
};
