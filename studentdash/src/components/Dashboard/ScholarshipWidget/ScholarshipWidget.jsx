import React, { useState } from "react";
import Modal from "react-modal";
import "./ScholarshipWidget.css";

Modal.setAppElement("#root");

const ScholarshipWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card scholarship-widget">
      <div className="widget-header">
        <h2>Scholarship Status</h2>
        <span className="status-badge pending">Pending Review</span>
      </div>
      <div className="widget-content">
        <p>
          Your application is currently under review. Expected decision by June
          30, 2023.
        </p>
        <div className="progress-tracker">
          
          <div className="progress-step completed">
            <div className="step-marker">1</div>
            <span>Submitted</span>
          </div>
          <div className="progress-step active">
            <div className="step-marker">2</div>
            <span>Review</span>
          </div>
          <div className="progress-step">
            <div className="step-marker">3</div>
            <span>Decision</span>
            
          </div>
        </div>
      </div>
      <button className="btn-outline" onClick={() => setIsOpen(true)}>
        View Details
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="scholarship-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Scholarship Application Details</h2>
          <div className="modal-body">
            <div className="detail-row">
              <span>Application ID:</span>
              <strong>SCH-2023-0045</strong>
            </div>
            <div className="detail-row">
              <span>Submitted On:</span>
              <strong>May 15, 2023</strong>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <strong className="status-text pending">Under Review</strong>
            </div>
            <div className="detail-row">
              <span>Documents:</span>
              <div className="documents-list">
                <span className="document-tag">Income Proof</span>
                <span className="document-tag">Marksheet</span>
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ScholarshipWidget;
