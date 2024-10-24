import { Box, Text } from '@radix-ui/themes';
import CommonButton from '@/components/common/CommonButton';
import { usePwUpdateStore } from '@/stores/memberStore';
import { useState } from 'react';
import { isValidPassword } from '@/utils/validateUtils';

interface IUpdateForm {
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PwUpdateForm({ onUpdate }: IUpdateForm) {
  const [error, setError] = useState({ oldPassword: false, newPassword: false, checkPassword: false });
  const { oldPassword, newPassword, checkPassword, setOldPassword, setNewPassword, setCheckPassword } =
    usePwUpdateStore();

  // 기존 비밀번호 유효성 검사
  const oldPasswordChangeHandler = (oldPassword: string) => {
    setOldPassword(oldPassword);

    if (isValidPassword(oldPassword)) {
      setError((prev) => ({ ...prev, oldPassword: false }));
    } else {
      setError((prev) => ({ ...prev, oldPassword: true }));
    }
  };

  // 새 비밀번호 유효성 검사
  const newPasswordChangeHandler = (newPassword: string) => {
    setNewPassword(newPassword);

    if (isValidPassword(newPassword)) {
      setError((prev) => ({ ...prev, newPassword: false }));
    } else {
      setError((prev) => ({ ...prev, newPassword: true }));
    }

    // 새 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(newPassword, checkPassword);
  };

  // 새 비밀번호 확인 검사
  const checkPasswordChangeHandler = (checkPassword: string) => {
    setCheckPassword(checkPassword);

    // 새 비밀번호와 비밀번호 확인 일치 여부 검사
    checkPasswordMatch(newPassword, checkPassword);
  };

  // 새 비밀번호와 새 비밀번호 확인 일치 여부를 검사하는 함수
  const checkPasswordMatch = (newPassword: string, checkPassword: string) => {
    setError((prev) => ({
      ...prev,
      checkPassword: newPassword !== checkPassword,
    }));
  };

  // submit 전에 frontend에서 입력값 검사
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error.oldPassword || error.newPassword || error.checkPassword) {
      alert('입력값을 확인해주세요.');
      return;
    }
    onUpdate(e);
  };

  return (
    <Box className="form_box" p="1">
      <form onSubmit={submitHandler}>
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
                oldPasswordChangeHandler(e.target.value);
              }}
            />
          </Box>
          {error.oldPassword && (
            <Text as="p" color="red" size="2" weight="medium" mt="2" ml="2">
              영어, 숫자, 특수문자를 포함한 최소 8자 이상, 최대 20자 이하여야 합니다.
            </Text>
          )}
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
