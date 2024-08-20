import { Box, Checkbox, Dialog, Flex, Inset, Strong, Text } from '@radix-ui/themes';
import styles from './Modal.module.css';
import ModalLink from './ModalLink';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Content maxWidth="640px">
        <Box className={styles.modal_content}>
          <Inset side="x">
            <Flex align="center" className={styles.modal_header}>
              <Flex justify="between" align="center">
                <Strong>NOTICE</Strong>
                <Flex align="center" gap="10px" className={styles.right}>
                  <ModalLink href="/">사용설명서 바로가기</ModalLink>
                  <Dialog.Close>
                    <button className={styles.btn_close}>
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Flex>
              </Flex>
            </Flex>
          </Inset>
          <Box py="5" className={styles.modal_body}>
            {children}
          </Box>
          <Inset side="x">
            <Flex justify="end" align="center" className={styles.modal_footer}>
              <Text as="label" size="2" weight="medium">
                <Flex gap="2">
                  <Checkbox />
                  오늘 하루 이 창을 열지 않음
                </Flex>
              </Text>
            </Flex>
          </Inset>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
