import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display feedback messages
  const handleAddStudent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signup/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <form onSubmit={handleAddStudent}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Student Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Student Password"
          required
        />
        <button type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>} {/* Display feedback message */}
    </div>
  );
};

export default TeacherDashboard;
