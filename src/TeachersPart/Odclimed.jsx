// src/Odclimed.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const Odclimed = () => {
    const [bankRecords, setBankRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBankRecords = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bank'); // Update this URL to your API endpoint
                setBankRecords(response.data);
            } catch (err) {
                setError('Error fetching bank records',err);
            } finally {
                setLoading(false);
            }
        };

        fetchBankRecords();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">OD Records</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Roll No</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left">Periods</th>
                    </tr>
                </thead>
                <tbody>
                    {bankRecords.map((record) => (
                        <tr key={record._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-gray-200">{record.rollNo}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{record.periods}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Odclimed;
