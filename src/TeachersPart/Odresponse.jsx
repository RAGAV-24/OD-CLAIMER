// src/Odresponse.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const Odresponse = () => {
    const [studentForms, setStudentForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentForms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/studentresponsetoteach'); // Update this URL to your API endpoint
                setStudentForms(response.data);
            } catch (err) {
                setError('Error fetching student forms',err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentForms();
    }, []);

    const handleSubmit = async (form) => {
        try {
            const { rollNo, periods } = form; // Get roll number and periods from the form
            await axios.post('http://localhost:5000/api/addToBank', { rollNo, periods }); // Call the backend API to add to bank
            alert(`Submitted: Roll No - ${rollNo}, Periods - ${periods}`); // Show success message
        } catch (error) {
            console.error('Error submitting to bank:', error);
            alert('Error submitting to bank. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Roll No</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Periods</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">College Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Event Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Geotag Photo</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Attendance Photo</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {studentForms.map((form) => (
                        <tr key={form._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-gray-200">{form.name}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.rollNo}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.periods}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.collegeName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.eventName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.geotagPhoto ? 'Uploaded' : 'Not Uploaded'}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{form.attendancePhoto ? 'Uploaded' : 'Not Uploaded'}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <button 
                                    onClick={() => handleSubmit(form)} 
                                    className="bg-purple-200 text-white px-4 py-2 rounded hover:bg-purple-500"
                                >
                                    Submit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Odresponse;
