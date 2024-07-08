<div align="center">
  
# LOG:IN PROJECT

### SpringBoot & React를 기반으로 개발한 프로젝트
🥼 한 번의 로그인으로 모든 업무를 할 수 있는 HR 프로그램 🧥

</div>

### 개발환경

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> ![JPA](https://img.shields.io/badge/JPA-A5915F.svg?&style=for-the-badge&logo=Java&logoColor=white) <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### ERD & ENTITY 설계
|ERD|ENTITY|
|---|---|
|![HR-ERD](https://github.com/her9797/LOGIN/assets/153487372/ef2fab5c-e7c3-4bcc-80fd-62923f3a07ab)|![HR-ENTITY](https://github.com/her9797/LOGIN/assets/153487372/75941059-cea7-4d61-9e9a-0c9d993b41b6)|



### PART

|채팅|통계|공지사항|쪽지|
|---|---|---|---|
|![chat](https://github.com/her9797/LOGIN/assets/153487372/1de8a840-061b-4581-9417-9b0b54d3fac7)|![통계]![instie](https://github.com/her9797/LOGIN/assets/153487372/6a81994a-bd1c-46fa-a16e-c2fd61e729b5)|![공지사항]![announce](https://github.com/her9797/LOGIN/assets/153487372/40494317-095b-48c8-ae4d-1cd99d856a15)|![쪽지]![note](https://github.com/her9797/LOGIN/assets/153487372/2e5dfa54-1e00-4f26-8484-42b2af00d2c0)|
|웹소켓 통신|chart.js|Quill editor|쪽지|

### 기능
```
실시간 채팅 기능 구현
 - React를 사용하여 웹소켓 클라이언트 구현 및 사용자 인터페이스 개발
 - Spring Boot와 STOMP를 사용하여 웹소켓 서버 구축 및 메시지 브로커 설정
 - 실시간 메시지 송수신 기능 개발로 직원 간 원활한 소통 지원

인사이트
 - React와 Chart.js를 사용하여 데이터 시각화 화면 구현
 - Native 쿼리와 기존 로직을 재사용하여 데이터베이스에서 실시간 데이터를 가져와 분석 및 시각화

공지사항
 - Quill 에디터를 사용하여 공지사항 본문을 꾸밀 수 있도록 구현
 - 파일 업로드 기능을 추가하여 여러 파일을 배열 형태로 동시에 업로드 및 저장
 - 파일 다운로드 기능을 추가하여 개별 파일을 다운로드할 수 있도록 구현

쪽지
 - 쪽지 목록에서 사용자 프로필 사진 표시 구현
 - 받은 쪽지: 답장 기능 추가하여 송신자에게 답장이 가능하도록 구현
 - 보낸 쪽지: 답장 기능 제외하여 단방향 통신만 가능하도록 구현

그 외
 - 공통 : 날씨 API / 디지털 시계 및 아날로그 시계 / 통계 / 공통 컴포넌트(사이드바 / 헤더 등)작업
 - 건의함 : 직원들의 건의 기능 추가
 - 알림 : 기존 출퇴근 정정 신청 시 발생하는 알림의 미구현으로 인한 보수
```
