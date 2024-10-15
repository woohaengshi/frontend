# 🐾 제목
> 2023년 여름학기, 산학연계프로젝트 5조 딩동팀입니다.
> 
<br/>

## 🧑‍💻 프로젝트 소개
> 프로젝트명

딩동 커뮤니티✈️   
[딩동커뮤니티에 접속하고 싶다면? 클릭해주세요! 👀](https://dingdong-front.vercel.app/)   
<div>테스트 유저 ID: user1@email ~ user6@email</div>   
<div>테스트 유저 PW: user1 ~ user6   </div>

<br/>

> 프로젝트 목표

하나의 게시글에서 독립적인 댓글이 허용된 커뮤니티로 댓글이 하나의 '객체'로 작용하도록 구현하는 것을 목표로 합니다.

<br/>

> 과제 접근 방법

사용자가 게시글, 답변 그리고 댓글을 스크랩하는 동작을 보이면 전체 복제본을 사용자가 가지게 됩니다.<p> 따라서 본문이나 다른 요소들이 삭제되더라도 저장된 요소는 사용자의 마이페이지에서 확인할 수 있습니다.

<br/>

## 🎞️ 시연영상
> 비로그인 상태인 경우

https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/96400257/600cb770-32b7-48e9-a07e-87b7f9f425e9

<br/>

> 로그인 상태인 경우

<b>'탈중앙화'라는 프로젝트 특성을 가장 많이 반영한 부분입니다.</b>

https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/96400257/8d8ee6c3-4df4-4741-927b-1ef0b67dc947

<br/>

## ⚙️ 시스템 아키텍처
> 다음은 프로젝트 구조도입니다.
<p align="center"><img src="https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/87259219/05093568-9cfe-49ca-8954-53550fc90bf8" width="70%" height="50%"></p>

<br/>

## 🧨 패키지설치
- backend
```
cd server
yarn install
node server.js
```
- frontend
```
yarn install
yarn start
```

<br/>

## 📚 기술 스택
<b>Common</b>   
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white">   
<b>Frontend</b>   
<img src="https://img.shields.io/badge/react-444444?style=flat-square&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/recoil-f26b00?style=flat-square&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white">   
<b>Backend</b>   
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white">

<br/>

## 🫧 기대효과
- 탈중앙적 구조의 Q&A 게시판으로 한 게시글에 속한 모든 요소들을 객체화시켰습니다.
- 투표 기능을 추가하여 정보 판별에 유용합니다.
- 해시태그 기능이 있어 정보를 카테고리화할 수 있습니다.
- 검색기능을 추가하여 원하는 정보를 원활하게 찾을 수 있습니다.

<br/>

## 🗂️ 폴더구조

```yaml

├── .next ▶️ Next의 빌드 결과물 폴더
├── node_modules ▶️ 프로젝트 관련 JS 라이브러리가 설치된 폴더
├── public ▶️ 이미지, 폰트와 같은 정적 자원들을 배치하는 폴더
│   ├── easteregg/ ▶️ 이스터에그 폴더
│   ├── icons/ ▶️ 아이콘 폴더
│   ├── imgs/ ▶️ 이미지 폴더
│   └── fonts/ 폰트 폴더 
├── app/ ▶️ 앱 라우팅 폴더
│   ├── (auth)/ ▶️ 인증 인가 폴더 
│   ├── actions/ ▶️ auth.js 함수 호출 폴더 
│   ├── api/auth/[...nextauth]/ ▶️ auth.js 설정 폴더
│   ├── mypage/ ▶️ 마이페이지 폴더
│   ├── ranking/ ▶️ 순위조회 폴더
│   ├── record/ ▶️ 기록확인 폴더
│   ├── study/ ▶️ 공부시작 폴더
│   ├── page.tsx ▶️ root 경로 페이지 
│   └── layout.tsx ▶️ root 경로 레이아웃 구조 
├── components/ ▶️ 컴포넌트 폴더 
│   ├── common/ ▶️ 공통 컴포넌트 폴더
│   │   ├── Header/
│   │   │   ├── Header컴포넌트.tsx
│   │   │   └── Header컴포넌트.module.css
│   │   ├── Modal/
│   │   │   ├── Modal컴포넌트.tsx
│   │   │   └── Modal컴포넌트.module.css
│   │   ├── 컴포넌트.tsx
│   │   └── 컴포넌트.module.css
│   ├── 라우팅폴더명/컴포넌트.tsx
│   └── 라우팅폴더명/컴포넌트.module.css 
├── constants/
│   └── 상수명.ts
├── hooks/
│   └── 커스텀훅.ts
├── apis/
│   ├──  instancs.ts ▶️ api 요청 기본 설정 파일
│   └──  도메인Api.ts
├── stores/
│   └──  도메인Store.ts
├── types/
│   └──  도메인Type.ts
├── utils/
│   └──  기능명Utils.ts
├── .eslintrc.json ▶️ ESLint 설정 파일
├── .gitignore ▶️ 깃 이그노어 파일
├── jsconfig.json ▶️ VSCode 설정 파일
├── next.config.mjs ▶️ 넥스트 설정 파일
├── package-lock.json ▶️ 라이브러리 의존 관계 설정 파일
└── package.json ▶️ NPM 프로젝트 설정 파일
```

<br/>

## 👻 팀원구성
| <img src="https://github.com/riverkite0708.png" width="200" height="200" /> | <img src="https://github.com/Kong-E.png" width="200" height="200" /> | <img src="https://github.com/doyi0107.png" width="200" height="200" /> |
|:---:|:---:|:---:|
| [강재연](https://github.com/riverkite0708) | [공소연](https://github.com/Kong-E) | [이도이](https://github.com/doyi0107) |
| 프론트엔드 | 프론트엔드 | 프론트엔드 |

| <img src="https://github.com/khwoowoo.png" width="200" height="200" /> | <img src="https://github.com/rlfrkdms1.png" width="200" height="200" /> | <img src="https://github.com/doyi0107.png" width="200" height="200" /> | <img src="https://github.com/doyi0107.png" width="200" height="200" /> |
|:---:|:---:|:---:|:---:|
| [강현우](https://github.com/khwoowoo) | [길가은](https://github.com/rlfrkdms1) | [김혜빈](https://github.com/doyi0107) | [공예진](https://github.com/doyi0107) |
| 백엔드 | 백엔드 | 백엔드 | 백엔드 |


### 💙  이용 방법 💙
<img width=800px src="https://github.com/user-attachments/assets/b5d300f4-778d-4983-9129-e69c3a6516a2">
<img width=800px src="https://github.com/user-attachments/assets/c4586f30-75b2-4617-a1d6-c27180aaaff6">
<img width=800px src="https://github.com/user-attachments/assets/da35bb36-fab1-422c-9499-15c512981eb9">


<br>

 - L1: 과목 선택 및 추가하기
 - L2: 재생/정지 버튼을 클릭해서 시간 측정하기
 - L3: 랭커 확인하기
 - L4: 나머지 등수 확인하기
 - L5: 이름으로 검색하기
 - L6: 학습한 과목 확인하기
 - L7: 총/평균 시간 확인하기
 - L8: 달력으로 학습기록 확인하기

<br>

## 💙 UI 스타일 가이드라인  💙
![스타일 가이드 (github 용) 무시하세요](https://github.com/user-attachments/assets/50fdb176-756b-4ec9-85d2-a90d75b0e2f9)

<br>

## 💙 ESLint 룰셋 목록 💙
```
 {
     rules: {
         semi: ['error', 'always'],
         quotes: ['warn', 'single'],
         'no-unused-vars': 'warn',
         indent: ['error', 4],
     },
 }
```
#### 1. `semi`
**설정:** `"semi": ["error", "always"]` <br>
**이유:** 모든 문장 끝에 세미콜론을 사용하도록 강제. 자동 세미콜론 삽입(ASI)로 인한 예기치 않은 동작을 방지할 수 있기 때문에 추가.
#### 2. `quotes`
**설정:** `"quotes": ["warn", "single"]` <br>
**이유:** 코드 내에서 일관된 따옴표 스타일을 유지. 'single'로 통일하기 위해 추가.
#### 3. `no-unused-vars`
**설정:** `"no-unused-vars": "warn"` <br>
**이유:** 선언했지만 사용하지 않은 변수가 있으면 경고를 해줌. 불필요한 코드와 잠재적인 버그를 방지하기위해 추가.
#### 4. `indent`
**설정:** `"indent": ["error", 4]` <br>
**이유:** 코드 가독성과 일관성을 위해 들여쓰기를 4칸으로 통일. 


<br>

## 💙 Lighthouse 성능 지표 💙
### 개선 전
 - 문제점: <img> 태그에서 alt 누락
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/890129f5-fdc6-4a64-96f4-93e88309acab">
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/d1c42379-833a-44ca-8443-9a789a118494">

### 개선 후
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/84455224-1711-40f6-8679-8e54cca17043">

<br>


## 💙 Commit 방법 💙  
꼭 다음의 방법을 따라서 커밋할 필요는 없지만, 알아보기 쉽게하기 위함.
\
커밋의 제목은 타입을 기재 후 간단한 요약(명령조)을 기재 함.
\
본문 작성시 자세한 내용을 누구든 알아볼 수 있기 기재 함(어떻게 보다 **왜**에 초점을 맞춰 작성).
\
**타입은 다음과 같음.**
* feat : 새로운 기능 추가
* fix : 버그 수정
* docs : 문서 수정
* style : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
* refactor : 코드 리팩터링
* test : 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X)
* chore : 빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)
* design : CSS 등 사용자 UI 디자인 변경
* comment : 필요한 주석 추가 및 변경
* rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
* remove : 파일을 삭제하는 작업만 수행한 경우
* !BREAKING CHANGE : 커다란 API 변경의 경우
* !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우

예시
feat : 타워 추가
