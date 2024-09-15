import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ChapterIcon } from "../../assets/chapter.svg";

function Quizes({ courses }) {
  const { courseSlug } = useParams(); // Get the course slug from the URL
  const navigate = useNavigate();
  const selectedCourse = courses.find(course => course.slug === courseSlug); // Find course by slug
  
  const handleChapterClick = (chapterSlug) => {
    // Navigate to the quiz for the selected chapter
    // navigate(`/quiz/course/${courseSlug}/chapter/${chapterSlug}`);
    navigate(`/chapter/${chapterSlug}/quiz`)
  };

  return (
    <div className="bm-chapters tab-content">
      <h1 className='heading'>{selectedCourse.course} - Chapters</h1>
      <ul className="bm-chapters-list">
        {selectedCourse.chapters.map((chapter, index) => (
          <li key={index} onClick={() => handleChapterClick(chapter.slug)}>
            <span><ChapterIcon /> Quiz #{index + 1}</span>
            <p>{chapter.chapter}</p> {/* Displaying chapter name */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quizes;
