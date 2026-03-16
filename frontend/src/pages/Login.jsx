import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(loginUser(formData));
  };

  const getInputClass = (field) => {
    const base = `w-full bg-white dark:bg-[#1F2937] 
      rounded-xl px-4 py-3 
      placeholder:text-gray-400 dark:placeholder:text-gray-500 
      text-gray-900 dark:text-white
      focus:outline-none focus:ring-2 
      transition-all duration-200`;
    if (errors[field]) {
      return `${base} border border-red-500 
        focus:border-red-500 focus:ring-red-500/20`;
    }
    if (formData[field]) {
      return `${base} border border-emerald-500 
        focus:border-emerald-500 focus:ring-emerald-500/20`;
    }
    return `${base} border border-gray-300 
      dark:border-[#374151] 
      focus:border-indigo-500 focus:ring-indigo-500/20`;
  };

  return (
    <div className="fixed inset-0 flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="relative hidden md:block md:w-[45%] 
                      h-screen flex-shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553697388-94e804e2f0f6?q=80&w=1065&auto=format&fit=crop"
          alt="travel"
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute z-10 bottom-10 left-10 right-10">
          <p className="text-2xl italic font-semibold leading-relaxed text-white">
            Safar mein jo maza hai,<br />
            woh manzil mein kahan
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 h-screen items-center 
                      justify-center px-8 overflow-hidden 
                      bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="w-full max-w-[420px] 
                        bg-white dark:bg-[#111827] 
                        border border-gray-200 dark:border-[#1F2937] 
                        rounded-2xl p-8 shadow-sm">

          {/* Logo */}
          <div className="mb-6 text-center">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              Safar
            </span>
            <span className="text-xl font-black text-indigo-500">
              Sathi
            </span>
          </div>

          <h1 className="mb-1 text-2xl font-bold text-center text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mb-8 text-sm text-center text-gray-500 dark:text-gray-400">
            Sign in to continue planning your trips
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium 
                                 text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={getInputClass("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium 
                                 text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${getInputClass("password")} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword 
                    ? <EyeOff size={18} /> 
                    : <Eye size={18} />
                  }
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                  Please wait...
                </>
              ) : "Login"}
            </button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-500 hover:text-indigo-400"
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