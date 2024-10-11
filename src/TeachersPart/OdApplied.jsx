import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const OdApplied = () => {
  const [odRecords, setOdRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchOdRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/odapplieslist');
      setOdRecords(response.data);
    } catch (error) {
      console.error('Error fetching OD records:', error);
      setError('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchOdRecords();
  }, []);

  // Function to create a new OD application
  const createOdApplication = async (applicationData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/odapply', applicationData);
      setOdRecords((prevRecords) => [...prevRecords, response.data]); // Add new application to state
    } catch (error) {
      console.error('Error creating OD application:', error);
      alert('Failed to create OD application.');
    }
  };

  // Function to update status in the new collection
  const handleStatusUpdate = async (rollNo, newStatus) => {
    try {
      const updatedData = {
        rollNo,
        status: newStatus,
      };
      // Assuming you have an endpoint to create a new record in the new collection
      await axios.post('http://localhost:5000/api/new-od-collection', updatedData);
      // Update local state after status update
      setOdRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.rollNo === rollNo ? { ...record, status: newStatus } : record
        )
      );
    } catch (error) {
      console.error('Error updating approval:', error);
      alert('Failed to update OD application status.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
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
                    className={`mr-2 ${record.status === 'Accepted' ? 'text-green-500' : 'text-green-400'} hover:text-green-700`}
                    onClick={() => handleStatusUpdate(record.rollNo, 'Accepted')}
                    disabled={record.status === 'Accepted'}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className={`text-red-500 hover:text-red-700 ${record.status === 'Declined' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleStatusUpdate(record.rollNo, 'Declined')}
                    disabled={record.status === 'Declined'}
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

export default OdApplied;
