import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    api.get("/job/All").then((res) => {
      // latest 5 jobs (newest first)
      const sorted = res.data.job
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setLatestJobs(sorted);
    });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 bg-purple-50 rounded mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          Browse latest job openings and apply easily
        </p>

        <Link
          to="/jobs"
          className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Latest Jobs */}
      <h2 className="text-2xl font-bold mb-4">Latest Jobs</h2>

      {latestJobs.length === 0 ? (
        <p className="text-gray-500">No jobs available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {latestJobs.map((job) => (
            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="border p-4 rounded hover:shadow"
            >
              <h3 className="font-bold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company} • {job.location}
              </p>
              {job.salaryRange && (
                <p className="text-sm text-purple-600">
                  Salary: {job.salaryRange}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link
          to="/jobs"
          className="text-purple-600 font-semibold hover:underline"
        >
          View All Jobs →
        </Link>
      </div>
    </div>
  );
};

export default Home;
