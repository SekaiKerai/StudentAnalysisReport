import React from "react";
import { FaHome, FaBook, FaTree, FaGraduationCap, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ student }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="student-avatar">{student.avatar}</div>
        <div className="student-info">
          <h3>{student.name}</h3>
          <p>{student.grade}</p>
          <p>{student.center}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <FaBook className="nav-icon" />
            <span>Academics</span>
          </li>
          <li>
            <FaTree className="nav-icon" />
            <span>Green Initiative</span>
          </li>
          <li>
            <FaGraduationCap className="nav-icon" />
            <span>Scholarship</span>
          </li>
          <li>
            <FaCog className="nav-icon" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
