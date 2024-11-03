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
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyStats = () => {
  const [dailyStats, setDailyStats] = useState({ accepted: {}, rejected: {} });
  const month = new Date().getMonth(); // Current month (0-11)
  const year = new Date().getFullYear(); // Current year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/od-responses');
        console.log(response.data);
        countPeriods(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countPeriods = (responses) => {
    const accepted = {};
    const rejected = {};

    responses.forEach(response => {
      const responseDate = new Date(response.date);
      // Check if the response date is valid and falls within the current month and year
      if (!isNaN(responseDate) && responseDate.getMonth() === month && responseDate.getFullYear() === year) {
        const day = responseDate.getDate(); // Get the day of the month
        const periods = response.periods || 0; // Default to 0 if periods is undefined
        
        if (response.status === 'Accepted') {
          accepted[day] = (accepted[day] || 0) + periods; // Aggregate periods by day
        } else if (response.status === 'Declined') {
          rejected[day] = (rejected[day] || 0) + periods; // Aggregate periods by day
        }
      }
    });
    
    setDailyStats({ accepted, rejected });
  };

  // Prepare data for the chart
  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
    datasets: [
      {
        label: 'Accepted',
        data: Array.from({ length: 31 }, (_, i) => dailyStats.accepted[i + 1] || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Rejected',
        data: Array.from({ length: 31 }, (_, i) => dailyStats.rejected[i + 1] || 0),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
    <div className='py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
      <Navbar />
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Monthly OD Stats</h2>
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-4xl">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
