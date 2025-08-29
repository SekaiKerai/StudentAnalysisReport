import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import "./AcademicProgress.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AcademicProgress = () => {
  const subjects = {
    labels: ["Math", "Science", "English"],
    datasets: [
      {
        label: "Current Term",
        data: [85, 78, 82],
        backgroundColor: "#4361ee",
        borderRadius: 6,
      },
      {
        label: "Previous Term",
        data: [80, 75, 78],
        backgroundColor: "#4895ef",
        borderRadius: 6,
      },
    ],
  };

  const performanceData = [
    { subject: "Math", grade: "A", progress: 85, trend: "up" },
    { subject: "Science", grade: "B+", progress: 78, trend: "up" },
    { subject: "English", grade: "A", progress: 82, trend: "up" },
  ];

  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart("academic-chart");
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <div className="academic-progress" style={{ overflowX: "hodden" }}>
      <div className="card" style={{ minWidth: 0, overflow: "hidden" }}>
        <h2 className="section-title">Performance Overview</h2>
        <div
          className="chart-container"
          style={{
            width: "100%",
            minWidth: 0,
            height: 350,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorBoundary
            fallback={
              <div className="chart-error">
                Failed to load performance chart
              </div>
            }
          >
            <Bar
              data={subjects}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${context.raw}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
              id="academic-chart"
              style={{ height: "100%", width: "100%", maxHeight: 320 }}
              height={320}
            />
          </ErrorBoundary>
        </div>
      </div>

      <div className="card" style={{ width: "100%", minWidth: 0,  }}>
        <h2 className="section-title">Subject Details</h2>
        <div className="performance-table">
          <div className="table-header">
            <span id="subject">Subject</span>
            <span>Grade</span>
            <span>Progress</span>
            <span>Trend</span>
          </div>
          {performanceData.map((item, index) => (
            <div key={index} className="table-row">
              <span>{item.subject}</span>
              <span
                className={`grade ${item.grade
                  .toLowerCase()
                  .replace("+", "-plus", "-minus","-")}`}
              >
                {item.grade}
              </span>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="progress-value">{item.progress}%</span>
              </div>
              <span className={`trend ${item.trend}`}>
                {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;
