import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import {
  Eye,
  ArrowRight,
  Calendar,
  Clock,
  Wallet,
  MapPin,
  Car,
  Building,
  UtensilsCrossed,
  Camera,
  Lock,
} from "lucide-react";

const ACTIVITY_TYPE_MAP = {
  transport: "travel",
  hotel: "hotel",
  food: "food",
  sightseeing: "sightseeing",
  adventure: "sightseeing",
  shopping: "sightseeing",
  other: "sightseeing",
};

const getActivityType = (category) =>
  ACTIVITY_TYPE_MAP[category] || "sightseeing";

const PublicTripView = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/trip/public/${id}`);
        const data = res.data.data;
        setTrip(data.trip);
        setActivities(data.activities);
        setExpenses(data.expenses);
        setTotalSpent(data.totalSpent);
      } catch (err) {
        setError("This trip doesn't exist or the link is invalid.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Trip Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This trip may be private or the link has expired
          </p>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 inline-block"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate || trip.startDate);
  const daysCount = Math.max(
    1,
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
  );
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  const dayActivities = activities.filter(
    (a) => String(a.day) === String(selectedDay)
  );

  const totalBudget = Number(trip.totalBudget) || 0;
  const remaining = totalBudget - totalSpent;
  const budgetPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const today = new Date();
  const tripStatus =
    startDate > today
      ? "Upcoming"
      : endDate < today
      ? "Completed"
      : "Ongoing";

  const activityTypeStyles = {
    travel: {
      bar: "bg-indigo-500",
      icon: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    },
    hotel: {
      bar: "bg-amber-500",
      icon: "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
    food: {
      bar: "bg-emerald-500",
      icon: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    sightseeing: {
      bar: "bg-pink-500",
      icon: "bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      {/* Header */}
      <header className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-[#1F2937] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-black">
            <span className="text-gray-900 dark:text-white">Safar</span>
            <span className="text-indigo-500">Sathi</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
          >
            Plan Your Own Trip
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* View Only Badge */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <span className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm rounded-full px-4 py-1.5">
          <Eye size={14} />
          View Only — This trip is shared publicly
        </span>
      </div>

      {/* Trip Hero Card */}
      <div className="max-w-5xl mx-auto px-6 mt-4">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            {trip.destination}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            {trip.title}
          </p>
          <span
            className={
              tripStatus === "Upcoming"
                ? "inline-flex text-xs px-3 py-1 rounded-full font-medium bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                : tripStatus === "Ongoing"
                ? "inline-flex text-xs px-3 py-1 rounded-full font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "inline-flex text-xs px-3 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400"
            }
          >
            {tripStatus}
          </span>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0A0F1E] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
              <Calendar className="w-4 h-4" />
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
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0A0F1E] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
              <Clock className="w-4 h-4" />
              <span>{daysCount} Days</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0A0F1E] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
              <Wallet className="w-4 h-4" />
              <span>Rs {totalBudget.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0A0F1E] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{trip.destination}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Trip Itinerary
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {daysArray.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDay(d)}
              className={
                selectedDay === d
                  ? "flex-shrink-0 bg-indigo-600 text-white rounded-xl px-4 py-2 text-center min-w-[80px]"
                  : "flex-shrink-0 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-xl px-4 py-2 text-center min-w-[80px] hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
              }
            >
              <span className="text-sm font-semibold block">Day {d}</span>
              <span className="text-xs opacity-80">
                {new Date(
                  startDate.getTime() + (d - 1) * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {dayActivities.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
              No activities for this day
            </p>
          ) : (
            dayActivities.map((a) => {
              const type = getActivityType(a.category);
              const style =
                activityTypeStyles[type] || activityTypeStyles.sightseeing;
              return (
                <div
                  key={a._id}
                  className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-xl p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-1 h-12 rounded-full ${style.bar} flex-shrink-0`}
                  />
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.icon}`}
                  >
                    {type === "travel" && <Car className="w-4 h-4" />}
                    {type === "hotel" && <Building className="w-4 h-4" />}
                    {type === "food" && <UtensilsCrossed className="w-4 h-4" />}
                    {type === "sightseeing" && (
                      <Camera className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {a.title}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      <MapPin size={12} />
                      <span>{a.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={12} />
                      <span>{a.time}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-auto">
                    Rs {a.cost != null ? Number(a.cost).toLocaleString("en-IN") : "0"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Budget Section */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Budget Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Wallet className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
              Rs {totalBudget.toLocaleString("en-IN")}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide mt-0.5 text-gray-500 dark:text-gray-400">
              Total Budget
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Wallet className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
              Rs {totalSpent.toLocaleString("en-IN")}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide mt-0.5 text-gray-500 dark:text-gray-400">
              Total Spent
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                remaining >= 0
                  ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
              }`}
            >
              <Wallet className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
              Rs {Math.abs(remaining).toLocaleString("en-IN")}{" "}
              {remaining >= 0 ? "left" : "over"}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide mt-0.5 text-gray-500 dark:text-gray-400">
              Remaining
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-500 dark:text-gray-400">
              Budget used
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              Rs {totalSpent.toLocaleString("en-IN")} / Rs{" "}
              {totalBudget.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full ${
                budgetPercent < 60
                  ? "bg-emerald-500"
                  : budgetPercent < 80
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${Math.min(budgetPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="max-w-5xl mx-auto px-6 mt-8 mb-12">
        <div className="bg-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Inspired by this trip?
          </h2>
          <p className="text-indigo-100 mb-6">
            Create your own travel itinerary on SafarSathi — it is free!
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
          >
            Start Planning Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicTripView;
