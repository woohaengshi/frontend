'use client';

import { Box, Strong, Text } from '@radix-ui/themes';
import { useRef, useState } from 'react';
import styles from './UserProfile.module.css';
import ico_profile_img_file from '@/assets/icons/profile_img_file.png';
import Image from 'next/image';
import MypageTabMenu from './MypageTabMenu';
import { patchProfileImg } from '@/apis/authApi';

import rankingImg from '@/assets/icons/ranking_profile_img.png';
import useUserInfo from '@/hooks/useUserInfo';

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

    //FileReader(브라우저에서 파일을 읽을 수 있도록 도와주는 API)객체 생성
    const reader = new FileReader();
    // readAsDataURL 메서드가 파일을 읽고, 그 결과를 Base64로 인코딩된 데이터 URL로 변환
    reader.readAsDataURL(file);

    // onloadend는 파일을 읽는 작업이 완료된 후 호출되는 이벤트 핸들러
    reader.onloadend = async () => {

      //파일이 성공적으로 읽히면, 그 결과(reader.result)는 데이터 URL -> 화면에 미리보기
      const result = reader.result as string; 
       
      setImgUrl(result); // 읽은 결과를 imgUrl에 설정

      //이미지 파일을 서버로 전송하기 위해 FormData 객체를 생성
      const formData = new FormData();  
      // FormData는 key-value 형태로 데이터를 담아 전송할 수 있는 객체로, 파일을 포함한 데이터를 서버에 보낼 때 유용
      formData.append('image', file);
 

      console.log(formData);
      

      const response = await patchProfileImg(formData);
      console.log(response);
      

      if (response.ok) {  
        console.log('프로필 이미지 업데이트 성공');
        alert('프로필 이미지가 성공적으로 업데이트 되었습니다.');
      } else {
        const errorData = await response;
        console.error('프로필 이미지 업데이트 실패', errorData);
      }
    };
  };

  const imageChangeHandler = () => {
    if (imgRef.current) {
      imgRef.current.click(); // imgRef.current가 null이 아닐 때만 클릭 이벤트 발생
    }
  };

  const userInfo = useUserInfo();

  return (
    <section className="user_profile">
      <div className={styles.user_info}>
        <div className={styles.img_box}>
          <div className={styles.back_img} style={{ backgroundImage: `url(${imgUrl ? imgUrl : ''})` }}>
            {!imgUrl && <Image src={rankingImg} alt={`프로필 이미지`} width={180} height={180} />}
          </div>
          <div className={styles.btn_file}>
            <input type="file" ref={imgRef} onChange={onChangeImage} />
            <button onClick={imageChangeHandler}>
              <Image src={ico_profile_img_file} alt="프로필 이미지 변경하기" width={18} height={18} />
            </button>
          </div>
        </div>
        <Box mt="3" className={styles.txt_box}>
          <Strong>{userInfo?.name}</Strong>
          <Text as="p" size="3" weight="medium">
            {userInfo?.course}
          </Text>
        </Box>
      </div>
      <MypageTabMenu />
    </section>
  );
}
