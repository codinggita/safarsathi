import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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

  const inputBase =
    "w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 dark:bg-[#1F2937] dark:border-[#374151] dark:text-white dark:placeholder:text-gray-500";

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      {/* Left panel - hidden on mobile */}
      <div className="relative hidden md:flex md:w-[45%] h-screen overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1553697388-94e804e2f0f6?q=80&w=1065&auto=format&fit=crop"
          alt="travel"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <p className="text-white text-2xl font-semibold italic leading-relaxed">
            Safar mein jo maza hai,
            <br />
            woh manzil mein kahan
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 h-screen overflow-hidden items-center justify-center px-8 bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="w-full max-w-[420px] bg-white dark:bg-[#111827] rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-[#1F2937]">
          <div className="text-center mb-6">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              Safar
            </span>
            <span className="text-xl font-black text-indigo-500">Sathi</span>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
            Sign in to continue planning your trips
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputBase}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white dark:bg-[#1F2937]
                             border border-gray-300
                             dark:border-[#374151]
                             text-gray-900 dark:text-white
                             rounded-xl px-4 py-3
                             pr-11
                             placeholder:text-gray-400
                             dark:placeholder:text-gray-500
                             focus:outline-none
                             focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-500/20
                             transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0
                             flex items-center
                             justify-center
                             w-11
                             text-gray-400
                             hover:text-gray-600
                             dark:text-gray-500
                             dark:hover:text-gray-300"
                >
                  {showPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={
                loading
                  ? "w-full bg-indigo-600 opacity-80 cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                  : "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
              }
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 hover:text-indigo-400 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
