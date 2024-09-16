import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';

const RevisionPage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({ autoStart: false });
  const navigate = useNavigate();

  useEffect(() => {
    start(); // Start the timer when the page is loaded

    return () => {
      reset(); // Reset the timer when the user leaves the page
    };
  }, [start, reset]);

  let chapterName;
  let courseSlug; // Add courseSlug to store the course information
  
  const findChapter = () => {
    for (let course of data) {
      for (let chapter of course.chapters) {
        if (chapter.slug === chapterSlug) {
          chapterName = chapter.chapter;
          courseSlug = course.slug; // Save the courseSlug to navigate back
          return chapter.quiz;
        }
      }
    }
    return null;
  };

  const quizArray = findChapter();

  return (
    <section className='revisionPageContent'>
      <div>
        <h3>Time Elapsed: {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
      </div>

      <h1>{chapterName} - Revision</h1>
      {quizArray.map((quiz, index) => (
        <div key={index} className="bm-question">
          <h4>Q: {quiz.question}</h4>
          <p>Ans: {quiz.answer}</p>
        </div>
      ))}

      {/* Navigate back to the quizzes for the current course */}
      <button onClick={() => navigate(`/quizzes/${courseSlug}`)}>Revision Completed</button>
    </section>
  );
};

export default RevisionPage;
