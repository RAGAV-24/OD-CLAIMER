
const Profile = () => {
  return (
    <div className="rounded p-4">
      <div className="py-4 min-h-screen w-full bg-white bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        {/* Student Details Section */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 shadow-lg rounded-lg p-12 w-full max-w-4xl text-left">
            <ul className="text-gray-900 text-lg space-y-2 leading-relaxed">
              <li><span className="font-bold">Class Advisor Name:</span> Vimal Devi</li>
              <li><span className="font-bold">Department:</span> Artificial Intelligence And Data Science</li>
              <li><span className="font-bold">Class Advisor of class:</span> AI & DS -b</li>
              <li><span className="font-bold">College:</span> Kongu Engineering College</li>
            </ul>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default Profile;
