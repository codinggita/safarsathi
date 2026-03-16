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
    <nav className="h-[64px] bg-white/70 dark:bg-[#0A0F1E]/70 sticky top-0 z-50 backdrop-blur-xl border-b border-white/20 dark:border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
        {/* Left Side */}
        <Link to="/" className="relative z-50 flex items-center transition-opacity group hover:opacity-90">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">Safar</span>
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Sathi
            </span>
          </span>
        </Link>

        {/* Center (Desktop only) */}
        <div className="items-center hidden h-full gap-8 md:flex">
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

        <div className="items-center hidden gap-6 md:flex">
          <button
            onClick={toggleTheme}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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
                className="px-4 py-2 text-sm font-semibold text-gray-600 transition-colors duration-200 border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-500 dark:hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
             <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="z-50 flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className="flex flex-col flex-1 p-6">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center mb-10 transition-opacity hover:opacity-90">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900 dark:text-white">Safar</span>
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Sathi
              </span>
            </span>
          </Link>
          
          <div className="flex flex-col flex-1 gap-6">
            {user ? (
              <>
                <div className="pb-6 mb-2 text-sm font-medium text-gray-600 border-b border-gray-200 dark:border-gray-800 dark:text-gray-300">
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
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>

          {user && (
             <div className="pt-6 mt-auto border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full py-3 font-semibold text-gray-600 transition-colors duration-200 border border-gray-300 rounded-xl dark:border-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-500 dark:hover:text-white"
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
