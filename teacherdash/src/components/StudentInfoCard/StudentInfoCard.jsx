import React from "react";
import "./StudentInfoCard.css";

const StudentInfoCard = ({ studentData }) => {
  if (!studentData) return null;

  return (
    <div className="student-info-container">
      <div className="student-header">
        <h2>{studentData.name}</h2>
      </div>

      <div className="student-details-grid">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{studentData.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Centre ID:</span>
          <span className="detail-value">{studentData.centreId}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Date of Birth:</span>
          <span className="detail-value">
            {new Date(studentData.dateOfBirth).toLocaleDateString()}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Guardian Name:</span>
          <span className="detail-value">{studentData.guardianName}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{studentData.address}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{studentData.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
