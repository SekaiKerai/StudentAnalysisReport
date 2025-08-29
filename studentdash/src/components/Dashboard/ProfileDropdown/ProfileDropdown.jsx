import React, { useState } from "react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import "./ProfileDropdown.css";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const studentData = {
    name: "Rahul Sharma",
    email: "rahul.sharma@afterschool.edu",
    class: "10th Grade",
    center: "Rural Center - Delhi",
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={() => setIsOpen(!isOpen)}>
        <FaUser className="profile-icon" />
        <span>{studentData.name}</span>
        <FaChevronDown className={`dropdown-icon ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <h3>{studentData.name}</h3>
            <p>{studentData.email}</p>
            <p>
              {studentData.class} | {studentData.center}
            </p>
          </div>

          <div className="dropdown-section">
            <h4>Academic Records</h4>
            <button className="dropdown-item">View Report Card</button>
            <button className="dropdown-item">Attendance History</button>
          </div>

          <div className="dropdown-section">
            <h4>Green Initiative</h4>
            <button className="dropdown-item">My Contributions</button>
            <button className="dropdown-item">Upcoming Events</button>
          </div>

          <div className="dropdown-section">
            <h4>Scholarship</h4>
            <button className="dropdown-item">Apply for Scholarship</button>
            <button className="dropdown-item">Check Status</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
