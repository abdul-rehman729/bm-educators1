import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const RevisionPage = ({data}) => {
    const { chapterName } = useParams(); // Get the course slug from the URL
  return (
    <div>RevisionPage {chapterName}</div>
  )
}

export default RevisionPage