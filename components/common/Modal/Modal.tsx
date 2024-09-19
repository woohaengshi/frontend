'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { Box, Dialog, Flex, Inset, Text } from '@radix-ui/themes';
import styles from './Modal.module.css';
import ModalLink from './ModalLink';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    const cookieValue = Cookies.get('isHide');
    if (cookieValue === 'true') {
      setIsOpen(false);
    }
  }, []);

  const checkedHandler = () => {
    setIsHide(!isHide);
    if (!isHide) {
      closeHandler();
    }
  };

  const closeHandler = () => {
    if (!isHide) {
      Cookies.set('isHide', 'true', { expires: 1 }); // 1일 동안 쿠키 저장
    }
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content maxWidth="640px" aria-describedby={undefined}>
        <Box className="modal_content">
          <Inset side="x">
            <Flex align="center" className="modal_header">
              <Flex justify="between" align="center">
                <Dialog.Title>NOTICE</Dialog.Title>
                <Flex align="center" gap="10px" className="right">
                  <ModalLink href="https://ionized-toad-6ee.notion.site/woohaengshi-8e37b80ac8c64feba132ae91bde8d4c8">
                    사용설명서 바로가기
                  </ModalLink>
                  <Dialog.Close>
                    <button className="btn_close">
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Flex>
              </Flex>
            </Flex>
          </Inset>
          <Box py="5" className={`${styles.modal_body} modal_body`}>
            {children}
          </Box>
          <Inset side="x">
            <Flex justify="end" align="center" className={styles.modal_footer}>
              <Text as="label" size="2" weight="medium">
                <Flex gap="2">
                  <input type="checkbox" checked={isHide} onChange={checkedHandler} />
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
