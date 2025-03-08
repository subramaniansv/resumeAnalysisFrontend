import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newSkill, setNewSkill] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const userId = localStorage.getItem("userId");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    // Fetch user profile
    useEffect(() => {
        axios.get(`${apiUrl}/api/user/profile/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching user:", error));
    }, [userId]);

    // Add new skill
    const addSkill = () => {
        if (!newSkill.trim()) return;

        axios.post(`${apiUrl}/api/user/profile/${userId}/skills`, { skill: newSkill })
            .then(response => {
                setUser(response.data); // Update user state with new skill
                setNewSkill(""); // Clear input field
            })
            .catch(error => console.error("Error adding skill:", error));
    };

    // Search for jobs
    const searchJobs = async () => {
        if (!user || !user.skills.length) {
            alert("Add at least one skill to search for jobs.");
            return;
        }

        setLoadingJobs(true);
        try {
            const query = user.skills.join(" "); // Use all user skills for the job search
            const response = await axios.get(`${apiUrl}/api/user/search-jobs`, {
                params: {
                    query,
                    location: "India",
                    jobType: "Fulltime",
                    datePosted: "today",
                },
            });
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        setLoadingJobs(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Profile</h2>

                {user ? (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Name: {user.name}</h3>

                        <h4 className="text-md font-medium text-gray-600 mt-4">Skills:</h4>
                        <ul className="bg-gray-50 p-3 rounded-lg shadow-sm mt-2">
                            {user.skills.length > 0 ? (
                                user.skills.map((skill, index) => (
                                    <li key={index} className="text-sm text-gray-700 py-1 hover:text-blue-500">
                                        {skill}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No skills added yet.</p>
                            )}
                        </ul>

                        <div className="mt-4 flex">
                            <input
                                type="text"
                                placeholder="Add a new skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="flex-1 p-2 border rounded-l-lg text-sm outline-none focus:ring focus:ring-blue-300"
                            />
                            <button
                                onClick={addSkill}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-blue-600 transition-all"
                            >
                                Add
                            </button>
                        </div>

                        <button
                            onClick={searchJobs}
                            className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-lg text-sm hover:bg-green-600 transition-all"
                        >
                            {loadingJobs ? "Searching..." : "Search Jobs"}
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 animate-pulse">Loading...</p>
                )}
            </div>

            {/* Job Results Section */}
            <div className="mt-6">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <h3 className="text-xl font-bold">{job.job_title}</h3>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-500">{job.employment_type}</p>
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p className="mt-4">No jobs found.</p>
        )}
      </div>
        </div>
    );
};

export default Profile;
