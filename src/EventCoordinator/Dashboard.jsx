import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Navbar from './Navbar';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [profileData, setProfileData] = useState({});
  const [events, setEvents] = useState({
    insideCollege: [],
    outsideCollege: [],
  });

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setProfileData({});
      }
    };

    fetchData();
  }, []);

  const handleEdit = (event, type) => {
    // Redirect to the edit event form with the event's data
    console.log('Edit Event:', event, type);
    // Implement edit logic here, e.g., navigate to an edit page
  };

  const handleDelete = async (eventId, type) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update the events state
        setEvents((prevEvents) => ({
          ...prevEvents,
          [type]: prevEvents[type].filter((event) => event._id !== eventId),
        }));
        
        alert('Event deleted successfully!');
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

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
                events.insideCollege.map((event) => (
                  <div key={event._id} className="border p-4 rounded-md">
                    <h4 className="font-bold">{event.name}</h4>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>College:</strong> {event.collegeName}</p>
                    <div className="flex justify-between mt-2">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(event, 'insideCollege')}>Edit</button>
                      <button 
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(event._id, 'insideCollege')}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Inside College Events available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded "
              onClick={() => handleAddMore('Inside College Events')}
            >
              <Link to="/eventCoordinator/eventform" className="hover:bg-violet-400 p-2 rounded">
                Add event
              </Link>
            </button>
          </div>

          {/* Outside College Events */}
          <div>
            <h3 className="text-xl font-bold mb-4">Outside College Events</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {events.outsideCollege.length > 0 ? (
                events.outsideCollege.map((event) => (
                  <div key={event._id} className="border p-4 rounded-md">
                    <h4 className="font-bold">{event.name}</h4>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>College:</strong> {event.collegeName}</p>
                    <div className="flex justify-between mt-2">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(event, 'outsideCollege')}>Edit</button>
                      <button 
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(event._id, 'outsideCollege')}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Outside College Events available at the moment.</p>
              )}
            </div>
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded transition duration-300"
              onClick={() => handleAddMore('Outside College')}
            >
              <Link to="/eventCoordinator/eventform" className="hover:bg-violet-400 p-2 rounded">
                Add event
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
