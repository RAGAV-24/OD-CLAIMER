import NavBar from './Navbar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState(location.state?.student || JSON.parse(localStorage.getItem('studentData')) || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch student data if not passed from the sign-in
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        
        // Check if response contains an array of students or a single student object
        const student = response.data.students ? response.data.students[0] : response.data;

        setStudentData(student);
        localStorage.setItem('studentData', JSON.stringify(student)); // Store the specific student data in local storage
      } catch (err) {
        setError('Failed to fetch student data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!studentData) {
      fetchStudentData();
    } else {
      setLoading(false);
    }
  }, [studentData]);

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <NavBar />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-700">Loading student data...</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
