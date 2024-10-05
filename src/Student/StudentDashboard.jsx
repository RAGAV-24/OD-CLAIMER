import { Routes, Route } from 'react-router-dom';
import DashBoard from './Dashboard';        // Import your Profile component
import Events from './Events'  ;
import MonthlyStats from './MonthlyStats'     // Import your Stats component
import OdApply from './OdAppply';                  // Import your OD component
import Response from './Response';            // Import your AddUp component
import Navbarst from './Navbar';           // Import your Navbar component

const TeacherDashBoard = () => {
  return (
    <div className="rounded p-4">
      <Navbarst />
      <Routes>
        <Route path='/studashboard' element={<DashBoard />} />
        <Route path='/student/monthlystats/*' element={<MonthlyStats />} />
        <Route path='/student/od/*' element={<OdApply />} />
        <Route path='/student/response/*' element={<Response />} />
        <Route path='/student/event/*' element={<Events />} />
      </Routes>
    </div>
  );
};

export default TeacherDashBoard;
