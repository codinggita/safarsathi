import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../redux/tripSlice";
import { Link } from "react-router-dom";
import {
  Globe,
  Calendar,
  Clock,
  Wallet,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth ?? {});
  const { trips: allTrips = [], loading: tripsLoading = false } = useSelector(
    (state) => state.trips ?? { trips: [], loading: false }
  );
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const totalTrips = allTrips.length;
  const totalBudget = allTrips.reduce(
    (sum, t) => sum + (t.totalBudget || 0),
    0
  );
  const upcomingTrips = allTrips.filter(
    (t) => new Date(t.startDate) > new Date()
  ).length;
  const ongoingTrips = allTrips.filter(
    (t) =>
      new Date(t.startDate) <= new Date() &&
      new Date(t.endDate || t.startDate) >= new Date()
  ).length;

  const filteredTrips = allTrips
    .filter((trip) => {
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        return (
          trip.destination?.toLowerCase().includes(searchLower) ||
          trip.title?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((trip) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Upcoming")
        return new Date(trip.startDate) > new Date();
      if (activeFilter === "Ongoing")
        return (
          new Date(trip.startDate) <= new Date() &&
          new Date(trip.endDate || trip.startDate) >= new Date()
        );
      if (activeFilter === "Completed")
        return new Date(trip.endDate || trip.startDate) < new Date();
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Newest")
        return new Date(b.startDate) - new Date(a.startDate);
      if (sortBy === "Oldest")
        return new Date(a.startDate) - new Date(b.startDate);
      if (sortBy === "Budget ↑")
        return (a.totalBudget || 0) - (b.totalBudget || 0);
      if (sortBy === "Budget ↓")
        return (b.totalBudget || 0) - (a.totalBudget || 0);
      return 0;
    });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTrips.length / tripsPerPage)
  );
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {getGreeting()}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name ?? "Guest"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Here is your travel overview
            </p>
          </div>
          <Link
            to="/create-trip"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
          >
            <Plus className="w-4 h-4" /> New Trip
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalTrips}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                Total Trips
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {upcomingTrips}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                Upcoming
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {ongoingTrips}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                Ongoing
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalBudget.toLocaleString("en-IN")}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                Total Budget
              </p>
            </div>
          </div>
        </div>

        {/* Trips Section */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              My Trips
            </h2>
            <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full px-2.5 py-0.5">
              {filteredTrips.length}
            </span>
          </div>
          <Link
            to="/create-trip"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
          >
            <Plus className="w-4 h-4" /> New Trip
          </Link>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips, destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {["All", "Upcoming", "Ongoing", "Completed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "bg-indigo-600 text-white rounded-lg px-4 py-1.5 text-sm font-medium"
                    : "bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-lg px-4 py-1.5 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                }
              >
                {filter}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-700 dark:text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Budget ↑">Budget ↑</option>
            <option value="Budget ↓">Budget ↓</option>
          </select>
        </div>

        {/* Skeleton Loading */}
        {tripsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-28 bg-gray-200 dark:bg-gray-800" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-3" />
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trip Cards Grid */}
        {!tripsLoading && (
          <>
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedTrips.map((trip) => {
                  const startDate = new Date(trip.startDate);
                  const endDate = new Date(trip.endDate || trip.startDate);
                  const today = new Date();
                  const isUpcoming = startDate > today;
                  const isOngoing =
                    startDate <= today && endDate >= today;
                  const isCompleted = endDate < today;
                  const percentage =
                    trip.totalBudget > 0
                      ? ((trip.spent || 0) / trip.totalBudget) * 100
                      : 0;

                  return (
                    <Link
                      to={`/trips/${trip._id ?? trip.id}`}
                      key={trip._id ?? trip.id}
                      className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300"
                    >
                      <div
                        className={`h-28 p-4 flex flex-col justify-between ${
                          isUpcoming
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600"
                            : isOngoing
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                            : "bg-gradient-to-r from-gray-500 to-gray-600"
                        }`}
                      >
                        <span className="self-end text-xs px-2.5 py-1 rounded-full font-medium bg-white/20 text-white">
                          {isUpcoming ? "Upcoming" : isOngoing ? "Ongoing" : "Completed"}
                        </span>
                        <h3 className="text-lg font-bold text-white truncate">
                          {trip.destination}
                        </h3>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-2">
                          {trip.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {startDate.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            -{" "}
                            {endDate.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 dark:text-gray-400">
                              Rs {(trip.spent || 0).toLocaleString("en-IN")}
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Rs {(trip.totalBudget || 0).toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                              className={`h-1 rounded-full ${
                                percentage < 60
                                  ? "bg-emerald-500"
                                  : percentage < 80
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-[#1F2937]">
                          <span className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200">
                            View Trip
                          </span>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                            title="Edit"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                            title="Delete"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center text-center">
                <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No trips found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Start planning your first adventure
                </p>
                <Link
                  to="/create-trip"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200"
                >
                  Plan Your First Trip
                </Link>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-[#1F2937]">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(currentPage - 1) * tripsPerPage + 1}-
                {Math.min(currentPage * tripsPerPage, filteredTrips.length)} of{" "}
                {filteredTrips.length} trips
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-500 dark:text-gray-400 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 text-sm rounded-lg ${
                      currentPage === i + 1
                        ? "bg-indigo-600 border-indigo-600 text-white font-semibold"
                        : "bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-500 dark:text-gray-400 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
