import  { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Profile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teacher/67047d3339c37eee76e70f31'); // Use the correct endpoint with the teacher's _id
        setTeacherData(response.data.teacherData); // Assuming the backend returns the teacher data in this format
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!teacherData) {
    return <p>No data available</p>;
  }

  return (
    <div className="rounded">
      <Navbar />
      <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        {/* Teacher Details Section */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
            <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
              <li><span className="font-bold">ID:</span> {teacherData._id}</li>
              <li><span className="font-bold">Name:</span> {teacherData.name}</li>
              <li><span className="font-bold">Email:</span> {teacherData.email}</li>
              <li><span className="font-bold">Class:</span> {teacherData.class}</li>
              <li><span className="font-bold">Department:</span> {teacherData.department}</li>
              <li><span className="font-bold">Date of Birth:</span> {teacherData.dob}</li>
              <li><span className="font-bold">College:</span> {teacherData.college}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
