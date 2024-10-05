import React from 'react'

const Events = () => {
  return (
    <div className="min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      {/* Inside College */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Inside College</h2>

        {/* Inter Department Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Inter Department</h3>
            <a href="#" className="text-sm text-blue-500 font-semibold hover:underline">See More</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Cards */}
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
          </div>
        </div>

        {/* Intra Department Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Intra Department</h3>
            <a href="#" className="text-sm text-blue-500 font-semibold hover:underline">See More</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Cards */}
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
          </div>
        </div>

        {/* Outside College */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Outside College</h2>

        {/* Outside College Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Outside College</h3>
            <a href="#" className="text-sm text-blue-500 font-semibold hover:underline">See More</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Cards */}
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg shadow">
              <button className="bg-white px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
