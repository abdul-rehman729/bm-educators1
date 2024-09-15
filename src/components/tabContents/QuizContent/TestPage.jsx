import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TimerContext } from "../../../Context/TimerContext";
import Timer from "../Timer";

const TestPage = ({ data }) => {
  const { stopTimer } = useContext(TimerContext);
  const { chapterSlug } = useParams(); // Get the course slug from the URL
  let chapterName;
  // Find the chapter in the data
  const findChapter = () => {
    for (let course of data) {
      for (let chapter of course.chapters) {
        if (chapter.slug === chapterSlug) {
          chapterName = chapter.chapter;
          return chapter.quiz; // Return the quiz array if the chapter is found
        }
      }
    }
    return null; // Return null if the chapter is not found
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
    stopTimer(); // Stop the timer when the quiz is submitted
    alert("Quiz submitted!!");
  };
  return (
    <section>
      <Timer />

      <h1>{chapterName}-Test</h1>
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
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </section>
  );
};

export default TestPage;
