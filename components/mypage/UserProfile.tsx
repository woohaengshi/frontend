"use client";

import { Avatar, Box, Strong, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import styles from './UserProfile.module.css';
import ico_profile_img_file from '@/assets/icons/profile_img_file.png';
import Image from "next/image";
import MypageTabMenu from "./MypageTabMenu";

export default function UserProfile() {
  const [imgUrl, setImgUrl] = useState('');
  const imgRef = useRef();

  const onChangeImage = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    }
  };
 
  return (
    <section className="user_profile">
      <div className={styles.user_info}>
        <div className={styles.img_box}>
          <div className={styles.back_img} style={{backgroundImage: `url(${imgUrl ? imgUrl : ''})`,}}>
            <Avatar size="8" fallback="" radius="full"></Avatar>
          </div>
          <div className={styles.btn_file}>
            <input type="file" ref={imgRef} onChange={onChangeImage}/>
            <button onClick={()=>{imgRef.current.click()}}>
              <Image src={ico_profile_img_file} alt="프로필 이미지 변경하기" width={18} height={18}/>
            </button>
          </div>
        </div>
        <Box mt="3" className={styles.txt_box}>
          <Strong>홍길동</Strong>
          <Text as="p" size="3" weight="medium">클라우드 서비스</Text>
        </Box>
      </div>
      <MypageTabMenu />
    </section>
  );
}