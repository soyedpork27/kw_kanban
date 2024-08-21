# KeyboardWarrior의 칸반보드 입니다.

- 제작 목적 : 멋진 토이 프로젝트, 계획적 삶

- 프로젝트 시작 : 2024-08-10

- 예상 FE 완료일 : 2024-08-16

- 예상 완료일 : 2024-08-31

---

## 어필하고 싶은 부분!

- useContext : 칸반 타입 배열 전역적으로 상태 관리, 전역 스테이트를 제어하는 사용자 커스텀 설정 적용하기(진행중인 이슈 개수 제한)

- Throttle : 잦은 이벤트(드래그 앤 드롭)로 야기되는 통신 요청 과다를 막아 서버 부담 줄임

---

## 사용 기술

- useContext : 칸반 타입 배열 전역적으로 상태 관리, 전역 스테이트를 제어하는 사용자 커스텀 설정 적용하기(진행중인 이슈 개수 제한)

- 드래그 이벤트 : 칸반 요소 드래그 이동 구현

- react-calendar : 칸반 요소별 날짜 선택과 CSS오버라이드를 활용해 react-calendar 커스텀 스타일링 경험

- redux : 회원 전역 상태관리를 통한 로그인 회원가입 기능 구현

- Throttle : 잦은 이벤트(드래그 앤 드롭)로 야기되는 통신 요청 과다를 막아 서버 부담 줄임

- axios (http 통신을 위한 라이브러리)

- node.js - express kanban 데이터 저장을 위한 서버

- mysql (kanban 데이터와 회원 정보 저장을 위한 DB)

---

## 사용 예정 기술

- jwt (로그인 회원 정보를 식별하기 위한 토큰)

--- 

## 이슈와 해결

### 1. 쓰로틀링 이슈

#### 1-1. 문제
- 쓰로틀링 구현에는 성공했으나 브라우저를 닫는 경우 쓰로틀링으로 지연시킨 통신 요청이 취소됨

#### 1-2. 해결
- context 컴포넌트의 useEffect와 beforeunload 이벤트를 활용해 get 요청을 전송했으나 쓰로틀링 중첩된 만큼 useEffect 가 실행되어 get 요청이 여러개 전송됨

- Timer 컴포넌트를 생성하여 쓰로틀링을 Timer 컴포넌트 내부에서 useEffect로 구현, 그 후 context 컴포넌트에서 beforeunload 이벤트를 사용해 종료 시 딱 한번의 get 요청을 전송하는데에 성공함

#### 1-3. 아쉬운 점
- 쓰로틀링 지연 중 딱 한번의 전송에는 성공했으나 useEffect를 활용한 쓰로틀링 구현의 한계가 있었음 / 브라우저 종료만을 다루는 이벤트가 없다는 점이 아쉬웠음

### 2. CRUD 구현의 어려움

#### 2-1. 문제

#### 2-2. 해결

#### 2-3. 아쉬운 점

---