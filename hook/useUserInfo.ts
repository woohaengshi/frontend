import { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  course: string;
}
const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return userInfo;
};

export default useUserInfo;
