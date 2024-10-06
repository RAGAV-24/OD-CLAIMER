import Navbar from './Navbar';     
const Response = () => {
  return (
    <div className="min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          {/* Apply OD Header */}
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Response</h1>
          <hr className="border-gray-600 w-16 mb-8 mx-auto" />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-gray-700">Register Number</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-gray-700">Name</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-gray-700">Event Name</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-gray-700">College Name</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">22ADR064</td>
                  <td className="py-3 px-4 border-b border-gray-300">Arsath</td>
                  <td className="py-3 px-4 border-b border-gray-300">NEWELL</td>
                  <td className="py-3 px-4 border-b border-gray-300">Kongu Engineering College</td>
                  <td className="py-3 px-4 border-b border-gray-300">Pending</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 border-b border-gray-300">22ADR064</td>
                  <td className="py-3 px-4 border-b border-gray-300">Arsath</td>
                  <td className="py-3 px-4 border-b border-gray-300">NEWELL</td>
                  <td className="py-3 px-4 border-b border-gray-300">Kongu Engineering College</td>
                  <td className="py-3 px-4 border-b border-gray-300">Pending</td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">22ADR064</td>
                  <td className="py-3 px-4 border-b border-gray-300">Arsath</td>
                  <td className="py-3 px-4 border-b border-gray-300">NEWELL</td>
                  <td className="py-3 px-4 border-b border-gray-300">Kongu Engineering College</td>
                  <td className="py-3 px-4 border-b border-gray-300">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Response;
