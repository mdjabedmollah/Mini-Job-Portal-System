import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    api.get("/job/All").then((res) => {
      setJobs(res.data.job);
      setFilteredJobs(res.data.job);
    });
  }, []);

  useEffect(() => {
    let result = jobs;

    if (search) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (salary) {
      result = result.filter((job) =>
        job.salaryRange?.toLowerCase().includes(salary.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [search, location, salary, jobs]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          All Jobs
        </h1>

        {/* Search & Filter Box */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <input
              type="text"
              placeholder="🔍 Search title or company"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="text"
              placeholder="📍 Filter by location"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="text"
              placeholder="💰 Filter by salary (e.g. 40k)"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center">
            No jobs found
          </p>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  {job.salaryRange && (
                    <span className="bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full">
                      {job.salaryRange}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {job.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
