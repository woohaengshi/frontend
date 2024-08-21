import { Box, Text } from '@radix-ui/themes';
import CommonButton from '@/components/common/CommonButton';
import { usePwUpdateStore } from '@/store/memberStore';

interface IUpdateForm {
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PwUpdateForm({ onUpdate }: IUpdateForm) {
  const { oldPassword, newPassword, checkPassword, setOldPassword, setNewPassword, setCheckPassword } =
    usePwUpdateStore();

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
                setNewPassword(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box mt="3" className="row">
          <Text as="label" weight="medium">
            새 비밀번호 확인
          </Text>
          <Box mt="2">
            <input type="password" placeholder="새 비밀번호를 다시 한 번 입력해주세요." />
          </Box>
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
