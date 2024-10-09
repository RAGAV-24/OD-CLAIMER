import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import Navbar from './Navbar';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [profileData, setProfileData] = useState({});
  const [events, setEvents] = useState({
    insideCollege: [],
    outsideCollege: [],
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data and events data in one call
        const response = await fetch('http://localhost:5000/api/eventcoordinator');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        // Access the eventcoordinator array
        const eventCoordinatorData = data.eventcoordinator[0] || {};

        // Set profile data from the first event coordinator object
        setProfileData(eventCoordinatorData);

        // Set events state with actual event data fetched from the backend
        setEvents({
          insideCollege: data.insideCollegeEvents || [],
          outsideCollege: data.outsideCollegeEvents || [],
        });
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
        setError("Error fetching data. Please try again later.");
        setProfileData({});
      } finally {
        setIsLoading(false); // Set loading to false after data fetch
      }
    };

    fetchData();
  }, []);

  const handleAddMore = () => {
    navigate('/eventCoordinator/eventform');
  };

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex flex-col items-center justify-center space-y-8">

        {/* Profile Information */}
        {isLoading ? ( // Display loading state
          <p>Loading...</p>
        ) : error ? ( // Display error if any
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
            <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
              <li><span className="font-bold">Name:</span> {profileData.name || 'N/A'}</li>
              <li><span className="font-bold">Roll Number:</span> {profileData.rollNo || 'N/A'}</li>
              <li><span className="font-bold">Club Name:</span> {profileData.club || 'N/A'}</li>
              <li><span className="font-bold">Position in the club:</span> {profileData.position || 'N/A'}</li>
              <li><span className="font-bold">College:</span> {profileData.college || 'N/A'}</li>
              <li><span className="font-bold">Email:</span> {profileData.email || 'N/A'}</li>
              <li><span className="font-bold">Phone Number:</span> {profileData.phoneNumber || 'N/A'}</li>
              <li><span className="font-bold">Address:</span> {profileData.address || 'N/A'}</li>
            </ul>
          </div>
        )}

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
                events.insideCollege.map((event) => (
                  <div key={event._id} className="border p-4 rounded-md">
                    <h4 className="font-bold">{event.eventName}</h4>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>College:</strong> {event.collegeName}</p>
                    <div className="flex justify-between mt-2">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate(`/eventCoordinator/edit/${event._id}`)}
                      >Edit</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Inside College Events available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded transition duration-300"
              onClick={handleAddMore}
            >
              Add event
            </button>
          </div>

          {/* Outside College Events */}
          <div>
            <h3 className="text-xl font-bold mb-4">Outside College Events</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {events.outsideCollege.length > 0 ? (
                events.outsideCollege.map((event) => (
                  <div key={event._id} className="border p-4 rounded-md">
                    <h4 className="font-bold">{event.eventName}</h4>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>College:</strong> {event.collegeName}</p>
                    <div className="flex justify-between mt-2">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate(`/eventCoordinator/edit/${event._id}`)}
                      >Edit</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Outside College Events available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded transition duration-300"
              onClick={handleAddMore}
            >
              Add event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
