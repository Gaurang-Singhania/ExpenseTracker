import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import chart.js

const DashChart = ({ stats }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Check if stats are available before creating the chart
    if (stats) {
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Food & Dining",
            "Housing",
            "Transportation",
            "Healthcare",
            "Entertainment",
            "Utilities",
            "Personal Care",
            "Others",
          ],
          datasets: [
            {
              label: "Total Spent",
              data: [
                stats?.categorySpends["Food & Dining"],
                stats?.categorySpends["Housing"],
                stats?.categorySpends["Transportation"],
                stats?.categorySpends["Healthcare"],
                stats?.categorySpends["Entertainment"],
                stats?.categorySpends["Utilities"],
                stats?.categorySpends["Personal Care"],
                stats?.categorySpends["Others"],
              ],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF8C9A",
                "#8BE87B",
                "#CDA776",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 40,
              top: 20,
              bottom: 20,
            },
          },
          maintainAspectRatio: false, // Disable aspect ratio to allow custom width and height
        },
      });

      return () => {
        myChart.destroy(); // Clean up the chart when component unmounts
      };
    }
  }, [stats]); // Re-render the chart if stats change

  return (
    <div>
      <canvas ref={chartRef} width={800} height={300} /> {/* Adjust width and height as needed */}
    </div>
  );
};

export default DashChart;
