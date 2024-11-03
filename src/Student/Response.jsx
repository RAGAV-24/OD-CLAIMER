import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Response = () => {
  const [responses, setResponses] = useState([]); // State to hold the fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/od-responses'); // Adjust the endpoint as needed
        const data = await response.json();

        // Initialize uploadCount and uploadDate for each response
        const initializedData = data.map(item => ({
          ...item,
          uploadCount: item.uploadCount || 0, // Ensure uploadCount exists
          uploadDate: item.uploadDate || null, // Ensure uploadDate exists
        }));
        
        setResponses(initializedData); // Assuming your API returns an array of responses
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchResponses();
  }, []);

  const handleFileUpload = (index) => {
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      const response = updatedResponses[index];

      // Increment the upload count and check for removal
      if (response.uploadCount < 3) {
        response.uploadCount += 1;

        // Set the upload date on the first upload
        if (response.uploadCount === 1) {
          response.uploadDate = new Date().toISOString(); // Store the current date as upload date
        }
      }

      // Check for removal conditions
      const currentDate = new Date();
      const uploadDate = response.uploadDate ? new Date(response.uploadDate) : null;
      const daysSinceUpload = uploadDate ? Math.floor((currentDate - uploadDate) / (1000 * 60 * 60 * 24)) : 0;

      // Remove the row if upload count is 3 or 3 days have passed
      if (response.uploadCount >= 3 || (response.uploadDate && daysSinceUpload >= 3)) {
        updatedResponses.splice(index, 1); // Remove the row if conditions are met
      }

      // Store updated responses in local storage
      localStorage.setItem('responses', JSON.stringify(updatedResponses));

      return updatedResponses;
    });

    // Navigate to the response page
    navigate('/student/od-response');
  };

  // Load responses from local storage on component mount
  useEffect(() => {
    const storedResponses = localStorage.getItem('responses');
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  // Retrieve the student roll number from local storage
  const storedStudentData = localStorage.getItem('studentData');
  const rollNumber = storedStudentData ? JSON.parse(storedStudentData).rollNumber : null;

  // Filter responses based on the retrieved roll number
  const filteredResponses = responses.filter(response => response.rollNo === rollNumber);

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Response</h1>
          <hr className="border-gray-600 w-16 mb-8 mx-auto" />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Register Number</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Event Name</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">College Name</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Upload</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.length > 0 ? (
                  filteredResponses.map((response, index) => {
                    const currentDate = new Date();
                    const uploadDate = response.uploadDate ? new Date(response.uploadDate) : null;
                    const daysSinceUpload = uploadDate ? Math.floor((currentDate - uploadDate) / (1000 * 60 * 60 * 24)) : 0;
                    const remainingDays = uploadDate ? Math.max(0, 3 - daysSinceUpload) : 3;

                    return (
                      <tr key={index} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        <td className="py-3 px-4">{response.rollNo}</td>
                        <td className="py-3 px-4">{response.name}</td>
                        <td className="py-3 px-4">{response.eventName}</td>
                        <td className="py-3 px-4">{response.collegeName}</td>
                        <td className="py-3 px-4">{response.status}</td>
                        <td className="py-3 px-4">
                          {response.status === 'Accepted' && (
                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                Days Remaining: {remainingDays} | Attempts: {response.uploadCount} / 3
                              </div>
                              <button
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-400 transition"
                                onClick={() => handleFileUpload(index)} // Pass the index to handle upload
                                disabled={response.uploadCount >= 3} // Disable button if limit reached
                              >
                                Upload
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-3 px-4 text-center">No matching responses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
