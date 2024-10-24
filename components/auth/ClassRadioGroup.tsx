import { Flex, RadioGroup, Text } from '@radix-ui/themes';

interface ClassRadioGroupProps {
  course: string;
  onChange: (value: string) => void;
}

export default function ClassRadioGroup({ course, onChange }: ClassRadioGroupProps) {
  return (
    <>
      <Text as="label" weight="medium" htmlFor="user_cls">
        클래스
      </Text>
      <Flex
        mt="2"
        justify="start"
        align="center"
        direction="row"
        gap="30px"
        gapY="10px"
        wrap="wrap"
        className="radio_box"
        asChild
      >
        <RadioGroup.Root defaultValue="ai" name="user_cls" size="3" value={course} onValueChange={onChange}>
          <RadioGroup.Item id="user_cls_ai" value="AI 엔지니어링">
            AI 엔지니어링
          </RadioGroup.Item>
          <RadioGroup.Item id="user_cls_cloud" value="클라우드 엔지니어링">
            클라우드 엔지니어링
          </RadioGroup.Item>
          <RadioGroup.Item id="user_cls_service" value="클라우드 서비스">
            클라우드 서비스 개발
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Flex>
    </>
  );
}
