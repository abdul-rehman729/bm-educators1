import React from "react";
import logo from "../assets/logo.png";
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as ScheduleIcon } from '../assets/schedule.svg';
import { ReactComponent as OnlineIcon } from '../assets/online.svg';
import { ReactComponent as QuizIcon } from '../assets/quiz.svg';
import { ReactComponent as ProgressIcon } from '../assets/progress.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation
import "../custom.css";

function Tabs() {
  const navigate = useNavigate();  // Initialize useNavigate for navigation
  const location = useLocation();  // Get the current location (URL)

  // A mapping of paths to tab indices
  const tabPathMapping = {
    "/dashboard": 0,
    "/schedule-classes": 1,
    "/online-classes": 2,
    "/quizes": 3,
    "/progress": 4
  };

  // Determine which tab is active based on the URL path
  const activeTab = tabPathMapping[location.pathname] || 0;

  const handleTabClick = (path) => {
    navigate(path);  // Navigate to the corresponding route
  };

  return (
    <div className="bm-tabs-container">
      <div className="bm-tabs-header">
        <div className="bm-logo">
          <img src={logo} alt="" />
        </div>

        {/* Tabs for navigation */}
        <div
          className={activeTab === 0 ? "tab active" : "tab"}
          onClick={() => handleTabClick("/dashboard")}  // Route to Dashboard
        >
          <HomeIcon />
          Dashboard
        </div>
        <div
          className={activeTab === 1 ? "tab active" : "tab"}
          onClick={() => handleTabClick("/schedule-classes")}  // Route to Schedule Classes
        >
          <ScheduleIcon />
          Schedule Classes
        </div>
        <div
          className={activeTab === 2 ? "tab active" : "tab"}
          onClick={() => handleTabClick("/online-classes")}  // Route to Online Classes
        >
          <OnlineIcon />
          Online Classes
        </div>
        <div
          className={activeTab === 3 ? "tab active" : "tab"}
          onClick={() => handleTabClick("/chapters")} 
        >
          <QuizIcon />
          My Quiz
        </div>
        <div
          className={activeTab === 4 ? "tab active" : "tab"}
          onClick={() => handleTabClick("/progress")}  // Route to Progress
        >
          <ProgressIcon />
          My Progress
        </div>
        <div className="tab bm-logout">
          <LogoutIcon />Logout
        </div>
      </div>
    </div>
  );
}

export default Tabs;
