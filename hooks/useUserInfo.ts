import { useUserInfoStore } from '@/stores/memberStore';
import { useEffect } from 'react';

const useUserInfo = () => {
  const { userInfo, setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo]);

  return userInfo;
};

export default useUserInfo;
