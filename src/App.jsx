// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './Student/StudentDashBoard';
import Events from './Student/Events';
import MonthlyStats from './Student/MonthlyStats';
import OdApply from './Student/OdApply';
import Response from './Student/Response';
import TeacherDashboard from './TeachersPart/TeacherDashBoard';
import Addup from './TeachersPart/Addup';
import Od from './TeachersPart/Od';
import Profile from './TeachersPart/Profile';
import Stats from './TeachersPart/Stats';
import Signin from './Signin/Signin';

function App() {
  return (
    <Router>
      {/* Add a common navbar here if you want */}
      <Routes>
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/stats" element={<MonthlyStats />} />
        <Route path="/student/events" element={<Events />} />
        <Route path="/student/apply-od" element={<OdApply />} />
        <Route path="/student/response" element={<Response />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/addup" element={<Addup />} />
        <Route path="/teacher/stats" element={<Stats />} />
        <Route path="/teacher/od" element={<Od />} />
        <Route path="/teacher/profile" element={<Profile />} />

        {/* Sign-in Route */}
        <Route path="/" element={<Signin />} />

        {/* Catch-all route (optional) */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
