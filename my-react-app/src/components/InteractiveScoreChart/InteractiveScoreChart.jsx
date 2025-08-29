import React from "react";
import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./InteractiveScoreChart.css";

ChartJS.register(
  RadialLinearScale,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const InteractiveScoreChart = ({ studentData }) => {
  if (!studentData) return null;

  const currentTerm = studentData.progress[studentData.progress.length - 1];
  const previousTerm =
    studentData.progress[studentData.progress.length - 2] || currentTerm;

  // Radar chart data for non-academic skills
  const radarData = {
    labels: ["Behavior", "Participation", "Creativity", "Teamwork"],
    datasets: [
      {
        label: "Current Term",
        data: [
          currentTerm.nonAcademic?.behavior || 0,
          currentTerm.nonAcademic?.participation || 0,
          currentTerm.nonAcademic?.creativity || 0,
          currentTerm.nonAcademic?.teamwork || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
      },
      {
        label: "Previous Term",
        data: [
          previousTerm.nonAcademic?.behavior || 0,
          previousTerm.nonAcademic?.participation || 0,
          previousTerm.nonAcademic?.creativity || 0,
          previousTerm.nonAcademic?.teamwork || 0,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
      },
    ],
  };

  // Bar chart data for academic comparison
  const barData = {
    labels: ["Maths", "Science", "English"],
    datasets: [
      {
        label: "Current Term",
        data: [currentTerm.maths, currentTerm.science, currentTerm.english],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Term",
        data: [previousTerm.maths, previousTerm.science, previousTerm.english],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Non-Academic Skills Assessment",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}/10`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Marks",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Academic Performance Comparison",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            const datasetIndex = context.datasetIndex;
            const currentValue = context.raw;
            const otherValue =
              datasetIndex === 0
                ? barData.datasets[1].data[context.dataIndex]
                : barData.datasets[0].data[context.dataIndex];

            const difference =
              datasetIndex === 0
                ? currentValue - otherValue
                : otherValue - currentValue;

            if (difference === 0) return "No change";
            return `${difference > 0 ? "↑" : "↓"} ${Math.abs(
              difference
            )} points`;
          },
        },
      },
    },
  };

  return (
    <div className="interactive-charts-container">
      <div className="chart-container">
        <Radar data={radarData} options={radarOptions} />
      </div>
      <div className="chart-container">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default InteractiveScoreChart;
