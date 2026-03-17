import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips, deleteTrip } from "../redux/tripSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus, Search, X, Globe, Calendar,
  Wallet, Clock, Pencil, Trash2, MapPin
} from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { trips, loading, totalPages, currentPage } =
    useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeFilter, sortBy]);

  useEffect(() => {
    dispatch(
      fetchTrips({
        search: debouncedSearch,
        status: activeFilter === "all" ? "" : activeFilter,
        sort: sortBy,
        page,
        limit: 6,
      })
    );
  }, [debouncedSearch, activeFilter, sortBy, page, dispatch]);

  const totalBudget = trips.reduce(
    (sum, t) => sum + (t.totalBudget || 0), 0
  );
  const upcomingCount = trips.filter(
    (t) => t.status === "upcoming"
  ).length;
  const ongoingCount = trips.filter(
    (t) => t.status === "ongoing"
  ).length;

  const handleDelete = async (e, tripId) => {
    e.stopPropagation();
    if (window.confirm("Delete this trip?")) {
      await dispatch(deleteTrip(tripId));
      dispatch(
        fetchTrips({
          search: debouncedSearch,
          status: activeFilter === "all" ? "" : activeFilter,
          sort: sortBy,
          page,
          limit: 6,
        })
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "upcoming":
        return {
          banner: "bg-gradient-to-br from-indigo-900 to-indigo-700",
          badge: "bg-indigo-400/20 text-indigo-300",
        };
      case "ongoing":
        return {
          banner: "bg-gradient-to-br from-emerald-900 to-emerald-700",
          badge: "bg-emerald-400/20 text-emerald-300",
        };
      default:
        return {
          banner: "bg-gradient-to-br from-gray-700 to-gray-600",
          badge: "bg-gray-400/20 text-gray-300",
        };
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      <div className="px-6 py-8 mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {greeting}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here is your travel overview
            </p>
          </div>
          <Link
            to="/create-trip"
            className="flex items-center gap-2
                       bg-indigo-600 hover:bg-indigo-700
                       text-white font-semibold
                       px-5 py-2.5 rounded-xl
                       transition-all duration-200 text-sm"
          >
            <Plus size={16} />
            New Trip
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
          {[
            {
              icon: Globe,
              color: "indigo",
              value: trips.length,
              label: "Total Trips",
            },
            {
              icon: Calendar,
              color: "blue",
              value: upcomingCount,
              label: "Upcoming",
            },
            {
              icon: Clock,
              color: "emerald",
              value: ongoingCount,
              label: "Ongoing",
            },
            {
              icon: Wallet,
              color: "amber",
              value: `₹${totalBudget.toLocaleString("en-IN")}`,
              label: "Total Budget",
            },
          ].map(({ icon: Icon, color, value, label }) => (
            <div
              key={label}
              className="bg-white dark:bg-[#111827]
                         border border-gray-200
                         dark:border-[#1F2937]
                         rounded-2xl p-5
                         flex items-center gap-4
                         hover:-translate-y-0.5
                         transition-all duration-200"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center
                            justify-center flex-shrink-0
                            bg-${color}-100 dark:bg-${color}-500/20
                            text-${color}-600 dark:text-${color}-400`}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {value}
                </p>
                <p className="text-xs text-gray-500
                               dark:text-gray-400
                               uppercase tracking-wide mt-0.5">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trips Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              My Trips
            </h2>
            <span className="bg-indigo-100
                             dark:bg-indigo-500/20
                             text-indigo-600
                             dark:text-indigo-400
                             text-xs font-semibold
                             rounded-full px-2.5 py-0.5">
              {trips.length}
            </span>
          </div>
          <Link
            to="/create-trip"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            <Plus size={14} />
            New Trip
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3.5 top-1/2
                       -translate-y-1/2 w-4 h-4
                       text-gray-400 pointer-events-none"
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search trips, destinations..."
            className="w-full bg-white dark:bg-[#111827]
                       border border-gray-200
                       dark:border-[#1F2937]
                       text-gray-900 dark:text-white
                       rounded-xl pl-10 pr-10 py-2.5 text-sm
                       placeholder:text-gray-400
                       dark:placeholder:text-gray-500
                       focus:outline-none
                       focus:border-indigo-500
                       focus:ring-2 focus:ring-indigo-500/20
                       transition-all duration-200"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3.5 top-1/2
                         -translate-y-1/2 text-gray-400
                         hover:text-gray-600
                         dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter + Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {["all", "upcoming", "ongoing", "completed"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={
                    activeFilter === f
                      ? "bg-indigo-600 text-white rounded-lg px-4 py-1.5 text-sm font-medium capitalize"
                      : "bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-lg px-4 py-1.5 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 capitalize"
                  }
                >
                  {f === "all" ? "All" : f}
                </button>
              )
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-[#111827]
                       border border-gray-200
                       dark:border-[#1F2937]
                       text-gray-700 dark:text-gray-300
                       rounded-lg px-3 py-1.5 text-sm
                       focus:outline-none
                       focus:border-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="budget_high">Budget: High to Low</option>
            <option value="budget_low">Budget: Low to High</option>
          </select>
        </div>

        {/* Trip Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#111827]
                           border border-gray-200
                           dark:border-[#1F2937]
                           rounded-2xl overflow-hidden
                           animate-pulse"
              >
                <div className="bg-gray-200 h-28 dark:bg-gray-800" />
                <div className="p-4 space-y-3">
                  <div className="w-3/4 h-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                  <div className="w-1/2 h-3 bg-gray-200 rounded-lg dark:bg-gray-700" />
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MapPin className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {debouncedSearch
                ? `No results for "${debouncedSearch}"`
                : "No trips found"}
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {debouncedSearch
                ? "Try a different search"
                : "Start planning your first adventure"}
            </p>
            {debouncedSearch ? (
              <button
                onClick={() => setSearchInput("")}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear search
              </button>
            ) : (
              <Link
                to="/create-trip"
                className="bg-indigo-600 hover:bg-indigo-700
                           text-white font-semibold
                           px-6 py-2.5 rounded-xl text-sm
                           transition-all duration-200"
              >
                Plan Your First Trip
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
              const style = getStatusStyle(trip.status);
              const budget = Number(trip.totalBudget) || 0;
              const spent = Number(trip.totalSpent) || 0;
              const pct = budget > 0
                ? Math.min((spent / budget) * 100, 100) : 0;
              const barColor =
                pct < 60
                  ? "bg-emerald-500"
                  : pct < 80
                  ? "bg-amber-500"
                  : "bg-red-500";

              return (
                <div
                  key={trip._id}
                  className="bg-white dark:bg-[#111827]
                             border border-gray-200
                             dark:border-[#1F2937]
                             rounded-2xl overflow-hidden
                             hover:shadow-lg
                             hover:shadow-indigo-500/10
                             hover:-translate-y-1
                             hover:border-indigo-300
                             dark:hover:border-indigo-500/40
                             transition-all duration-300
                             cursor-pointer"
                  onClick={() =>
                    navigate(`/trips/${trip._id}`)
                  }
                >
                  {/* Banner */}
                  <div
                    className={`h-28 ${style.banner}
                                p-4 flex flex-col
                                justify-between`}
                  >
                    <div className="flex justify-end">
                      <span
                        className={`text-xs px-2.5 py-1
                                    rounded-full font-medium
                                    ${style.badge}`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white truncate">
                      {trip.destination}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-900 truncate dark:text-white">
                      {trip.title}
                    </p>
                    <div className="flex items-center gap-1.5
                                    text-xs text-gray-500
                                    dark:text-gray-400 mb-3">
                      <Calendar size={12} />
                      <span>
                        {new Date(trip.startDate)
                          .toLocaleDateString("en-IN")}
                        {" "} - {" "}
                        {new Date(trip.endDate)
                          .toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    {/* Budget Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          ₹{spent.toLocaleString("en-IN")}
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          ₹{budget.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full dark:bg-gray-700">
                        <div
                          className={`h-1 rounded-full
                                      ${barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2
                                    pt-3 border-t
                                    border-gray-100
                                    dark:border-[#1F2937]">
                      <Link
                        to={`/trips/${trip._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 text-xs font-semibold text-center text-indigo-600 transition-all duration-200 border border-indigo-500 rounded-lg dark:text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                      >
                        View Trip
                      </Link>
                      <button
                        onClick={(e) =>
                          handleDelete(e, trip._id)
                        }
                        className="p-1.5 rounded-lg
                                   text-gray-400
                                   hover:text-red-500
                                   hover:bg-red-50
                                   dark:hover:bg-red-500/10
                                   transition-all duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={trips.length}
            itemsPerPage={6}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;