import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teacher');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const teacher=data.teachers.email==data.email? data.teachers[0]:data.teachers;
        
         setTeacherData(teacher);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="rounded">
      <Navbar />
      <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {teacherData && (
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
              <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
                <li><span className="font-bold">Name:</span> {teacherData.name}</li>
                <li><span className="font-bold">Email:</span> {teacherData.email}</li>
                <li><span className="font-bold">Class:</span> {teacherData.class}</li>
                <li><span className="font-bold">Department:</span> {teacherData.department}</li>
                <li><span className="font-bold">Date of Birth:</span> {teacherData.dob}</li>
                <li><span className="font-bold">College:</span> {teacherData.college}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
