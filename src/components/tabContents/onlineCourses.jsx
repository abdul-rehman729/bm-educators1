import React from 'react';
import dummy from "../../assets/dummy-thumbnail.jpg"

function OnlineCourses() {
  return (
    <div className='bm-videos'>
        <h1 className="heading">Online Courses</h1>
        <ul className='bm-videos-lists'>
            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank' rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank' rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank'  rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank'  rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank'  rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank'  rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>

            <li className="bm-videos-list">
                <a href='https://www.google.com' target='_blank'  rel='noreferrer'>
                    <img src={dummy} alt="" />
                    <p>Video Thumbnail Text</p>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default OnlineCourses