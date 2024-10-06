
const Dashboard = () => {
  // Sample data for the chart

  return (
    <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      {/* Student Details Section */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
          <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
            <li><span className="font-bold">Name:</span> RAGAV R</li>
            <li><span className="font-bold">Roll Number:</span> 22ADR083</li>
            <li><span className="font-bold">Course:</span> B.Tech Artificial Intelligence and Data Science</li>
            <li><span className="font-bold">Department:</span> AI</li>
            <li><span className="font-bold">Class Advisor:</span> Vimala mam</li>
            <li><span className="font-bold">College:</span> Kongu Engineering College</li>
          </ul>
        </div>
      </div>

     
    </div>
  );
};

export default Dashboard;
