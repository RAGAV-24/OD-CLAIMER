import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';          // Import your Dashboard component
import Events from './Events';                // Import your Events component
import MonthlyStats from './MonthlyStats';    // Import your MonthlyStats component
import OdApply from './OdApply';              // Import your OdApply component
import Response from './Response';            // Import your Response component
import Navbar from './Navbar';                // Import your Navbar component

const StudentDashBoard = () => {
  return (
    <div className="rounded p-4">
      <Navbar />
      <Routes>
        <Route path='/student/dashboard' element={<Dashboard />} />
        <Route path='/student/events' element={<Events />} />
        <Route path='/student/monthly-stats' element={<MonthlyStats />} />
        <Route path='/student/od-apply' element={<OdApply />} />
        <Route path='/student/response' element={<Response />} />
      </Routes>
    </div>
  );
};

export default StudentDashBoard;
