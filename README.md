<div align="center">
  
# LOG:IN PROJECT

### SpringBoot & React를 기반으로 개발한 프로젝트
🥼 한 번의 로그인으로 모든 업무를 할 수 있는 HR 프로그램 🧥

</div>

---

### 개발환경

<div align="center">
  
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> ![JPA](https://img.shields.io/badge/JPA-A5915F.svg?&style=for-the-badge&logo=Java&logoColor=white) <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

</div>

---

### ERD & ENTITY 설계

<div align="center">
  
| ERD | ENTITY |
| --- | --- |
| ![HR-ERD](https://github.com/her9797/LOGIN/assets/153487372/ef2fab5c-e7c3-4bcc-80fd-62923f3a07ab) | ![HR-ENTITY](https://github.com/her9797/LOGIN/assets/153487372/75941059-cea7-4d61-9e9a-0c9d993b41b6) |

</div>

---

### REST API 설계

<div align="center">
  
| REST API (Notion) |
| --- |
| ![REST API 설계](https://github.com/her9797/LOGIN/assets/153487372/cc9ec968-378a-47bf-854d-63aba5213d06) |

</div>

---

### 프로토타이핑

<div align="center">
  
| 화면 설계 (Figma) |
| --- |
| ![FIGMA 프로토타이핑](https://github.com/her9797/LOGIN/assets/153487372/6e5fb7b1-190d-4bcb-8aeb-9c8eb1abd7ff) |

</div>

---

### PART

<div align="center">
  
| 채팅 | 통계 | 공지사항 | 쪽지 |
| --- | --- | --- | --- |
| ![chat](https://github.com/her9797/LOGIN/assets/153487372/1de8a840-061b-4581-9417-9b0b54d3fac7) | ![통계](https://github.com/her9797/LOGIN/assets/153487372/6a81994a-bd1c-46fa-a16e-c2fd61e729b5) | ![공지사항](https://github.com/her9797/LOGIN/assets/153487372/40494317-095b-48c8-ae4d-1cd99d856a15) | ![쪽지](https://github.com/her9797/LOGIN/assets/153487372/2e5dfa54-1e00-4f26-8484-42b2af00d2c0) |

</div>

---

### 기능

- **채팅(실시간 채팅 기능 구현)**
  - React를 사용하여 웹소켓 클라이언트 구현 및 사용자 인터페이스 개발
  - Spring Boot와 STOMP를 사용하여 웹소켓 서버 구축 및 메시지 브로커 설정
  - 직원 간 원활한 소통을 위한 실시간 메시지 송수신 기능 개발

- **통계(인사이트)**
  - React와 Chart.js를 사용하여 데이터 시각화 화면 구현
  - 데이터베이스에서 실시간 데이터 분석 및 시각화를 위한 기능

- **공지사항**
  - Quill 에디터를 사용하여 공지사항 본문 꾸밀 수 있도록 구현
  - 여러 파일을 동시에 업로드하고 저장 가능한 파일 업로드 기능 추가
  - 개별 파일 다운로드 기능 지원

- **쪽지**
  - 쪽지 목록에서 사용자 프로필 사진 표시 구현
  - 받은 쪽지에는 답장 기능 추가, 보낸 쪽지는 답장 기능 제외하여 단방향 통신 지원

- **기타 기능**
  - 날씨 API, 디지털 및 아날로그 시계, 통계, 공통 컴포넌트(사이드바, 헤더 등) 구현
  - 직원 건의 기능 추가 및 알림 기능 보완
