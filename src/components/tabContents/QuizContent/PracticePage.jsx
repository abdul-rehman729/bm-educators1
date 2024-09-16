import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook'; // Use react-timer-hook

const PractisePage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({ autoStart: false });

  useEffect(() => {
    start(); // Start the timer when the page is loaded

    return () => {
      reset(); // Reset the timer when the user leaves the page
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

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section className='practicePageContent'>
      <div>
        <h3>Time Elapsed: {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
      </div>

      <h1>{chapterName} - Practise</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {quizArray.map((quiz, index) => (
          <div key={index} className="bm-question">
            <p>{quiz.question}</p>
            {quiz.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option}
              </label>
            ))}
            {submitted && (
              <p className="bm-feedback">
                {selectedAnswers[index] === quiz.answer
                  ? 'Correct!'
                  : `Wrong! The correct answer is ${quiz.answer}`}
              </p>
            )}
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </section>
  );
};

export default PractisePage;
