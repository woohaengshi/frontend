'use client';

import { Container, Flex } from '@radix-ui/themes';
import styles from '../auth.module.css';
import { useState } from 'react';

export default function Join() {
  const [userCls, setUserCls] = useState('ai');

  const handleUserCls = (e) => {
    setUserCls(e.target.value);
  };

  return (
    <Container size="2" p="6">
      <div className={styles.member_wrap}>
        <header className={styles.title}>
          <h2>회원가입</h2>
        </header>
        <div className={styles.content}>
          <form action="">
            <div className={styles.input_box}>
              <div className={styles.row}>
                <label htmlFor="user_email">이메일</label>
                <div className={styles.input}>
                  <input type="text" id="user_email" placeholder="이메일을 입력해주세요." />
                </div>
              </div>
              <div className={styles.row}>
                <label htmlFor="user_name">이름</label>
                <div className={styles.input}>
                  <input type="text" id="user_name" placeholder="이름을 입력해주세요." />
                </div>
              </div>
              <div className={styles.row}>
                <label htmlFor="user_pw">비밀번호</label>
                <div className={styles.input}>
                  <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요." />
                </div>
              </div>
              <div className={styles.row}>
                <label htmlFor="user_cls">클래스</label>
                <Flex className={styles.radio_box} justify={'left'} align={'center'}>
                  <div className={`${styles.radio} ${styles.row_left}`}>
                    <input
                      type="radio"
                      id="user_cls_ai"
                      name="user_cls"
                      checked={userCls === 'ai'}
                      onChange={handleUserCls}
                      value="ai"
                    />
                    <label htmlFor="user_cls_ai">AI 엔지니어링</label>
                  </div>
                  <div className={`${styles.radio} ${styles.row_left}`}>
                    <input
                      type="radio"
                      id="user_cls_cloud"
                      name="user_cls"
                      checked={userCls === 'cloud'}
                      onChange={handleUserCls}
                      value="cloud"
                    />
                    <label htmlFor="user_cls_cloud">클라우드 엔지니어링</label>
                  </div>
                  <div className={`${styles.radio} ${styles.row_left}`}>
                    <input
                      type="radio"
                      id="user_cls_service"
                      name="user_cls"
                      checked={userCls === 'service'}
                      onChange={handleUserCls}
                      value="service"
                    />
                    <label htmlFor="user_cls_service">클라우드 서비스 개발</label>
                  </div>
                </Flex>
              </div>
            </div>
            <div className={styles.btn_box}>
              <div className={styles.button}>
                <button id="joinBtn" type="submit">
                  회원가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
