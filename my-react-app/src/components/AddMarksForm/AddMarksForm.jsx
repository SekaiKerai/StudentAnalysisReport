import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import "./AddMarksForm.css";

Modal.setAppElement("#root");

const AddMarksForm = ({ student, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    term: "",
    maths: "",
    science: "",
    english: "",
    behavior: "",
    participation: "",
    creativity: "",
    teamwork: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMarks = {
      term: formData.term,
      maths: Number(formData.maths),
      science: Number(formData.science),
      english: Number(formData.english),
      nonAcademic: {
        behavior: Number(formData.behavior),
        participation: Number(formData.participation),
        creativity: Number(formData.creativity),
        teamwork: Number(formData.teamwork),
      },
    };
    onSubmit(newMarks);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        <h2>Add New Marks for {student?.name}</h2>
        <button onClick={onClose} className="close-button">
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="marks-form">
        <div className="form-group">
          <label>Term Name:</label>
          <input
            type="text"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
            placeholder="e.g., Term 1 2024"
          />
        </div>

        <div className="form-section">
          <h3>Academic Marks</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Maths:</label>
              <input
                type="number"
                name="maths"
                min="0"
                max="100"
                value={formData.maths}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Science:</label>
              <input
                type="number"
                name="science"
                min="0"
                max="100"
                value={formData.science}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>English:</label>
              <input
                type="number"
                name="english"
                min="0"
                max="100"
                value={formData.english}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Non-Academic Ratings (1-10)</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Behavior:</label>
              <input
                type="number"
                name="behavior"
                min="1"
                max="10"
                value={formData.behavior}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Participation:</label>
              <input
                type="number"
                name="participation"
                min="1"
                max="10"
                value={formData.participation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Creativity:</label>
              <input
                type="number"
                name="creativity"
                min="1"
                max="10"
                value={formData.creativity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Teamwork:</label>
              <input
                type="number"
                name="teamwork"
                min="1"
                max="10"
                value={formData.teamwork}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Marks
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMarksForm;
