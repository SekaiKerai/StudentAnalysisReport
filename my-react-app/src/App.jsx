import React, { useState } from "react";
import "./styles/global.css";
import "./styles/theme.css";
import SearchableStudentSelector from "./components/SearchableStudentSelector/SearchableStudentSelector";
import StudentMarksTable from "./components/StudentMarksTable/StudentMarksTable";
import InteractiveScoreChart from "./components/InteractiveScoreChart/InteractiveScoreChart";
import StudentInfoCard from "./components/StudentInfoCard/StudentInfoCard";
import AddMarksForm from "./components/AddMarksForm/AddMarksForm";
import AddStudentForm from "./components/AddStudentForm/AddStudentForm";
import ProgressTrendChart from "./components/ProgressTrendChart/ProgressTrendChart";
import { FaPlus } from "react-icons/fa";

const initialStudentsData = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    centreId: "EDU_MAIN_001",
    dateOfBirth: "2010-03-15",
    gender: "male",
    address: "24 Green Park, New Delhi - 110016",
    guardianName: "Sunita Sharma",
    attendance: "94%",
    progress: [
      {
        term: "Term 1 2023",
        maths: 85,
        science: 78,
        english: 82,
        nonAcademic: {
          behavior: 8,
          participation: 7,
          creativity: 6,
          teamwork: 8,
        },
      },
      {
        term: "Term 2 2023",
        maths: 88,
        science: 82,
        english: 85,
        nonAcademic: {
          behavior: 9,
          participation: 8,
          creativity: 7,
          teamwork: 9,
        },
      },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "8765432109",
    centreId: "EDU_MAIN_002",
    dateOfBirth: "2011-07-22",
    gender: "female",
    address: "12 Shivaji Nagar, Mumbai - 400028",
    guardianName: "Rajesh Patel",
    attendance: "97%",
    progress: [
      {
        term: "Term 1 2023",
        maths: 92,
        science: 88,
        english: 95,
        nonAcademic: {
          behavior: 9,
          participation: 9,
          creativity: 8,
          teamwork: 9,
        },
      },
      {
        term: "Term 2 2023",
        maths: 94,
        science: 90,
        english: 96,
        nonAcademic: {
          behavior: 9,
          participation: 9,
          creativity: 9,
          teamwork: 9,
        },
      },
    ],
  },
  {
    id: "3",
    name: "Aarav Singh",
    email: "aarav.singh@example.com",
    phone: "7654321098",
    centreId: "EDU_WEST_001",
    dateOfBirth: "2010-11-05",
    gender: "male",
    address: "45 MG Road, Bangalore - 560001",
    guardianName: "Neha Singh",
    attendance: "89%",
    progress: [
      {
        term: "Term 1 2023",
        maths: 78,
        science: 82,
        english: 75,
        nonAcademic: {
          behavior: 7,
          participation: 6,
          creativity: 7,
          teamwork: 7,
        },
      },
      {
        term: "Term 2 2023",
        maths: 82,
        science: 85,
        english: 78,
        nonAcademic: {
          behavior: 8,
          participation: 7,
          creativity: 8,
          teamwork: 8,
        },
      },
    ],
  },
  {
    id: "4",
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    phone: "6543210987",
    centreId: "EDU_EAST_001",
    dateOfBirth: "2011-01-30",
    gender: "female",
    address: "7 Park Street, Kolkata - 700016",
    guardianName: "Vikram Gupta",
    attendance: "91%",
    progress: [
      {
        term: "Term 1 2023",
        maths: 88,
        science: 85,
        english: 90,
        nonAcademic: {
          behavior: 8,
          participation: 8,
          creativity: 9,
          teamwork: 8,
        },
      },
      {
        term: "Term 2 2023",
        maths: 90,
        science: 88,
        english: 92,
        nonAcademic: {
          behavior: 9,
          participation: 9,
          creativity: 9,
          teamwork: 9,
        },
      },
    ],
  },
  {
    id: "5",
    name: "Vihaan Reddy",
    email: "vihaan.reddy@example.com",
    phone: "5432109876",
    centreId: "EDU_SOUTH_001",
    dateOfBirth: "2010-09-18",
    gender: "male",
    address: "33 Cathedral Road, Chennai - 600086",
    guardianName: "Deepa Reddy",
    attendance: "93%",
    progress: [
      {
        term: "Term 1 2023",
        maths: 82,
        science: 85,
        english: 80,
        nonAcademic: {
          behavior: 8,
          participation: 7,
          creativity: 7,
          teamwork: 8,
        },
      },
      {
        term: "Term 2 2023",
        maths: 85,
        science: 88,
        english: 84,
        nonAcademic: {
          behavior: 9,
          participation: 8,
          creativity: 8,
          teamwork: 9,
        },
      },
    ],
  },
];

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("studentsData");
    return saved ? JSON.parse(saved) : initialStudentsData;
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddMarksOpen, setIsAddMarksOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const handleSelectStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setSelectedStudent(student || null);
  };

  const handleAddMarks = (newMarks) => {
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id
        ? {
            ...student,
            progress: [...student.progress, newMarks],
          }
        : student
    );

    setStudents(updatedStudents);
    localStorage.setItem("studentsData", JSON.stringify(updatedStudents));
    setSelectedStudent(
      updatedStudents.find((s) => s.id === selectedStudent.id)
    );
  };

  const handleAddStudent = (newStudent) => {
    const studentWithDefaults = {
      ...newStudent,
      id: Math.random().toString(36).substr(2, 9),
      attendance: "0%",
      progress: [
        {
          term: "Initial Term",
          maths: 0,
          science: 0,
          english: 0,
          nonAcademic: {
            behavior: 5,
            participation: 5,
            creativity: 5,
            teamwork: 5,
          },
        },
      ],
    };

    const updatedStudents = [...students, studentWithDefaults];
    setStudents(updatedStudents);
    localStorage.setItem("studentsData", JSON.stringify(updatedStudents));
    setSelectedStudent(studentWithDefaults);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Teacher Analytics Dashboard</h1>
        <button
          onClick={() => setIsAddStudentOpen(true)}
          className="add-student-button"
        >
          <FaPlus /> Add New Student
        </button>
      </header>

      <main className="dashboard-content">
        <SearchableStudentSelector
          students={students}
          selectedStudent={selectedStudent?.id || ""}
          onSelectStudent={handleSelectStudent}
        />

        {selectedStudent ? (
          <div className="student-dashboard">
            <div className="student-header">
              <StudentInfoCard studentData={selectedStudent} />
              <button
                onClick={() => setIsAddMarksOpen(true)}
                className="add-marks-button"
              >
                <FaPlus /> Add New Marks
              </button>
            </div>

            <div className="dashboard-row">
              <ProgressTrendChart studentData={selectedStudent} />
            </div>

            <div className="dashboard-row">
              <StudentMarksTable studentData={selectedStudent} />
            </div>

            <div className="dashboard-row">
              <InteractiveScoreChart studentData={selectedStudent} />
            </div>
          </div>
        ) : (
          <div className="welcome-screen">
            <div className="welcome-card">
              <h2>Welcome to Teacher Analytics</h2>
              <p>
                Search and select a student to view and manage their performance
                data.
              </p>
            </div>
          </div>
        )}

        <AddMarksForm
          student={selectedStudent}
          isOpen={isAddMarksOpen}
          onClose={() => setIsAddMarksOpen(false)}
          onSubmit={handleAddMarks}
        />

        <AddStudentForm
          isOpen={isAddStudentOpen}
          onClose={() => setIsAddStudentOpen(false)}
          onSubmit={handleAddStudent}
        />
      </main>

      <footer className="app-footer">
        <p>Teacher Dashboard v2.0 • Interactive Analytics</p>
      </footer>
    </div>
  );
}

export default App;
