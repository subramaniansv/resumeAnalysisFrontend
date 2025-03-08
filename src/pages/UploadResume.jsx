import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadResume = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportContent, setReportContent] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    axios
      .post(`${apiUrl}/api/user/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setResumeData(response.data.user);
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setError("Error uploading resume");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
  });

  const applyJobs = () => {
    if (!resumeData || !resumeData.skills || resumeData.skills.length === 0) {
      alert("Please upload a resume with skills");
      return;
    }
  
    setJobLoading(true);
  
    axios
      .post(
        `${apiUrl}/api/user/get-jobs`,
        { skills: resumeData.skills }, // Sending skills as body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
      })
      .finally(() => {
        setJobLoading(false);
      });
  };
  
  const seeReport = () => {
    if (!resumeData) {
      alert("Please upload a resume!");
      return;
    }

    setReportContent(`
    Name: ${resumeData.name || "Not Found"}
    Skills: ${resumeData.skills?.join(", ") || "Not Found"}
    `);
  };

  return (
    <div className="p-10 bg-gray-100 flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Upload Your Resume</h1>
      <p className="text-gray-500 text-center mt-2">
        Upload a PDF or DOCX file to analyze your resume.
      </p>

      {/* Drag & Drop Upload Section */}
      <div
        {...getRootProps()}
        className={`mt-5 p-6 border-2 border-dashed rounded-lg w-96 text-center bg-white cursor-pointer transition-all ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop the file here..."
            : "Drag & Drop or Click to Upload"}
        </p>
      </div>

      {/* Display Uploaded File */}
      {uploadedFile && (
        <div className="mt-3 text-green-600 font-medium">
          ✅ {uploadedFile.name} uploaded successfully!
        </div>
      )}

      {/* Resume Analysis Section */}
      {reportContent && (
        <div className="mt-5 p-5 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-xl font-medium">Report</h2>
          <pre className="text-gray-600 whitespace-pre-wrap">
            {reportContent}
          </pre>
        </div>
      )}

      {/*Suggested Jobs*/}
      {jobs.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-5">Suggested Jobs</h2>
          <div className="flex flex-col gap-5">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{job.companyName}</h2>
                <p className="text-gray-600">Salary :{job.salary}</p>
                <p className="text-gray-500">
                  Apply Before: {job.lastDateToApply}
                </p>
                <p className="text-gray-700">{job.atsScore}</p>
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Apply Now
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex justify-center mt-5 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={seeReport}
        >
          See Report
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={applyJobs}
        >
          Apply for Jobs
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
