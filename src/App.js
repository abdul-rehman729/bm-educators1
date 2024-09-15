import './App.css';
import Tabs from './components/tabs';
import './custom.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnlineCourses from './components/tabContents/onlineCourses';
import ScheduleClasses from './components/tabContents/scheduleClasses';
import quizzesData from './assets/data/quizzes.json'; 
import Quiz from './components/tabContents/quiz';
import Chapter from './components/tabContents/Chapter';
import Quizes from './components/tabContents/Quizzes';
import QuizPageButtons from './components/tabContents/QuizPageButtons';
import RevisionPage from './components/tabContents/QuizContent/RevisionPage';
import TestPage from './components/tabContents/QuizContent/TestPage';
import PractisePage from './components/tabContents/QuizContent/PractisePage';
import { TimerProvider } from './Context/TimerContext';


function App() {
  return (
  <TimerProvider>
    <Router>
      <div className="bm-main">
        <Tabs />
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/schedule-classes" element={<ScheduleClasses />} />
          <Route path="/online-classes" element={<OnlineCourses />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/chapter/:chapterSlug/quiz" element={<QuizPageButtons data={quizzesData} />} />
          <Route path="/chapter/:chapterSlug/revision" element={<RevisionPage data={quizzesData} />} />
          <Route path="/chapter/:chapterSlug/test" element={<TestPage data={quizzesData} />} />
          <Route path="/chapter/:chapterSlug/practise" element={<PractisePage data={quizzesData} />} />

          <Route path="/chapters/:courseSlug" element={<Quizes courses={quizzesData} />} />
          <Route path="/quiz/course/:courseSlug/chapter/:chapterSlug" element={<Quiz courses={quizzesData} />} />
          
          <Route path="/progress" element={<div>Progress</div>} />
        </Routes>
      </div>
    </Router>
  </TimerProvider>
  );
}

export default App;
