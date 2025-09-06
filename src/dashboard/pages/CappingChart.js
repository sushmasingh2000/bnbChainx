import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CappingPieChart = ({ cappingData }) => {
  // Default static data (in case cappingData is not available)
  const staticData = {
    achieved: 30,
    remaining: 70,
  };

  // Use the passed cappingData if it exists, otherwise fall back to static data
  const data = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        label: "Capping",
        data: [cappingData?.achieved ?? staticData.achieved, cappingData?.remaining ?? staticData.remaining],
        backgroundColor: ["#4caf50", "#ff9800"], // Green for achieved, Orange for remaining
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="">
      <h2 className="font-bold mb-4">Capping</h2>
      <Pie data={data} />
    </div>
  );
};

export default CappingPieChart;
