import './App.css';
import Tabs from './components/tabs';
import './custom.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnlineCourses from './components/tabContents/onlineCourses';
import ScheduleClasses from './components/tabContents/scheduleClasses';
import Quizes from './components/tabContents/quizes';
import Chapters from './components/tabContents/chapters';
import quizzesData from './assets/data/quizzes.json'; 
import Quiz from './components/tabContents/quiz';

function App() {
  return (
    <Router>
      <div className="bm-main">
        <Tabs />
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/schedule-classes" element={<ScheduleClasses />} />
          <Route path="/online-classes" element={<OnlineCourses />} />
          <Route path="/quizes" element={<Quizes />} />
          
          <Route path="/chapters/:courseSlug" element={<Chapters courses={quizzesData} />} />
          <Route path="/quiz/course/:courseSlug/chapter/:chapterSlug" element={<Quiz courses={quizzesData} />} />
          
          <Route path="/progress" element={<div>Progress</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
