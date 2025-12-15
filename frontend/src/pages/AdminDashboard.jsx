import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
  });

  // 🔐 Admin protection
  if (!user || user.role !== "admin") {
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        Only admin can access this page
      </p>
    );
  }

  // fetch jobs
  const fetchJobs = async () => {
    const res = await api.get("/job/All");
    setJobs(res.data.job);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/job/update/${editingId}`, form);
    } else {
      await api.post("/job/admin", form);
    }

    setForm({
      title: "",
      company: "",
      location: "",
      salaryRange: "",
      description: "",
    });
    setEditingId(null);
    fetchJobs();
  };

  // edit
  const handleEdit = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      salaryRange: job.salaryRange || "",
      description: job.description,
    });
  };

  // delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await api.delete(`/job/delete/${id}`);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Job" : "Create New Job"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="title"
                placeholder="Job Title"
                value={form.title}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              <input
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              <input
                name="salaryRange"
                placeholder="Salary Range (e.g. 40k - 60k)"
                value={form.salaryRange}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                {editingId ? "Update Job" : "Create Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      company: "",
                      location: "",
                      salaryRange: "",
                      description: "",
                    });
                  }}
                  className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Job List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">All Jobs</h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
