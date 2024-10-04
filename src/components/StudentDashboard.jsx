import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = ({ studentData = {}, odRecords = [], events = {} }) => {
  // Default student data in case props are missing
  const { name = 'Unknown', email = 'Not provided', department = 'N/A', year = 'N/A' } = studentData;

  // Sample data for the graph - replace with actual data
  const odData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'OD Requests',
        data: odRecords.length ? odRecords : [0, 0, 0, 0],  // Ensure there is data to plot
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for better display
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background div */} <div className="fixed top-0 -z-10 h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        </div>
      <div className="student-dashboard p-6">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>

        {/* Student Details Section */}
        <div className="student-details my-4 p-4 border rounded bg-white shadow-lg">
          <h3 className="text-xl font-semibold">Student Details</h3>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Department: {department}</p>
          <p>Year: {year}</p>
        </div>

        {/* OD Record Chart */}
        <div className="od-chart my-4 p-4 border rounded bg-white shadow-lg">
          <h3 className="text-xl font-semibold">OD Records (This Month)</h3>
          <Bar data={odData} options={options} />
        </div>

        {/* Upcoming Events Section */}
        <div className="upcoming-events my-4 p-4 border rounded bg-white shadow-lg">
          <h3 className="text-xl font-semibold">Upcoming Events</h3>

          {/* Intra and Inter Department Events */}
          <div className="intra-dept-events my-2">
            <h4 className="font-semibold">Intra Department</h4>
            <ul>
              {events.intraDept ? (
                events.intraDept.map((event, index) => <li key={index}>{event}</li>)
              ) : (
                <li>No upcoming events</li>
              )}
            </ul>
          </div>

          <div className="inter-dept-events my-2">
            <h4 className="font-semibold">Inter Department</h4>
            <ul>
              {events.interDept ? (
                events.interDept.map((event, index) => <li key={index}>{event}</li>)
              ) : (
                <li>No upcoming events</li>
              )}
            </ul>
          </div>

          {/* Inter College Events */}
          <div className="inter-college-events my-2">
            <h4 className="font-semibold">Inter College</h4>
            <ul>
              {events.interCollege ? (
                events.interCollege.map((event, index) => <li key={index}>{event}</li>)
              ) : (
                <li>No upcoming events</li>
              )}
            </ul>
          </div>

          {/* Outside College Events */}
          <div className="outside-college-events my-2">
            <h4 className="font-semibold">Outside College</h4>
            <ul>
              {events.outsideCollege ? (
                events.outsideCollege.map((event, index) => <li key={index}>{event}</li>)
              ) : (
                <li>No upcoming events</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
