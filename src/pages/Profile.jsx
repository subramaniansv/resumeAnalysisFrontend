import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editSkill, setEditSkill] = useState("");
  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  //Job state
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("India");
  const [jobType, setJobType] = useState("FULLTIME");
  const [datePosted, setDatePosted] = useState("today");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  // Fetch user profile
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/user/profile/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  // Add new skill
  const addSkill = () => {
    if (!newSkill.trim()) return;

    axios
      .post(`${apiUrl}/api/user/profile/${userId}/skills`, {
        skill: newSkill,
        action: "add",
      })
      .then((response) => {
        setUser((prev) => ({ ...prev, skills: response.data.skills }));
        setNewSkill("");
      })
      .catch((error) => console.error("Error adding skill:", error));
  };

  // Edit skill
  const updateSkill = (index) => {
    if (!editSkill.trim()) return;

    axios
      .post(`${apiUrl}/api/user/profile/${userId}/skills`, {
        action: "edit",
        skillIndex: index,
        newSkill: editSkill,
      })
      .then((response) => {
        setUser((prev) => ({ ...prev, skills: response.data.skills }));
        setEditIndex(null);
        setEditSkill("");
      })
      .catch((error) => console.error("Error updating skill:", error));
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
    {/* Top Section - Profile & Job Search */}
    <div className="flex w-full max-w-4xl gap-6">
      {/* Profile Card - Left Side */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Profile
        </h2>
        {user ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Name: {user.name}
            </h3>
  
            <h4 className="text-md font-medium text-gray-600 mt-4">Skills:</h4>
            <ul className="bg-gray-50 p-3 rounded-lg shadow-sm mt-2">
              {user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700 py-1"
                  >
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editSkill}
                        onChange={(e) => setEditSkill(e.target.value)}
                        className="border p-1 rounded w-32"
                      />
                    ) : (
                      <span>{skill}</span>
                    )}
                    <div className="space-x-2">
                      {editIndex === index ? (
                        <button
                          onClick={() => updateSkill(index)}
                          className="text-green-500 text-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditIndex(index);
                            setEditSkill(skill);
                          }}
                          className="text-blue-500 text-xs"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteSkill(index)}
                        className="text-red-500 text-xs"
                      >
                        Delete
                      </button>
                    </div>
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
          </div>
        ) : (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        )}
      </div>
  
      {/* Job Search Card - Right Side */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Job Search
        </h2>
        <form onSubmit={searchJobs} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter job title or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-all"
          >
            Search Jobs
          </button>
        </form>
        {loading && <p className="mt-4 text-center">Loading jobs...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  
    {/* Job Listings Section - Below */}
    <div className="mt-6 w-full max-w-4xl">
      {!loading && searched && jobs.length === 0 && (
        <p className="text-gray-500 text-center text-lg">No jobs found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg font-bold">{job.job_title}</h3>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500">{job.employment_type}</p>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
  );
};

export default Profile;
