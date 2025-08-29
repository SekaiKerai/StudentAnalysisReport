import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./StudentMarksTable.css";

const StudentMarksTable = ({ studentData }) => {
  if (
    !studentData ||
    !studentData.progress ||
    studentData.progress.length === 0
  ) {
    return (
      <div className="marks-table-container">
        <p>No progress data available for this student.</p>
      </div>
    );
  }

  const currentTerm = studentData.progress[studentData.progress.length - 1];
  const previousTerm =
    studentData.progress.length > 1
      ? studentData.progress[studentData.progress.length - 2]
      : {
          ...currentTerm,
          term: "No Previous Data",
          maths: 0,
          science: 0,
          english: 0,
          nonAcademic: {
            behavior: 0,
            participation: 0,
            creativity: 0,
            teamwork: 0,
          },
        };

  const calculateChange = (current, previous) => {
    const change = current - previous;
    if (change > 0) return { value: `+${change}`, className: "positive" };
    if (change < 0) return { value: change, className: "negative" };
    return { value: "0", className: "neutral" };
  };

  return (
    <div className="marks-table-container">
      <Tabs>
        <TabList>
          <Tab>Academic Performance</Tab>
          <Tab>Non-Academic Ratings</Tab>
          <Tab>Term Comparison</Tab>
        </TabList>

        <TabPanel>
          <div className="table-responsive">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Current Marks</th>
                  <th>Previous Marks</th>
                  <th>Change</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {["maths", "science", "english"].map((subject) => (
                  <tr key={subject}>
                    <td>
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </td>
                    <td>{currentTerm[subject]}</td>
                    <td>{previousTerm[subject]}</td>
                    <td
                      className={
                        calculateChange(
                          currentTerm[subject],
                          previousTerm[subject]
                        ).className
                      }
                    >
                      {
                        calculateChange(
                          currentTerm[subject],
                          previousTerm[subject]
                        ).value
                      }
                    </td>
                    <td>
                      {currentTerm[subject] >= 90
                        ? "A+"
                        : currentTerm[subject] >= 80
                        ? "A"
                        : currentTerm[subject] >= 70
                        ? "B"
                        : currentTerm[subject] >= 60
                        ? "C"
                        : currentTerm[subject] >= 50
                        ? "D"
                        : "F"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="table-responsive">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Rating (1-10)</th>
                </tr>
              </thead>
              <tbody>
                {["behavior", "participation", "creativity", "teamwork"].map(
                  (category) => (
                    <tr key={category}>
                      <td>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </td>
                      <td>
                        <div className="rating-display">
                          {currentTerm.nonAcademic?.[category] || "N/A"}
                          <div
                            className="rating-bar"
                            style={{
                              width: `${
                                (currentTerm.nonAcademic?.[category] || 0) * 10
                              }%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="table-responsive">
            <table className="marks-table comparison-table">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Maths</th>
                  <th>Science</th>
                  <th>English</th>
                  <th>Average</th>
                </tr>
              </thead>
              <tbody>
                {studentData.progress.map((term, index) => (
                  <tr
                    key={term.term}
                    className={
                      index === studentData.progress.length - 1
                        ? "current-term"
                        : ""
                    }
                  >
                    <td>{term.term}</td>
                    <td>{term.maths}</td>
                    <td>{term.science}</td>
                    <td>{term.english}</td>
                    <td>
                      {Math.round(
                        (term.maths + term.science + term.english) / 3
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default StudentMarksTable;
