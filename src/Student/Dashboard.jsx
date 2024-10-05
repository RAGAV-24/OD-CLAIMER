import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Approved',
        data: [15, 25, 20, 30],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Curved lines
      },
      {
        label: 'Declined',
        data: [10, 5, 15, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Pending',
        data: [5, 10, 7, 12],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly OD Stats',
      },
    },
  };

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      {/* Student Details Section */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
          <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
            <li><span className="font-bold">Name:</span> RAGAV R</li>
            <li><span className="font-bold">Roll Number:</span> 22ADR083</li>
            <li><span className="font-bold">Course:</span> B.Tech Artificial Intelligence and Data Science</li>
            <li><span className="font-bold">Department:</span> AI</li>
            <li><span className="font-bold">Class Advisor:</span> Vimala mam</li>
            <li><span className="font-bold">College:</span> Kongu Engineering College</li>
          </ul>
        </div>
      </div>

      {/* Monthly OD Stats Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Monthly OD Stats</h2>
        <div className="flex justify-center mt-6">
          {/* Line Chart */}
          <div className="w-full max-w-4xl">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
