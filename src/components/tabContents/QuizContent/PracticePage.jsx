import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { ReactComponent as LangIcon } from "../../../assets/language.svg";

const PracticePage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    start();
    return () => {
      reset();
    };
  }, [start, reset]);

  let chapterName;
  const findChapter = () => {
    for (let course of data) {
      for (let chapter of course.chapters) {
        if (chapter.slug === chapterSlug) {
          chapterName = chapter.chapter;
          return chapter.quiz;
        }
      }
    }
    return null;
  };

  const quizArray = findChapter();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // To track the current slide (question)

  useEffect(() => {
    if (submitted) {
      alert("Test has been submitted");
    }
  }, [submitted]);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true); // Trigger submission only when Submit button is clicked
  };

  // Handle Next/Previous navigation
  const handleNextQuestion = () => {
    if (currentQuestion < quizArray.length - 1) {
      setCurrentQuestion((prev) => prev + 1); // Move to the next question
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0)); // Move to the previous question
  };

  return (
    <section className="quizPageContent practicePageContent">
      <div className="headingTimer">
        <h1 className="heading">{chapterName} - Practice</h1>
        <div className="timerLang">
          <h1 className="timer">
            Time: {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>

          <div className="langBtn">
            <LangIcon />
          </div>
        </div>
      </div>

      <div className="bm-question">
        <h4>
          Q#{currentQuestion + 1}: {quizArray[currentQuestion].question}
        </h4>
        <img src={quizArray[currentQuestion].image} alt="Question related" />
        <div className="questionMcqs">
          {quizArray[currentQuestion].options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={selectedAnswers[currentQuestion] === option}
                onChange={() => handleOptionChange(currentQuestion, option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button
            type="button"
            className="prevBtn"
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
        )}

        {currentQuestion < quizArray.length - 1 ? (
          <button
            type="button"
            className="nextBtn"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button className="submitBtn" type="submit" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </section>
  );
};

export default PracticePage;
