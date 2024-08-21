import { Box, Text } from '@radix-ui/themes';
import CommonButton from '@/components/common/CommonButton';
import { usePwUpdateStore } from '@/store/memberStore';
import { useState } from 'react';
import { isValidPassword } from '@/utils/validateUtils';

interface IUpdateForm {
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PwUpdateForm({ onUpdate }: IUpdateForm) {
  const [error, setError] = useState({ oldPassword: false, newPassword: false, checkPassword: false });
  const { oldPassword, newPassword, checkPassword, setOldPassword, setNewPassword, setCheckPassword } =
    usePwUpdateStore();

  const newPasswordChangeHandler = (newPassword: string) => {
    setNewPassword(newPassword);

    // 비밀번호 유효성 검사
    if (isValidPassword(newPassword)) {
      setError((prev) => ({ ...prev, newPassword: false }));
    } else {
      setError((prev) => ({ ...prev, newPassword: true }));
    }

    // 새 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(newPassword, checkPassword);
  };

  const checkPasswordChangeHandler = (checkPassword: string) => {
    console.log('test');
    setCheckPassword(checkPassword);

    // 새 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(newPassword, checkPassword);
  };

  // 비밀번호와 비밀번호 확인 일치 여부를 검사하는 함수
  const checkPasswordMatch = (newPassword: string, checkPassword: string) => {
    setError((prev) => ({
      ...prev,
      checkPassword: newPassword !== checkPassword,
    }));
  };

  return (
    <Box className="form_box">
      <form onSubmit={onUpdate}>
        <Box className="row">
          <Text as="label" weight="medium">
            현재 비밀번호
          </Text>
          <Box mt="2">
            <input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box mt="3" className="row">
          <Text as="label" weight="medium">
            새 비밀번호
          </Text>
          <Box mt="2">
            <input
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              value={newPassword}
              onChange={(e) => {
                newPasswordChangeHandler(e.target.value);
              }}
            />
          </Box>
          {error.newPassword && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              영어, 숫자, 특수문자를 포함한 최소 8자 이상, 최대 20자 이하여야 합니다.
            </Text>
          )}
        </Box>
        <Box mt="3" className="row">
          <Text as="label" weight="medium">
            새 비밀번호 확인
          </Text>
          <Box mt="2">
            <input
              type="password"
              placeholder="새 비밀번호를 다시 한 번 입력해주세요."
              value={checkPassword}
              onChange={(e) => {
                checkPasswordChangeHandler(e.target.value);
              }}
            />
          </Box>
          {error.checkPassword && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              새 비밀번호가 일치하지 않습니다.
            </Text>
          )}
        </Box>
        <Box mt="6">
          <CommonButton type="submit" style="dark_purple">
            저장
          </CommonButton>
        </Box>
      </form>
    </Box>
  );
}
