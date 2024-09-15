import React from 'react'
import { useParams } from 'react-router-dom';


// Only map question and answer here of specific chapter selected
// selected Chapter's slug by user has gotten by url parameter.
//i got the chapter's slug using useParams() and mapped the quiz data to find credentials
const RevisionPage = ({data}) => {
  
    const { chapterSlug } = useParams(); // Get the course slug from the URL
    let chapterName;
    // Find the chapter in the data
    const findChapter = () => {
        for (let course of data) {
        for (let chapter of course.chapters) {

            if (chapter.slug === chapterSlug) {
            chapterName=chapter.chapter
            return chapter.quiz; // Return the quiz array if the chapter is found
            }
        }
        }
        return null; // Return null if the chapter is not found
    };

    const quizArray = findChapter();
    
  return (
    <section>
      <h1>{chapterName}-Revision</h1>
     
        {quizArray.map((quiz, index) => (
          <div key={index} className="bm-question">
            <h4>Q: {quiz.question}</h4>
            <p> Ans: {quiz.answer}</p>
            
          </div>
        ))}
      
    </section>
  )
}

export default RevisionPage