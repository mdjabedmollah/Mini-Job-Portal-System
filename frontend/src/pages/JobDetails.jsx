import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  // fetch job
  useEffect(() => {
    api.get(`/job/${id}`)
      .then((res) => setJob(res.data.job))
      .catch(console.error);
  }, [id]);

  // apply job
  const applyJob = async () => {
    try {
      await api.post(`/job/apply/${id}`);
      setApplied(true);
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">
        {job.company} • {job.location}
      </p>

      {job.salaryRange && (
        <p className="text-purple-600 mt-2">
          Salary: {job.salaryRange}
        </p>
      )}

      <p className="mt-4 text-gray-700">{job.description}</p>

      {/* Apply Button */}
      {user?.role === "user" && (
        <button
          onClick={applyJob}
          disabled={applied}
          className={`mt-6 px-6 py-2 rounded text-white ${
            applied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {applied ? "Already Applied" : "Apply Now"}
        </button>
      )}
    </div>
  );
};

export default JobDetails;
