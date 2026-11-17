import { useState } from "react";
import CourseItem from "./CourseItem.jsx";
import { initialCourses } from "../data/courses.js";

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    // TODO: 빈 입력 검사, 새 과목 객체 생성, setCourses 호출, 입력창 초기화
    const trimmedName = newName.trim(); //사용자가 입력한 문자열newName의 앞뒤 불필요한 공백을 잘라내 trimmedName이라는 변수에 넣기

    if (!trimmedName) { //!trimmedName "앞뒤 공백을 자르고 났더니 남은 글자가 아무것도 없다면"
      alert("과목명을 입력해 주세요.");
      return;
    }
    //새 과목 객체 만들기
    const newCourse = {
      id: Date.now(),
      name: trimmedName,
      category: "major",
      completed: false,
    };

    setCourses((previous) => [...previous, newCourse]); //...는 기존 배열 안에 들어있던 과목들을 낱개로 쭉 펼쳐서 새 대괄호 [] 안에 넣고, 맨 뒤에 방금 만든 newCourse를 하나 더 붙여서 완전히 새로운 배열을 만듬
    setNewName(""); //input 창에 적혀 있던 글자를 빈 문자열로 비워주기
    setError(""); //이전 에러 메시지가 떠 있었다면 화면에서 지워주기
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    // TODO: map과 spread(...)를 사용하여 해당 id의 completed를 반전
    setCourses(previous =>
      previous.map(course => //기존 과목 배열(previous)을 처음부터 끝까지 하나씩 훑으면서 새로운 배열을 만든다
        course.id === id //지금 검사 중인 과목의 id가 사용자가 체크박스를 클릭한 과목의 id와 같은지 비교. 다르면 기존 course를 그대로 둠
          ? { ...course, completed: !course.completed } //id가 일치하는 과목은 ...course로 기존 정보를 그대로 복사하되, completed 값만 !를 붙여 반전(ex. true → false)시킨 새 객체로 바꿈
          : course
      )
    );
  }

  const doneCount = courses.filter((course) => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat">
          <span>전체 과목</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="stat">
          <span>완료</span>
          <strong className="green">{doneCount}</strong>
        </div>
        <div className="stat">
          <span>진행 중</span>
          <strong className="blue">{courses.length - doneCount}</strong>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header">
          <h2>My Courses</h2>
          <span className="small-note">{courses.length} courses</span>
        </div>
        <p className="todo">
          실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.
        </p>
        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />
          <button className="btn primary" type="submit">
            + Add Course
          </button>
        </form>
        <div className="list-head">
          <span>COURSE</span>
          <span>CATEGORY</span>
          <span>ACTIONS</span>
        </div>
        {courses.length === 0 && (
          <div className="empty">등록된 과목이 없습니다.</div>
        )}
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </section>
    </>
  );
}
