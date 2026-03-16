import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../redux/tripSlice";
import { Link } from "react-router-dom";
import { HiOutlineGlobeAlt, HiOutlineCurrencyRupee, HiOutlineCalendar, HiOutlinePlusCircle } from "react-icons/hi";
import { X, Search } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { trips } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(fetchTrips({
      search: debouncedSearch,
      status: activeFilter === 'all' ? '' : activeFilter,
      sort: sortBy,
      page: 1
    }));
  }, [debouncedSearch, activeFilter, sortBy, dispatch]);

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

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' }
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

      <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-4 mb-8">
        <div className="relative mb-4 md:mb-0 w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search trips..."
            className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-900 dark:text-white rounded-xl pl-10 pr-10 py-2.5 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={activeFilter === filter.value
                ? "bg-indigo-600 text-white rounded-lg px-4 py-1.5 text-sm font-medium"
                : "bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-lg px-4 py-1.5 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-700 dark:text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="budget_high">Budget: High to Low</option>
          <option value="budget_low">Budget: Low to High</option>
        </select>
      </div>

      {trips.length === 0 && debouncedSearch && (
        <div className="col-span-full py-20 flex flex-col items-center text-center">
          <Search className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            No trips found
          </h3>
          <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
            No results for "{debouncedSearch}"
          </p>
          <button
            onClick={() => setSearchInput('')}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {!(trips.length === 0 && debouncedSearch) && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
