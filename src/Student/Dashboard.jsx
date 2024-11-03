import NavBar from './Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const location = useLocation();
  const [studentData] = useState(location.state?.student || JSON.parse(localStorage.getItem('studentData')));

  // Save student data in local storage if it's available
  useEffect(() => {
    if (studentData) {
      localStorage.setItem('studentData', JSON.stringify(studentData));
    }
  }, [studentData]);

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <NavBar />
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
          {studentData ? (
            <ul className="text-gray-900 text-lg space-y-4 leading-relaxed">
              <li>
                <span className="font-bold">Name:</span> {studentData.name}
              </li>
              <li>
                <span className="font-bold">Roll Number:</span> {studentData.rollNumber}
              </li>
              <li>
                <span className="font-bold">Course:</span> {studentData.class}
              </li>
              <li>
                <span className="font-bold">Department:</span> {studentData.department}
              </li>
              <li>
                <span className="font-bold">Year:</span> {studentData.year}
              </li>
              <li>
                <span className="font-bold">Date of Birth:</span> {new Date(studentData.dob).toLocaleDateString()}
              </li>
              <li>
                <span className="font-bold">Class Advisor:</span> {studentData.classAdvisor}
              </li>
              <li>
                <span className="font-bold">Mode:</span> {studentData.mode}
              </li>
            </ul>
          ) : (
            <p>No student data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
