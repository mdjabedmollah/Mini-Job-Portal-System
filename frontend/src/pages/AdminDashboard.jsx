import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "", company: "", location: "", salaryRange: "", description: ""
  });

  if (!user || user.role !== "admin") {
    return <p className="p-6 text-red-500">Admin only</p>;
  }

  const fetchJobs = async () => {
    const res = await api.get("/job/All");
    setJobs(res.data.job);
  };

  useEffect(() => { fetchJobs(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    editingId
      ? await api.put(`/job/update/${editingId}`, form)
      : await api.post("/job/admin", form);
    setForm({ title:"", company:"", location:"", salaryRange:"", description:"" });
    setEditingId(null);
    fetchJobs();
  };

  const del = async (id) => {
    await api.delete(`/job/delete/${id}`);
    fetchJobs();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      <form onSubmit={submit} className="space-y-2 my-4">
        {Object.keys(form).map(key => (
          <input key={key} className="input w-full"
            placeholder={key}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <button className="bg-purple-600 text-white px-4 py-2">
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {jobs.map(job => (
        <div key={job._id} className="border p-3 mb-2 flex justify-between">
          <div>
            <h4 className="font-bold">{job.title}</h4>
            <p>{job.company}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => { setEditingId(job._id); setForm(job); }}
              className="bg-blue-500 text-white px-3 py-1">Edit</button>
            <button onClick={() => del(job._id)}
              className="bg-red-500 text-white px-3 py-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
