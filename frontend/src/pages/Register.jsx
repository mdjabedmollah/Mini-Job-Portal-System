import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    role: "user", skills: "", experience: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Password mismatch");

    const res = await api.post("/auth/register", {
      ...form,
      skills: form.skills.split(",").map(s => s.trim())
    });

    login(res.data);
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={submit} className="w-96 p-6 shadow space-y-3">
        <h2 className="text-xl font-bold">Register</h2>
        <input className="input w-full" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input w-full" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <select className="input w-full"
          onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input className="input w-full" placeholder="Skills"
          onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <input className="input w-full" placeholder="Experience"
          onChange={(e) => setForm({ ...form, experience: e.target.value })} />
        <input className="input w-full" type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="input w-full" type="password" placeholder="Confirm Password"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
