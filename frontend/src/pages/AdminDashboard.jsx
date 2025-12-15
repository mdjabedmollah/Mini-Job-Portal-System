import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
  });

  // 🔐 admin protection
  if (!user || user.role !== "admin") {
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        Only admin can access this page
      </p>
    );
  }

  // fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await api.get("/job/All");
      setJobs(res.data.job);
    } catch {
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/job/update/${editingId}`, form);
        toast.success("Job updated successfully");
      } else {
        await api.post("/job/admin", form);
        toast.success("Job created successfully");
      }
      resetForm();
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  // EDIT
  const handleEdit = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      salaryRange: job.salaryRange || "",
      description: job.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/job/delete/${id}`);
      toast.success("Job deleted");
      fetchJobs();
    } catch {
      toast.error("Delete failed");
    }
  };

  // VIEW applicants
  const fetchApplicants = async (jobId) => {
    try {
      const res = await api.get(`/job/${jobId}/applicants`);
      setApps(res.data.apps);
      setSelectedJobId(jobId);
    } catch {
      toast.error("Failed to load applicants");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      company: "",
      location: "",
      salaryRange: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Job" : "Create New Job"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              {["title", "company", "location", "salaryRange"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="input"
                  required={field !== "salaryRange"}
                />
              ))}
            </div>

            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="input"
              required
            />

            <div className="flex gap-3">
              <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                {editingId ? "Update Job" : "Create Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 px-6 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* JOB LIST */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">All Jobs</h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs found</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchApplicants(job._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      View Applicants
                    </button>

                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* APPLICANTS */}
        {selectedJobId && (
          <div className="bg-white p-6 rounded-xl shadow mt-10">
            <h2 className="text-xl font-semibold mb-4">Applicants</h2>

            {apps.length === 0 ? (
              <p className="text-gray-500">No applicants yet</p>
            ) : (
              <div className="space-y-3">
                {apps.map((app) => (
                  <div key={app._id} className="border p-4 rounded-lg">
                    <h3 className="font-bold">{app.userId.name}</h3>
                    <p className="text-sm text-gray-600">
                      {app.userId.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied on{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
