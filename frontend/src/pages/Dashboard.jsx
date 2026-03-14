import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../redux/tripSlice";
import { Link } from "react-router-dom";
import { HiOutlineGlobeAlt, HiOutlineCurrencyRupee, HiOutlineCalendar, HiOutlinePlusCircle } from "react-icons/hi";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { trips } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const totalTrips = trips.length;
  const totalBudget = trips.reduce((sum, t) => sum + (t.totalBudget || 0), 0);
  const upcomingTrips = trips.filter((t) => new Date(t.startDate) > new Date()).length;

  const stats = [
    { icon: <HiOutlineGlobeAlt className="text-2xl text-primary-500" />, label: "Total Trips", value: totalTrips },
    { icon: <HiOutlineCalendar className="text-2xl text-emerald-500" />, label: "Upcoming", value: upcomingTrips },
    { icon: <HiOutlineCurrencyRupee className="text-2xl text-amber-500" />, label: "Total Budget", value: `₹${totalBudget.toLocaleString("en-IN")}` },
  ];

  const features = [
    { icon: <HiOutlineGlobeAlt className="text-3xl text-primary-500" />, title: "Plan Trips", desc: "Create and organize trips with destinations, dates, and budgets.", link: "/trips" },
    { icon: <HiOutlineCalendar className="text-3xl text-emerald-500" />, title: "Add Activities", desc: "Plan day-wise activities — sightseeing, food, adventure and more.", link: "/trips" },
    { icon: <HiOutlineCurrencyRupee className="text-3xl text-amber-500" />, title: "Track Expenses", desc: "Log every expense and stay within your travel budget.", link: "/trips" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, <span className="text-primary-600 dark:text-primary-400">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-500 dark:text-white/50 mt-1">Plan your next adventure with SafarSathi.</p>
        </div>
        <Link to="/create-trip" className="btn-primary flex items-center gap-2">
          <HiOutlinePlusCircle /> New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5">{s.icon}</div>
            <div>
              <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Link to={f.link} key={i} className="card hover:border-primary-500/50 hover:shadow-md transition-all group">
            <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-white/5 w-fit">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition text-gray-900 dark:text-white">{f.title}</h3>
            <p className="text-gray-500 dark:text-white/50 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
