import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    dispatch(loginUser(formData));
  };

  const inputClass =
    "w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200";

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      {/* LEFT PANEL */}
      <div className="relative hidden md:block md:w-[45%] h-screen flex-shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553697388-94e804e2f0f6?q=80&w=1065&auto=format&fit=crop"
          alt="travel"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <p className="text-white text-2xl font-semibold italic leading-relaxed">
            Safar mein jo maza hai,<br />
            woh manzil mein kahan
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 h-screen items-center justify-center px-8 overflow-hidden bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="w-full max-w-[420px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-8 shadow-sm">
          {/* Logo */}
          <div className="text-center mb-6">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              Safar
            </span>
            <span className="text-xl font-black text-indigo-500">Sathi</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
            Welcome Back
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
            Sign in to continue planning your trips
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              {loading ? "Please wait..." : "Login"}
            </button>

            {/* Bottom Link */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-500 hover:text-indigo-400 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
