import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/job/${id}`).then(res => setJob(res.data.job));
  }, [id]);

  const applyJob = async () => {
    await api.post(`/job/apply/${id}`);
    alert("Applied successfully");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.company} • {job.location}</p>
      <p>{job.description}</p>

      {user?.role === "user" && (
        <button onClick={applyJob}
          className="mt-3 bg-purple-600 text-white px-4 py-2">
          Apply
        </button>
      )}
    </div>
  );
};

export default JobDetails;
