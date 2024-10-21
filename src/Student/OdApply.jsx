import { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Navbar from './Navbar';

const OdApply = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    date: '',
    noOfPeriods: '',
    eventName: '',
    collegeName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData); // You can process the form data here
  
    try {
      // Use the correct backend URL (replace with your backend's URL)
      const response = await fetch('http://localhost:5000/odapply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });
  
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };
  
  const closeModal = () => {
    setIsSubmitted(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          {/* Apply OD Header */}
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Apply OD</h1>
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
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Roll Number"
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
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Name"
                required
              />
            </div>

            {/* Date */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* No of Periods */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">No of Periods</label>
              <input
                type="number"
                name="noOfPeriods"
                value={formData.noOfPeriods}
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter No of Periods"
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
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Event Name"
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
                onChange={handleInputChange}
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter College Name"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Modal */}
          {isSubmitted && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">Form Submitted Successfully!</h2>
                <div className="flex justify-center mb-4">
                  <IoIosCheckmarkCircleOutline size={80} className="text-pink-500" />
                </div>
                <button
                  onClick={closeModal}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OdApply;
