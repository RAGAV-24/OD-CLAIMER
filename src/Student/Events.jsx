import  { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/eventsposted'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events for Inside College and Outside College
  const insideCollegeEvents = events.filter(event => event.type === 'inside');
  const outsideCollegeEvents = events.filter(event => event.type === 'outside');

  return (
    <div className="min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Events</h2>

        {/* Inside College Section */}
        {loading ? (
          <div>Loading events...</div>
        ) : (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Inside College</h3>
              <a href="#" className="text-sm text-blue-500 font-semibold hover:underline">See More</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Map over inside college events */}
              {insideCollegeEvents.length > 0 ? (
                insideCollegeEvents.map(event => (
                  <div key={event.id} className="bg-gray-100 h-40 flex flex-col justify-center items-center rounded-lg shadow">
                    <h4 className="text-lg font-semibold">{event.title}</h4>
                    <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
                  </div>
                ))
              ) : (
                <p>No events found inside college.</p>
              )}
            </div>
          </div>
        )}

        {/* Outside College Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Outside College</h3>
            <a href="#" className="text-sm text-blue-500 font-semibold hover:underline">See More</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Map over outside college events */}
            {outsideCollegeEvents.length > 0 ? (
              outsideCollegeEvents.map(event => (
                <div key={event.id} className="bg-gray-100 h-40 flex flex-col justify-center items-center rounded-lg shadow">
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                  <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
                </div>
              ))
            ) : (
              <p>No events found outside college.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
