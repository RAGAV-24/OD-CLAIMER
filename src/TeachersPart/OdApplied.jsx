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

  // Function to update the status in the new collection and delete the record from the current one
  const handleStatusUpdate = async (record, newStatus) => {
    try {
      // Prepare updated data to be sent to the backend
      const updatedData = {
        rollNo: record.rollNo,
        name: record.name,
        periods: record.periods,
        eventName: record.eventName,
        collegeName: record.collegeName,
        status: newStatus // Update status based on button clicked (Accepted or Declined)
      };

      // Post the updated record to the new collection
      await axios.post('http://localhost:5000/api/new-od-collection', updatedData);

      // Delete the original record from the current collection
      await axios.delete('http://localhost:5000/api/delete-od-record', {
        data: {
          rollNo: record.rollNo,
          name: record.name,
          periods: record.periods,
          eventName: record.eventName,
          collegeName: record.collegeName,
        },
      });

      // Update local state to remove the record from the list
      setOdRecords((prevRecords) =>
        prevRecords.filter((r) => r.rollNo !== record.rollNo)
      );

      alert(`Record ${newStatus} and processed successfully`);
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
    <div className="rounded p-4">
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
                  <>
                    <button
                      className="mr-2 text-green-500 hover:text-green-700"
                      onClick={() => handleStatusUpdate(record, 'Accepted')} // Handle accept and update status
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleStatusUpdate(record, 'Declined')} // Handle decline and update status
                    >
                      <FaTimes />
                    </button>
                  </>
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
