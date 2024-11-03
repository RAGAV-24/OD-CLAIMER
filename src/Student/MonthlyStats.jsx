import { Bar } from 'react-chartjs-2'; // Import Bar component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Register BarElement

const MonthlyStats = () => {
  const [dailyStats, setDailyStats] = useState({ accepted: {}, rejected: {} });
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [selectedPeriods, setSelectedPeriods] = useState({ accepted: 0, rejected: 0 }); // State for periods
  const month = new Date().getMonth(); // Current month (0-11)
  const year = new Date().getFullYear(); // Current year

  useEffect(() => {
    const fetchData = async () => {
      const rollNumber = JSON.parse(localStorage.getItem('studentData')).rollNumber; 
      console.log(rollNumber); // Retrieve roll number from localStorage
      try {
        const response = await axios.get('http://localhost:5000/api/od-responses');
        console.log(response);
        const filteredResponses = response.data.filter(response => response.rollNo === rollNumber); // Filter responses by roll number
        countPeriods(filteredResponses); // Pass filtered responses to countPeriods
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });

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
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Change for bar graph
      },
      {
        label: 'Rejected',
        data: Array.from({ length: 31 }, (_, i) => dailyStats.rejected[i + 1] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Change for bar graph
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
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const day = tooltipItem.label; // Get the day from tooltip item
            const dateString = `${day}/${month + 1}/${year}`; // Format date string
            return dateString; // Return formatted date
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index; // Get index of clicked bar
        const day = index + 1; // Days are 1-based (1-31)
        setSelectedDate(`${day}/${month + 1}/${year}`); // Set the selected date in state
        
        // Get the accepted and rejected periods for the selected date
        const acceptedPeriods = dailyStats.accepted[day] || 0;
        const rejectedPeriods = dailyStats.rejected[day] || 0;
        
        setSelectedPeriods({ accepted: acceptedPeriods, rejected: rejectedPeriods }); // Update periods state
      }
    },
  };

  return (
    <div className='py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
      <Navbar />
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Monthly OD Stats</h2>
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-4xl">
            <Bar data={chartData} options={options} /> {/* Change Line to Bar */}
            {selectedDate && (
              <div className="mt-4 text-lg text-gray-700">
                Selected Date: {selectedDate} {/* Display selected date */}
                <div>
                  Accepted Periods: {selectedPeriods.accepted} {/* Display accepted periods */}
                </div>
                <div>
                  Rejected Periods: {selectedPeriods.rejected} {/* Display rejected periods */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
