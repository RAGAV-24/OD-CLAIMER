import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // for tick and cross icons
import axios from 'axios'; // Make sure to install axios

const OdApplied = () => {
  const [odRecords, setOdRecords] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true); // Optional: loading state
  const [error, setError] = useState(null); // Optional: error state

  // Function to fetch data from the backend
  const fetchOdRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/odapplieslist'); // Replace with your API endpoint
      setOdRecords(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching OD records:', error);
      setError('Failed to fetch records'); // Set error state
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchOdRecords();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="px-4 py-2 font-semibold text-gray-700">REGISTER NUMBER</th>
            <th className="px-4 py-2 font-semibold text-gray-700">NAME</th>
            <th className="px-4 py-2 font-semibold text-gray-700">NO OF PERIODS OF OD</th>
            <th className="px-4 py-2 font-semibold text-gray-700">EVENT NAME</th>
            <th className="px-4 py-2 font-semibold text-gray-700">COLLEGE NAME</th>
            <th className="text-center px-4 py-2 font-semibold text-gray-700">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(odRecords) && odRecords.length > 0 ? (
            odRecords.map((record, index) => (
              <tr key={record._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-4 py-2 text-gray-800">{record.rollNo}</td>
                <td className="px-4 py-2 text-gray-800">{record.name}</td>
                <td className="px-4 py-2 font-bold text-gray-800">{record.periods}</td>
                <td className="px-4 py-2 text-gray-800">{record.eventName}</td>
                <td className="px-4 py-2 text-gray-800">{record.collegeName}</td>
                <td className="px-4 py-2 text-center">
                  <button 
                    className={`mr-2 ${record.approved ? 'text-green-500' : 'text-green-400 '} hover:text-green-700`}
                    onClick={() => handleApproval(record._id)} // Add your handler function
                    disabled={record.approved} // Disable if already approved
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className={`text-red-500 hover:text-red-700 ${!record.approved ? '' : 'opacity-50 cursor-not-allowed'}`} 
                    onClick={() => handleRejection(record._id)} // Add your handler function
                    disabled={!record.approved} // Disable if already rejected
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-2 text-gray-500">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Example handler functions (You need to implement the logic to update the status in your backend)
const handleApproval = (id) => {
  console.log(`Approved record with ID: ${id}`);
  // Implement the logic to handle approval
};

const handleRejection = (id) => {
  console.log(`Rejected record with ID: ${id}`);
  // Implement the logic to handle rejection
};

export default OdApplied;
