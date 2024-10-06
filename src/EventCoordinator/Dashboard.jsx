import { useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from './Navbar';
const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Navbar />
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Profile Information */}
        <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
          <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
            <li><span className="font-bold">Name:</span> RAGAV R</li>
            <li><span className="font-bold">Roll Number:</span> 22ADR083</li>
            <li><span className="font-bold">Club Name:</span> Anti Drug Club</li>
            <li><span className="font-bold">Position in the club:</span> Joint Secretary</li>
            <li><span className="font-bold">Department:</span> AI</li>
            <li><span className="font-bold">College:</span> Kongu Engineering College</li>
          </ul>
        </div>

        {/* Monthly Event Schedule */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-4xl text-center">
          <h2 className="text-xl font-bold mb-4">Monthly Event Schedule</h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-full md:w-1/2">
              <Calendar onChange={onChange} value={date} />
            </div>
          </div>
        </div>

        {/* Event Sections */}
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          {/* Inside College Event */}
          <div>
            <h3 className="text-xl font-bold mb-4">Inside College Event</h3>
            <div className="flex space-x-4 mb-4">
              <div className="bg-gray-400 w-48 h-32 flex items-center justify-center rounded-lg">Event 1</div>
              <div className="bg-gray-400 w-48 h-32 flex items-center justify-center rounded-lg">Event 2</div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add More</button>
          </div>

          {/* National Level Symposium */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">National Level Symposium</h3>
            <div className="flex space-x-4 mb-4">
              <div className="bg-gray-400 w-48 h-32 flex items-center justify-center rounded-lg">Symposium 1</div>
              <div className="bg-gray-400 w-48 h-32 flex items-center justify-center rounded-lg">Symposium 2</div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;