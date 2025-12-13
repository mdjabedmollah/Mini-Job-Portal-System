// frontend/src/pages/JobList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Job List</h2>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                {user.name} <span className="text-gray-500">({user.role})</span>
              </span>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-purple-600 hover:underline text-sm"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-purple-600 hover:underline text-sm"
            >
              Login / Register
            </Link>
          )}
        </div>
      </header>

      {/* Job List */}
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <h3 className="text-lg font-semibold">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>

              <Link
                to={`/jobs/${job._id}`}
                className="inline-block mt-2 text-purple-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
