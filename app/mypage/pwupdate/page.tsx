import ButtonSubmit from "@/components/common/ButtonSubmit";
import { Box, Text } from "@radix-ui/themes";

export default function PwUpdate() {
  return (
    <>
      <Box className="form_box">
        <form action="">
          <Box className="row">
            <Text as="label" weight="medium">현재 비밀번호</Text>
            <Box mt="2">
              <input type="password" placeholder="현재 비밀번호를 입력해주세요." />
            </Box>
          </Box>
          <Box mt="3" className="row">
            <Text as="label" weight="medium">새 비밀번호</Text>
            <Box mt="2">
              <input type="password" placeholder="새로운 비밀번호를 입력해주세요." />
            </Box>
          </Box>
          <Box mt="3" className="row">
            <Text as="label" weight="medium">새 비밀번호 확인</Text>
            <Box mt="2">
              <input type="password" placeholder="새 비밀번호를 다시 한 번 입력해주세요." />
            </Box>
          </Box>
          <ButtonSubmit />
        </form>
      </Box>
    </>
  );
}