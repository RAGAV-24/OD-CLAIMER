import { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Navbar from './Navbar';

const OdApply = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (you can send data to a server here if needed)
    
    // Show the modal after form submission
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] py-12 px-4"> {/* Adjust height for the navbar */}
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
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Roll Number"
              />
            </div>

            {/* Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Name</label>
              <input
                type="text"
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Name"
              />
            </div>

            {/* Date */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Date</label>
              <input
                type="date"
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* No of Periods */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">No of Periods</label>
              <input
                type="number"
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter No of Periods"
              />
            </div>

            {/* Event Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">Event Name</label>
              <input
                type="text"
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Event Name"
              />
            </div>

            {/* College Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-bold text-gray-700 text-lg">College Name</label>
              <input
                type="text"
                className="w-2/3 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter College Name"
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
