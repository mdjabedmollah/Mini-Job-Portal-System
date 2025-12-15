import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/job/All").then(res => setJobs(res.data.job));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Jobs</h2>
      {jobs.map(job => (
        <Link key={job._id} to={`/jobs/${job._id}`}
          className="block border p-3 mb-2">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company} • {job.location}</p>
        </Link>
      ))}
    </div>
  );
};

export default JobList;
