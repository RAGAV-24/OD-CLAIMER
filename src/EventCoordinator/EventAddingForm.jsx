import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const EventAddingForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    date: '',
    duration: '',
    eventName: '',
    collegeName: '',
    description: '',
    image: null
  });

  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  // Fetch existing events when the component mounts
  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error fetching events. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = isEditing 
        ? await fetch(`/api/events/${currentEventId}`, { method: 'PUT', body: formDataToSend })
        : await fetch('/api/events', { method: 'POST', body: formDataToSend });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Notify success

        // Reset form and fetch updated events
        resetForm();
        fetchEvents(); // Refresh the event list
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Notify error
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const resetForm = () => {
    setFormData({
      rollNumber: '',
      name: '',
      date: '',
      duration: '',
      eventName: '',
      collegeName: '',
      description: '',
      image: null
    });
    setIsEditing(false);
    setCurrentEventId(null);
  };

  const handleEdit = (event) => {
    setFormData({
      rollNumber: event.rollNumber,
      name: event.name,
      date: event.date,
      duration: event.duration,
      eventName: event.eventName,
      collegeName: event.collegeName,
      description: event.description,
      image: null // Not displaying image in form
    });
    setIsEditing(true);
    setCurrentEventId(event._id); // Store the ID for update
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Notify success
        fetchEvents(); // Refresh the event list
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Notify error
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the event.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] py-12 px-4"> {/* Adjust height for the navbar */}
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">{isEditing ? 'Edit EVENT' : 'Adding EVENT'}</h1>
          <hr className="border-black w-16 mb-6" />

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Roll Number */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Date */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Duration */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Event Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* College Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Event Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
              >
                {isEditing ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Event List */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Existing Events</h2>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event._id} className="border p-4 rounded-md">
                  <h3 className="font-bold">{event.eventName}</h3>
                  <p>{event.description}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Duration:</strong> {event.duration}</p>
                  <p><strong>College:</strong> {event.collegeName}</p>
                  <p><strong>Roll Number:</strong> {event.rollNumber}</p>
                  <div className="flex justify-between mt-2">
                    <button 
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(event)}>Edit</button>
                    <button 
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAddingForm;
