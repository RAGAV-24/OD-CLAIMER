import  { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded p-4">
      <nav className="bg-purple-300 p-4 rounded relative">
        <div className="min-h-screen absolute inset-0 -z-10 h-full w-full bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg"></div>
        <div className="container flex justify-between items-center">
          <div className="text-2xl text-left bg-gradient-to-r from-pink-400 via-slate-500 to-purple-500 bg-clip-text tracking-tight text-transparent">
            CLASS ADVISOR SESSION
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/teacher/profile" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">PROFILE</Link>
            <Link to="/teacher/stats" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">MONTHLY STATS</Link>
            <Link to="/teacher/od" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">ODS</Link>
            <Link to="/teacher/addup" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">DATA ADD UP</Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-purple-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/profile" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">PROFILE</Link>
            <Link to="/teacher/stats" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">MONTHLY STATS</Link>
            <Link to="/teacher/od" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">ODS</Link>
            <Link to="/teacher/addup" className="block font-bold text-black hover:bg-purple-400 px-3 py-2 rounded">DATA ADD UP</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;



