'use client';

import ClassRadioGroup from '@/components/auth/ClassRadioGroup';
import InputField from '@/components/auth/InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box } from '@radix-ui/themes';
import { patchUserInfo } from '@/apis/memberApi';
import { useState, useTransition } from 'react';

export default function InfoUpdate() {
  const [isPending, startTransition] = useTransition();
  const [userInfo, setUserInfo] = useState({
    name: '',
    course: '',
  });

  const handleNameChange = (name: string) => {
    setUserInfo({ ...userInfo, name });
  };

  const handleCourseChange = (value: string) => {
    setUserInfo({ ...userInfo, course: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo.name.trim() === '') {
      alert('수정할 이름을 입력해주세요.');
      return;
    }
    if (userInfo.course === '') {
      alert('수정할 과정을 선택해주세요.');
      return;
    }

    // Transition 안에서 비동기 작업 시작
    startTransition(() => {
      patchUserInfo(userInfo); // 유저 정보 패치
      localStorage.removeItem('userInfo'); // 로컬 스토리지에서 유저 정보 제거
    });
  };

  return (
    <Box className="form_box" p="1">
      <form onSubmit={submitHandler}>
        <Box className="row">
          <InputField
            label="이름"
            id="user_name"
            placeholder="이름을 입력해주세요."
            value={userInfo.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
          />
          <Box mt="3" className="row">
            <ClassRadioGroup course={userInfo.course} onChange={handleCourseChange} />
          </Box>
          <Box mt="5">
            <CommonButton type="submit" style="dark_purple" disabled={isPending}>
              {isPending ? '수정 중...' : '수정하기'}
            </CommonButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
