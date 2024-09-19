import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";

const RevisionPage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });
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
    <section className="quizPageContent revisionPageContent">
      <div className="headingTimer">
        <h1 className="heading">{chapterName} - Revision</h1>
        <h1 className="timer">
          Timer:{" "}
          <span>
          {hours < 10 ? `0${hours}` :hours}:{minutes < 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </h1>
      </div>
      {quizArray.map((quiz, index) => (
        <div key={index} className="bm-question">
          <h4>Q: {quiz.question}</h4>
          <p><b>Ans:</b> {quiz.answer}</p>
        </div>
      ))}

      {/* Navigate back to the quizzes for the current course */}
      <button className="submitBtn" onClick={() => navigate(`/quizzes/${courseSlug}`)}>
        Revision Completed
      </button>
    </section>
  );
};

export default RevisionPage;
