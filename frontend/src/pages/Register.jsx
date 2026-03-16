import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">🧭</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">Start your travel planning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Your name" required />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Min 6 characters" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Creating account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-white/50 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
