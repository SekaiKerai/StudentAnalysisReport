import React from "react";
import "./StudentSelector.css";

const StudentSelector = ({ students, selectedStudent, onSelectStudent }) => {
  return (
    <div className="student-selector-container">
      <h2 className="selector-title">Student Performance Dashboard</h2>
      <div className="selector-wrapper">
        <label htmlFor="student-select" className="selector-label">
          Select Student:
        </label>
        <select
          id="student-select"
          value={selectedStudent || ""}
          onChange={(e) => onSelectStudent(e.target.value)}
          className="selector-dropdown"
        >
          <option value="">-- Select a student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} (ID: {student.id})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StudentSelector;
