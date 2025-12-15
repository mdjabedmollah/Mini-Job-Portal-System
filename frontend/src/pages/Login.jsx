import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    login(res.data);
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={submit} className="w-96 p-6 shadow space-y-3">
        <h2 className="text-xl font-bold">Login</h2>
        <input className="input w-full" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input w-full" type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
