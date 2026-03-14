import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  // Track validation errors
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
       // Only show global errors if they aren't field-specific
       setValidationErrors(prev => ({ ...prev, global: error }));
       dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user types
    if (validationErrors[e.target.name] || validationErrors.global) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: null, global: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    // API call only expects name, email, password
    const { confirmPassword, ...registerData } = formData;
    dispatch(registerUser(registerData));
  };

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className="relative hidden md:flex md:w-[45%] h-screen overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1553697388-94e804e2f0f6?q=80&w=1065&auto=format&fit=crop"
          alt="travel"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <p className="text-white text-2xl font-semibold italic leading-relaxed">
            Safar mein jo maza hai,<br />
            woh manzil mein kahan
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 h-screen items-center justify-center px-6 bg-gray-50 dark:bg-[#0A0F1E] overflow-hidden">
        <div className="w-full max-w-[400px] bg-white dark:bg-[#111827] rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-[#1F2937]">
          
          <div className="text-center mb-2">
            <span className="text-2xl font-black text-gray-900 dark:text-white">Safar</span>
            <span className="text-2xl font-black text-indigo-500">Sathi</span>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">Create Account</h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">Join us to start planning your perfect trips</p>

          {validationErrors.global && (
             <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400 text-sm text-center">
               {validationErrors.global}
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                placeholder="Your full name" 
              />
              {validationErrors.name && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{validationErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                placeholder="you@example.com" 
              />
              {validationErrors.email && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 pr-12"
                  placeholder="Min 6 characters" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className="w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 pr-12"
                  placeholder="Repeat your password" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                  <span>Please wait...</span>
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 font-medium">
              Login
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
