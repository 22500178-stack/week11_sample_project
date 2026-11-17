import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">2026 FALL SEMESTER</p><h1>My Semester Manager</h1><p className="subtitle">2026학년도 2학기 수강 과목 학습 관리</p></div>
        <span className="tag">2026-2</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>Made with React·Course Manager</span><span>Data resets on page refresh</span></footer>
    </main>
  );
}
