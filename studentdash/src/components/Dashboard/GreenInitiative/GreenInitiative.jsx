import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import "./GreenInitiative.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const GreenInitiative = () => {
  const contributionData = {
    labels: ["Trees Planted", "Waste Collected", "Events Attended"],
    datasets: [
      {
        data: [15, 8.5, 3],
        backgroundColor: ["#4cc9f0", "#4895ef", "#4361ee"],
        borderWidth: 0,
      },
    ],
  };

  const activities = [
    {
      id: 1,
      type: "Tree Plantation",
      date: "15 Mar 2023",
      location: "School Ground",
      trees: 5,
    },
    {
      id: 2,
      type: "Plastic Drive",
      date: "22 Apr 2023",
      location: "Local Market",
      kg: 2.5,
    },
    {
      id: 3,
      type: "Awareness Camp",
      date: "10 May 2023",
      location: "Community Center",
      hours: 3,
    },
  ];

  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart("green-chart");
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <div className="green-initiative">
      <div className="card">
        <h2 className="section-title">Your Contributions</h2>
        <div className="contributions-overview">
          <div className="chart-container">
            <ErrorBoundary
              fallback={
                <div className="chart-error">
                  Failed to load contributions chart
                </div>
              }
            >
              <Doughnut
                data={contributionData}
                options={{
                  cutout: "70%",
                  plugins: {
                    legend: {
                      position: "right",
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${context.label}: ${context.raw} ${
                            context.label.includes("Trees")
                              ? "trees"
                              : context.label.includes("Waste")
                              ? "kg"
                              : "events"
                          }`,
                      },
                    },
                  },
                }}
                id="green-chart"
              />
            </ErrorBoundary>
          </div>
          <div className="contribution-stats">
            <div className="stat-item">
              <h3>15</h3>
              <p>Trees Planted</p>
            </div>
            <div className="stat-item">
              <h3>8.5</h3>
              <p>kg Waste Collected</p>
            </div>
            <div className="stat-item">
              <h3>3</h3>
              <p>Events Attended</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Recent Activities</h2>
        <div className="activities-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-icon">
                {activity.type.includes("Tree")
                  ? "🌱"
                  : activity.type.includes("Plastic")
                  ? "♻️"
                  : "📢"}
              </div>
              <div className="activity-details">
                <h3>{activity.type}</h3>
                <p className="activity-meta">
                  <span>📅 {activity.date}</span>
                  <span>📍 {activity.location}</span>
                </p>
                <div className="activity-stats">
                  {activity.trees && <span>🌳 {activity.trees} trees</span>}
                  {activity.kg && <span>♻️ {activity.kg} kg</span>}
                  {activity.hours && <span>⏱️ {activity.hours} hours</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenInitiative;
