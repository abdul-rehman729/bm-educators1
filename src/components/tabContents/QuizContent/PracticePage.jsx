import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { ReactComponent as LangIcon } from "../../../assets/language.svg";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [unansweredQuestions, setUnansweredQuestions] = useState({}); // To keep track of unanswered questions

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });

    // Mark the question as answered when user selects an option
    setUnansweredQuestions((prev) => {
      const updated = { ...prev };
      delete updated[questionIndex];
      return updated;
    });
  };

  const handleSubmit = () => {
    const unanswered = {};

    // Check for any unanswered questions
    quizArray.forEach((_, index) => {
      if (!selectedAnswers[index]) {
        unanswered[index] = true;
      }
    });

    if (Object.keys(unanswered).length > 0) {
      // If there are unanswered questions, take the user to the first one and display a message
      setUnansweredQuestions(unanswered);
      setCurrentQuestion(parseInt(Object.keys(unanswered)[0], 10));
    } else {
      setSubmitted(true); // Proceed with submission only if all questions are answered
      alert("Test has been submitted");
    }
  };

  // Handle Next/Previous navigation
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, quizArray.length - 1)); // Move to the next question
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
      {unansweredQuestions[currentQuestion] && (
        <p className="unanswered-error">Please select an option</p>
      )}
      <div className="bm-question">
        <h4>
          Q#{currentQuestion + 1}: {quizArray[currentQuestion].question}
        </h4>
        <img src={quizArray[currentQuestion].image} alt="Question related" />
        <div className="questionMcqs">
          {quizArray[currentQuestion].options.map((option) => (
            <label
              key={option}
              className={
                selectedAnswers[currentQuestion] === option ? "active" : ""
              }
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={selectedAnswers[currentQuestion] === option}
                onChange={() => handleOptionChange(currentQuestion, option)}
              />
              <span className="checkmark">
                <FontAwesomeIcon icon={faCheck} />
              </span>
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
          <button className="submitBtn" type="button" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </section>
  );
};

export default PracticePage;
