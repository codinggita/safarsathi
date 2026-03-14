import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Trips", path: "/trips" },
    { name: "New Trip", path: "/create-trip" },
  ];

  return (
    <nav className="h-[64px] bg-white dark:bg-[#0A0F1E] sticky top-0 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 border-b border-gray-200 dark:border-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Left Side */}
        <Link to="/" className="flex items-center relative group z-50 hover:opacity-90 transition-opacity">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">Safar</span>
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Sathi
            </span>
          </span>
        </Link>

        {/* Center (Desktop only) */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {user && navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center h-full text-sm relative transition-colors duration-200 ${
                  isActive 
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold" 
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {dark ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-400" />}
          </button>

          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-500 dark:hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
             <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {dark ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-400" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white dark:bg-[#0A0F1E] z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col border-r border-gray-200 dark:border-[#1F2937] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex-1 flex flex-col">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center mb-10 hover:opacity-90 transition-opacity">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900 dark:text-white">Safar</span>
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Sathi
              </span>
            </span>
          </Link>
          
          <div className="flex flex-col gap-6 flex-1">
            {user ? (
              <>
                <div className="pb-6 border-b border-gray-200 dark:border-gray-800 mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Hi, {user.name}
                </div>
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg transition-colors duration-200 ${
                        isActive 
                          ? "text-indigo-600 dark:text-indigo-400 font-semibold" 
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </>
            ) : (
               <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {user && (
             <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-indigo-600 hover:border-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-500 dark:hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
