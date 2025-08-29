import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProgressTrendChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTrendChart = ({ studentData }) => {
  if (!studentData) return null;

  const terms = studentData.progress.map((item) => item.term);
  const mathsData = studentData.progress.map((item) => item.maths);
  const scienceData = studentData.progress.map((item) => item.science);
  const englishData = studentData.progress.map((item) => item.english);

  const data = {
    labels: terms,
    datasets: [
      {
        label: "Maths",
        data: mathsData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Science",
        data: scienceData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "English",
        data: englishData,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
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
        text: "Performance Trend Over Time",
        font: {
          size: 16,
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
      x: {
        title: {
          display: true,
          text: "Term",
        },
      },
    },
  };

  return (
    <div className="progress-trend-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressTrendChart;
