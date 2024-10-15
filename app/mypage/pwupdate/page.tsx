'use client';

import { postPwUpdate } from '@/apis/memberApi';
import PwUpdateForm from '@/components/mypage/PwUpdateForm';
import { usePwUpdateStore } from '@/store/memberStore';

export default function PwUpdate() {
  const { oldPassword, newPassword, setAllEmpty } = usePwUpdateStore();
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pwUpdateResponse = await postPwUpdate({ oldPassword, newPassword });

    if (pwUpdateResponse?.error) {
      if (pwUpdateResponse.error.errors) {
        const errorMessages = pwUpdateResponse.error.errors
          .map((error: { field: string; message: string }) => error.message)
          .join('\n');
        alert(errorMessages);
      } else {
        alert(pwUpdateResponse.error.message);
      }
    } else {
      alert('성공적으로 비밀번호가 변경 되었습니다.');
      setAllEmpty();
    }
  };
  return <PwUpdateForm onUpdate={updateHandler} />;
}
