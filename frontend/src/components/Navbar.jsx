import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">JobPortal</Link>

      <div className="flex gap-4 items-center">
        <Link to="/jobs">Jobs</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Admin Panel
              </Link>
            )}
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
