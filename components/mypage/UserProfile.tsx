'use client';

import { Avatar, Box, Strong, Text } from '@radix-ui/themes';
import { useRef, useState } from 'react';
import styles from './UserProfile.module.css';
import ico_profile_img_file from '@/assets/icons/profile_img_file.png';
import Image from 'next/image';
import MypageTabMenu from './MypageTabMenu';

export default function UserProfile() {
  const [imgUrl, setImgUrl] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const onChangeImage = () => {
    if (!imgRef.current) {
      return; // imgRef.current가 undefined일 경우 함수 종료
    }

    const file = imgRef.current.files?.[0];

    if (!file) {
      return; // 파일이 선택되지 않은 경우 함수 종료
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImgUrl(reader.result);
      }
    };
  };

  const imageChangeHandler = () => {
    if (imgRef.current) {
      imgRef.current.click(); // imgRef.current가 null이 아닐 때만 클릭 이벤트 발생
    }
  };

  return (
    <section className="user_profile">
      <div className={styles.user_info}>
        <div className={styles.img_box}>
          <div className={styles.back_img} style={{ backgroundImage: `url(${imgUrl ? imgUrl : ''})` }}>
            <Avatar size="8" fallback="" radius="full"></Avatar>
          </div>
          <div className={styles.btn_file}>
            <input type="file" ref={imgRef} onChange={onChangeImage} />
            <button onClick={imageChangeHandler}>
              <Image src={ico_profile_img_file} alt="프로필 이미지 변경하기" width={18} height={18} />
            </button>
          </div>
        </div>
        <Box mt="3" className={styles.txt_box}>
          <Strong>홍길동</Strong>
          <Text as="p" size="3" weight="medium">
            클라우드 서비스
          </Text>
        </Box>
      </div>
      <MypageTabMenu />
    </section>
  );
}
