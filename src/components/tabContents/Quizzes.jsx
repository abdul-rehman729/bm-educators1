import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizOptionsPopup from "./QuizOptionsPopup";
import { TimerContext } from "../../Context/TimerContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ReactComponent as ChapterIcon} from "../../assets/chapter.svg"

function Quizes({ courses }) {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const selectedCourse = courses.find((course) => course.slug === courseSlug);

  // State to handle the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedChapterSlug, setSelectedChapterSlug] = useState(null);
  const {resetTimerOnly } = useContext(TimerContext);


  const handleChapterClick = (chapterSlug) => {
    // Store the selected chapter and open the popup
    setSelectedChapterSlug(chapterSlug);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleOptionSelect = (option) => {
    // Close the popup and navigate to the selected screen
    setIsPopupOpen(false);
    navigate(`/quizzes/${selectedChapterSlug}/${option}`);
  };

  // Reset timer if a user moves to another quiz
  useEffect(() => {
    resetTimerOnly();
  }, [resetTimerOnly]);

  return (
    <div className="bm-chapters tab-content">
      <h1 className="heading">
        <button className="backButton"  onClick={() => navigate('/quizzes')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        Chapters - {selectedCourse.course}
      </h1>
      <ul className="bm-chapters-list">
        {selectedCourse.chapters.map((chapter, index) => (
          <li key={index} onClick={() => handleChapterClick(chapter.slug)}>
            <span><ChapterIcon/> Quiz #{index + 1}</span>
            <p>{chapter.chapter}</p>
          </li>
        ))}
      </ul>

      {/* Popup for selecting options */}
      <QuizOptionsPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSelect={handleOptionSelect}
      />
    </div>
  );
}

export default Quizes;
