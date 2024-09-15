import React, { useState, useEffect } from 'react';
import { ReactComponent as QuizIcon } from "../../assets/quiz.svg";
import quizzesData from '../../assets/data/quizzes.json'; // Import the JSON file
import { useNavigate } from 'react-router-dom';

function Quizes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuizzes(quizzesData);
  }, []);

  const handleCourseClick = (courseSlug) => {
    // Navigate to the chapters of the selected course
    navigate(`/chapters/${courseSlug}`);
  };

  return (
    <div className="bm-courses tab-content">
      <h1 className="heading">
        My Quizes <QuizIcon />
      </h1>
      <ul className="bm-courses-lists">
        {quizzes.map((quiz, index) => (
          <li key={index} onClick={() => handleCourseClick(quiz.slug)}>
            <span><p className='quizNo'>Quiz #{index + 1} </p><p className='chaptersNo'>Chapters: {quiz.chapters.length}</p></span> {/* Displaying course number */}
            <p className='quizName'>{quiz.course}</p> {/* Displaying course name */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quizes;
