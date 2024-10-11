import { useState } from 'react';
import Navbar from './Navbar';
import { Pie } from 'react-chartjs-2';  // Import the Pie chart component from react-chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';  // Import necessary components from chart.js

import 'chart.js/auto';  // Import chart.js to ensure everything is auto-registered

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Addup = () => {
  // Separate states for each file upload
  const [studentDataFile, setStudentDataFile] = useState(null);
  const [studentCredFile, setStudentCredFile] = useState(null);
  const [coordinatorDataFile, setCoordinatorDataFile] = useState(null);
  const [coordinatorCredFile, setCoordinatorCredFile] = useState(null);

  // File upload handlers
  const handleStudentDataUpload = (event) => {
    setStudentDataFile(event.target.files[0]);
  };

  const handleStudentCredUpload = (event) => {
    setStudentCredFile(event.target.files[0]);
  };

  const handleCoordinatorDataUpload = (event) => {
    setCoordinatorDataFile(event.target.files[0]);
  };

  const handleCoordinatorCredUpload = (event) => {
    setCoordinatorCredFile(event.target.files[0]);
  };

  // Example Pie chart data
  const pieData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        label: 'Categories',
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Navbar />

        <div className="p-8 flex justify-center">
          {/* Main container divided into two columns */}
          <div className="bg-purple-400 flex flex-row justify-between min-h-[300px] w-[80%] p-8 rounded-lg shadow-lg">
            
            {/* Left Side - Text Section */}
            <div className="flex-1 text-white text-lg font-semibold">
              {/* Student Data Add Up */}
              <div className="mb-6">Student Data Add Up</div>
              <input
                type="file"
                id="studentDataInput"
                className="hidden"
                onChange={handleStudentDataUpload}
              />
              <button
                onClick={() => document.getElementById('studentDataInput').click()}
                className="bg-purple-600 w-28 rounded text-white font-bold py-2 hover:bg-purple-700"
              >
                Upload
              </button>
              {studentDataFile && (
                <div className="mt-2 text-sm text-white">
                  Uploaded: {studentDataFile.name}
                </div>
              )}

              {/* Student UserName Password Data Add Up */}
              <div className="mb-6 mt-6">Student UserName Password Data Add Up</div>
              <input
                type="file"
                id="studentCredInput"
                className="hidden"
                onChange={handleStudentCredUpload}
              />
              <button
                onClick={() => document.getElementById('studentCredInput').click()}
                className="bg-purple-600 w-28 rounded text-white font-bold py-2 hover:bg-purple-700"
              >
                Upload
              </button>
              {studentCredFile && (
                <div className="mt-2 text-sm text-white">
                  Uploaded: {studentCredFile.name}
                </div>
              )}

              {/* Coordinator Data Add Up */}
              <div className="mb-6 mt-6">Coordinator Data Add Up</div>
              <input
                type="file"
                id="coordinatorDataInput"
                className="hidden"
                onChange={handleCoordinatorDataUpload}
              />
              <button
                onClick={() => document.getElementById('coordinatorDataInput').click()}
                className="bg-purple-600 w-28 rounded text-white font-bold py-2 hover:bg-purple-700"
              >
                Upload
              </button>
              {coordinatorDataFile && (
                <div className="mt-2 text-sm text-white">
                  Uploaded: {coordinatorDataFile.name}
                </div>
              )}

              {/* Coordinator Password and UserName Data Add Up */}
              <div className="mb-6 mt-6">Coordinator Password and UserName Data Add Up</div>
              <input
                type="file"
                id="coordinatorCredInput"
                className="hidden"
                onChange={handleCoordinatorCredUpload}
              />
              <button
                onClick={() => document.getElementById('coordinatorCredInput').click()}
                className="bg-purple-600 w-28 rounded text-white font-bold py-2 hover:bg-purple-700"
              >
                Upload
              </button>
              {coordinatorCredFile && (
                <div className="mt-2 text-sm text-white">
                  Uploaded: {coordinatorCredFile.name}
                </div>
              )}
            </div>

            {/* Right Side - Pie Chart Section */}
            <div className="flex-1 flex justify-center items-center">
              <Pie data={pieData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Addup;
