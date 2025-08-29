import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import AcademicProgress from "./AcademicProgress/AcademicProgress";
import GreenInitiative from "./GreenInitiative/GreenInitiative";
import ScholarshipWidget from "./ScholarshipWidget/ScholarshipWidget";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("academics");
  const studentData = {
    name: "Rahul Sharma",
    grade: "10th Grade",
    center: "Delhi Rural Center",
    avatar: "RS",
  };

  return (
    <div className="dashboard-container">
      <Sidebar student={studentData} />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <div className="header-actions">
        
          </div>
        </header>

        <div className="dashboard-widgets">
          <ScholarshipWidget />

          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "academics" ? "active" : ""}`}
                onClick={() => setActiveTab("academics")}
              >
                Academic Progress
              </button>
              <button
                className={`tab ${activeTab === "green" ? "active" : ""}`}
                onClick={() => setActiveTab("green")}
              >
                Green Initiative
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === "academics" && <AcademicProgress />}
            {activeTab === "green" && <GreenInitiative />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
