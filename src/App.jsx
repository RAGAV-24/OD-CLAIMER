import React, { useState } from 'react';
import Signin from './components/Signin';
import TeacherDashboard from './components/TeacherDashBoard';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Track whether the user is signed in
  const [userType, setUserType] = useState(''); // Track the type of user (student/teacher)

  // Handle sign-in success
  const handleSignInSuccess = (role) => {
    setUserType(role); // Set the user role (student/teacher)
    setIsSignedIn(true); // Mark as signed in
  };

  return (
    <div>
      {!isSignedIn ? (
        <Signin onSignInSuccess={handleSignInSuccess} />
      ) : (
        <>
          {userType === 'teacher' && <TeacherDashboard />}
          {userType === 'student' && <StudentDashboard />}
        </>
      )}
    </div>
  );
};

export default App;
