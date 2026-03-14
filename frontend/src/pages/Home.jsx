import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-6">
        <HiOutlineGlobeAlt className="text-5xl text-primary-600 dark:text-primary-400 animate-pulse" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
        Plan Smarter. Travel Better.
      </h1>
      <p className="text-gray-500 dark:text-white/50 text-lg max-w-xl mb-8">
        SafarSathi helps you plan trips, manage activities, and track expenses — all in one place.
      </p>
      {user ? (
        <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-3">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
