import React, { useState, useMemo } from "react";
import Select from "react-select";
import "./SearchableStudentSelector.css";

const SearchableStudentSelector = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const [searchInput, setSearchInput] = useState("");

  // Format students for react-select
  const studentOptions = useMemo(() => {
    return students.map((student) => ({
      value: student.id,
      label: `${student.name} (ID: ${student.id}) ${
        student.class ? `- ${student.class}` : ""
      }`,
      studentData: student,
    }));
  }, [students]);

  // Filter options based on search input
  const filteredOptions = useMemo(() => {
    if (!searchInput) return studentOptions;
    const input = searchInput.toLowerCase();
    return studentOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(input) ||
        option.value.toLowerCase().includes(input)
    );
  }, [searchInput, studentOptions]);

  const handleChange = (selectedOption) => {
    onSelectStudent(selectedOption?.value || null);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "48px",
      fontSize: "16px",
      border: "2px solid #e2e8f0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#94a3b8",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
        ? "#e0e7ff"
        : "white",
      color: state.isSelected ? "white" : "#1e293b",
      padding: "12px 16px",
      fontSize: "15px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#1e293b",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
    }),
  };

  return (
    <div className="searchable-selector-container">
      <h2 className="selector-title">Student Performance Dashboard</h2>
      <div className="selector-wrapper">
        <label htmlFor="student-search" className="selector-label">
          Search and Select Student:
        </label>
        <Select
          id="student-search"
          options={filteredOptions}
          value={studentOptions.find(
            (option) => option.value === selectedStudent
          )}
          onChange={handleChange}
          onInputChange={setSearchInput}
          inputValue={searchInput}
          placeholder="Type to search students..."
          isClearable
          isSearchable
          styles={customStyles}
          className="searchable-dropdown"
          classNamePrefix="select"
          noOptionsMessage={() => "No students found"}
          components={{
            DropdownIndicator: () => (
              <div className="dropdown-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
            ),
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};

export default SearchableStudentSelector;
