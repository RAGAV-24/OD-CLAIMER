import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signin from './Signin/Signin';
import Profile from './TeachersPart/Profile';       
import Stats from './TeachersPart/Stats';           
import OD from './TeachersPart/Od';                  
import AddUp from './TeachersPart/Addup';            
import Navbar from './TeachersPart/Navbar';    
import DashBoardst from './Student/Dashboard';        // Import your Profile component
import Eventsst from './Student/Events'  ;
import MonthlyStatsst from './Student//MonthlyStats'     // Import your Stats component
import OdApplyst from './Student/OdApply';                  // Import your OD component
import Responsest from './Student/Response';            // Import your AddUp component

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />
        
        <Route path='/profile' element={<Profile />} />
        <Route path='/teacher/stats/' element={<Stats />} />
        <Route path='/teacher/od/' element={<OD />} />
        <Route path='/teacher/addup/' element={<AddUp />} />
        <Route path='/studashboard' element={<DashBoardst />} />
        <Route path='/student/events/' element={<Eventsst  />} />
        <Route path='/student/monthlystat/' element={<MonthlyStatsst/>} />
        <Route path='/student/od/' element={<OdApplyst />} />
        <Route path='/student/response/' element={<Responsest />} />
        </Routes>      
   
      </BrowserRouter>
     
     
     </div>
  );
};

export default App;
