import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const QuizPageButtons = () => {
    const { chapterName } = useParams(); // Get the course slug from the URL
    const navigate = useNavigate();
  return (
    <div className='bm-chapters tab-content'>
        <h1 className='heading'>{chapterName} - Quiz</h1>
        <div className='quiz-buttons'>
            <button onClick={()=>navigate(`/chapter/${chapterName}/revision`)}>Revision</button>
            <button onClick={()=>navigate(`/chapter/${chapterName}/practise`)}>Practice</button>
            <button onClick={()=>navigate(`/chapter/${chapterName}/test`)}>Test</button>

        </div>
    </div>
  )
}

export default QuizPageButtons