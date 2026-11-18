# OSS Week 11 — React Course Manager

## Project Information:

- 프로젝트 소개: React 기반의 과목 관리 및 투두 리스트 앱
- 주요 기능: 과목 통계 대시보드, 과목 추가, 완료 상태 변경, 과목 삭제
- 원본 sample project URL: https://github.com/2026-2-OSS/week11_sample_project.git

## installation

1. 프로젝트 클론 및 이동
   터미널을 열고 아래 명령어를 입력하여 프로젝트 저장소를 복제하고 폴더로 이동합니다.
```bash
git clone <깃허브_저장소_주소>
cd <프로젝트_폴더명>

2. 패키지 설치
npm install

3. 개발서버 실행
npm run dev
```

## Source Code exploration
### 주요파일 3개
- `src/App.jsx`: 애플리케이션의 최상위 레이아웃(header, footer)을 구성하고 CourseList 컴포넌트를 렌더링한다.
- `src/components/CourseList.jsx`: useState로 과목 목록(courses)과 입력값(newName) 상태를 관리하며, 통계 계산, 추가 폼, 그리고 CourseItem 목록을 렌더링하는 핵심 부모 컴포넌트이다.
- `src/components/CourseItem.jsx`: 부모(CourseList)로부터 개별 과목 데이터(course)와 이벤트 핸들러(onDelete, onToggle)를 Props로 받아 화면에 한 줄씩 표시하는 자식 컴포넌트이다.
### Component와 Props 관계
- 부모인 CourseList 가 course.map(...)을 통해 각 과목 객체(course)와 상태 변경 함수(onDelete, onToggle)를 CourseItem(자식)에게 Props로 전달한다.
- 자식 컴포넌트인 CourseItem은 상태를 직접 수정하지 않고, 버튼 클릭이나 체크박스 변경 시 부모가 내려준 함수를 호출해서 부모의 상태를 업데이트하도록 요청한다.
### useState 및 Event 분석
useState(initialCourses)로 초기 과목 배열을 상태에 저장하고, Delete 버튼을 클릭했을때 handleDelete(id)가 실행되며, 기존 배열을 직접 수정하지 않고 courses.filter(course => course.id !== id)로 해당 id만 제외한 새로운 배열을 생성해서 setCourses에 전달해 화면을 리렌더링한다.
### 주요 코드 2개 설명
- handleAdd(): 빈 입력값을 방지하기 위해 trim()으로 앞뒤 공백을 제거한 뒤 검사하며, 스프레드 연산자(...)를 이용해 기존 과목 목록을 펼치고 새로운 과목 객체를 뒤에 추가하여 상태를 업데이트한다.
- handleToggle(): map메서드를 사용해서 기존 배열을 순회하면서, 클릭한 과목의 id와 일치하는 항목만 completed 값을 반전시킨 새로운 객체로 교체한다(!course.completed). 기존 배열을 유지하면서 특정 아이템만 수정한다.

## Customizing
### 수정한 데이터
과목을 현재 수강하고 있는 과목명들로 바꿨다.
- 오픈소스 스튜디오, 컴퓨터 구조, 기독교 변증학, 웹 서비스 개발, 이산 수학
### 수정한 텍스트
- header파트의 topline의 작은 paragraph 텍스트를 OPEN SOURCE STUDIO · WEEK 11=>2026 FALL SEMESTER로 바꾸었고, h1 텍스트는 My Course Manager=>My Semester Manager로 바꾸었다. subtitle의 paragraph텍스트는 React Component, Props & State Practice=>2026학년도 2학기 수강 과목 학습 관리로 바꾸었다. tag는 STUDENT STARTER=>2026-2로 바꾸었다.
- footer파트의 왼쪽은 OSS Week 11 · React=>Made with React·Course Manager로, 오른쪽은 Local state only · Refresh resets data=>Data resets on page refresh로 바꾸었다.
### 수정한 스타일
- 배경색: :root 안의 background:#f5f7fb => background:#f3f1ff
- 상단 포인트 컬러&태그: .topline의 color:#4b71ce => color:#916af4 & .tag의 color:#4568b4; background:#e6edfe => color:#124a9d;background:#b1c9ff
- 메인 버튼 색상: .btn.primary의 background:#496fd3 => background:#505ce2 와 .btn.primary:hover의 background:#365bb7 => background:#9e93fb

## Feature Extension
### handleAdd(): 새로운 과목 추가 기능
- 기능 설명: 사용자가 입력창에 새로운 과목명을 적고 'Add' 버튼을 누르거나 엔터를 쳤을 때, 공백 검사를 거친 후 새로운 과목 객체를 생성해 기존 목록에 추가하는 기능
- 동작 결과: 빈 칸인 상태로 입력하면 경고창이 뜬다. 올바른 과목명을 입력하고 추가버튼을 누르면, 전체 과목 수와 '진행 중' 카운트가 실시간으로 1 증가하며 리스트 하단에 새 과목이 렌더링된다. 또한 입력창은 자동으로 비워진다.
### handleToggle(): 과목 완료 상태 토글 기능
- 기능 설명: 사용자가 특정 과목의 체크박스를 클릭했을 때, 해당 과목의 완료 상태(completed)를 true나 false로 반전시켜 주는 기능
- 동작 결과: 특정 과목의 체크박스를 누르면 대시보드의 '완료' 숫자는 올라가고 '진행 중' 숫자는 줄어든다. 과목에 완료상태 스타일이 동적으로 적용되며, 다시 누르면 원래 상태로 해제된다.

## Deployment
https://week11-sample-project-9zq5.vercel.app/

## Weekly Review
### 새롭게 배운 내용 3가지
- 리액트가 단순히 데이터를 바꾸는 게 아니라, 원본 배열을 직접 건드리지 않고 spread 연산자와 map, filter를 통해 새로운 배열을 만들어 상태를 업데이트하는 것이라는 것
- 부모 컴포넌트인 CourseList에서 상태를 관리하고, 자식 컴포넌트인 CourseItem과 상호작용하기 위해 이벤트 핸들러 함수를 props로 내려주는 단방향 데이터 흐름 구조를 알게됨
- 추가기능 구현시 입력값의 앞뒤 공백을 제거하는 trim()과, 빈 값 입력 시 alert로 안내하는 예외 처리의 중요성을 알게됨
### 어려웠던 점과 해결 방법
- 과목 추가 기능을 구현하는 과정에서, 선언되지 않은 상태(state)인 setError나 newCategory를 참조하는 코드가 섞여 들어가 실행 시 데이터가 입력 및 등록이 되지 않는 에러가 발생했다. 처음에는 코드가 왜 작동하지 않는지 당황스러웠지만, 함수 내부에서 사용하는 변수들과 컴포넌트 상단에 정의된 useState 목록을 확인해서 원인을 알 수 있었다. 그래서 setError 대신 alert가능으로 경고메세지를 띄우고, 선언되지 않은 newCategory대신 카테고리를 지정해 넣어주었다.
### AI 활용 내용 및 느낀 점
- 전체적인 코드 흐름을 이해하기 위해서 AI에게 분석을 요청해 어떤 파일이 어떤 역할을 하는지 분석하였다. 또한 과목 추가 기능이나 과목 완료 상태 토글 기능을 구현할 때 코드 흐름을 어떻게 작성해야하는지 도움을 받았는데, AI의 지시대로 코드를 작성하다보니 위에 선언되지 않았던 setError나 newCategory를 사용해버리는 에러가 발생했기에 앞으로는 더 꼼꼼히 기존 코드를 살펴보고 선언되지 않은 변수를 사용해 오류가 나지 않도록 확인해야겠다고 다짐하였다.