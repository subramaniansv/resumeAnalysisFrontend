import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">
          Start analyzing resumes or searching for jobs now.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link
            to="/analyze-resume"
            className="block p-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600"
          >
            Analyze Resume
          </Link>
          <Link
            to="/search-jobs"
            className="block p-4 bg-green-500 text-white text-center rounded-lg hover:bg-green-600"
          >
            Search Jobs
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default UserDashboard;
