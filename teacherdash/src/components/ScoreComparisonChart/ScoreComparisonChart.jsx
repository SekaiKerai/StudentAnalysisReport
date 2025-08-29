import React from "react";
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
import "./ScoreComparisonChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ScoreComparisonChart = ({ studentData }) => {
  if (!studentData) return null;

  const currentTerm = studentData.progress[studentData.progress.length - 1];
  const previousTerm =
    studentData.progress[studentData.progress.length - 2] || currentTerm;

  const data = {
    labels: ["Maths", "Science", "English"],
    datasets: [
      {
        label: "Current Term",
        data: [currentTerm.maths, currentTerm.science, currentTerm.english],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Term",
        data: [previousTerm.maths, previousTerm.science, previousTerm.english],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Score Comparison: ${currentTerm.term} vs ${previousTerm.term}`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const datasetIndex = context.datasetIndex;
            const currentValue = context.raw;
            const otherValue =
              datasetIndex === 0
                ? data.datasets[1].data[context.dataIndex]
                : data.datasets[0].data[context.dataIndex];

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
  };

  return (
    <div className="score-comparison-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScoreComparisonChart;
