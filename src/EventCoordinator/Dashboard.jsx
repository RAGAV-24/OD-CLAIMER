import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Navbar from './Navbar';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [profileData, setProfileData] = useState({});
  const [events, setEvents] = useState({
    insideCollege: [],
    nationalSymposiums: [],
  });

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/eventcoordinator');

        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        // Access the eventcoordinator array
        const eventCoordinatorData = data.eventcoordinator[0] || {}; // Accessing the first object in the array

        // Set profile data from the first event coordinator object
        setProfileData(eventCoordinatorData);

        // Set events state if needed; currently using empty arrays as placeholders
        setEvents({
          insideCollege: [], // Populate with actual event data if available
          nationalSymposiums: [], // Populate with actual symposium data if available
        });

      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
        setProfileData({});
      }
    };

    fetchData();
  }, []);

  const handleAddMore = (eventType) => {
    // Placeholder function for adding more events
    alert(`Add more ${eventType}`);
  };

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex flex-col items-center justify-center space-y-8">

        {/* Profile Information */}
        <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
          <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
            <li><span className="font-bold">Name:</span> {profileData.name || 'Loading...'}</li>
            <li><span className="font-bold">Roll Number:</span> {profileData.rollNo || 'Loading...'}</li>
            <li><span className="font-bold">Club Name:</span> {profileData.club || 'Loading...'}</li>
            <li><span className="font-bold">Position in the club:</span> {profileData.position || 'Loading...'}</li>
            <li><span className="font-bold">College:</span> {profileData.college || 'Loading...'}</li>
            <li><span className="font-bold">Email:</span> {profileData.email || 'Loading...'}</li>
            <li><span className="font-bold">Phone Number:</span> {profileData.phoneNumber || 'Loading...'}</li>
            <li><span className="font-bold">Address:</span> {profileData.address || 'Loading...'}</li>
          </ul>
        </div>

        {/* Monthly Event Schedule */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-4xl text-center">
          <h2 className="text-xl font-bold mb-4">Monthly Event Schedule</h2>
          <Calendar onChange={onChange} value={date} className="mx-auto" />
        </div>

        {/* Event Sections */}
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-8">

          {/* Inside College Events */}
          <div>
            <h3 className="text-xl font-bold mb-4">Inside College Events</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {events.insideCollege.length > 0 ? (
                events.insideCollege.map((event, index) => (
                  <p key={index}>{event.name}</p> // Render event names
                ))
              ) : (
                <p>No Inside College Events available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => handleAddMore('Inside College Events')}
            >
              Add More
            </button>
          </div>

          {/* National Level Symposium */}
          <div>
            <h3 className="text-xl font-bold mb-4">National Level Symposium</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {events.nationalSymposiums.length > 0 ? (
                events.nationalSymposiums.map((symposium, index) => (
                  <p key={index}>{symposium.name}</p> // Render symposium names
                ))
              ) : (
                <p>No National Level Symposiums available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => handleAddMore('National Symposiums')}
            >
              Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
