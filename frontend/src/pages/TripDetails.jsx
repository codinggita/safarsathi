import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripById } from "../redux/tripSlice";
import {
  fetchActivities,
  createActivity,
  deleteActivity,
} from "../redux/activitySlice";
import {
  fetchExpenses,
  createExpense,
  deleteExpense,
} from "../redux/expenseSlice";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  MapPin,
  Link2,
  Pencil,
  Calendar,
  Wallet,
  CheckCircle,
  Clock,
  Plus,
  X,
  Car,
  Building,
  UtensilsCrossed,
  Camera,
  AlertTriangle,
  Trash2,
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

const getActivityType = (category) => ACTIVITY_TYPE_MAP[category] || "sightseeing";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrip: trip, loading: tripLoading } = useSelector(
    (state) => state.trips ?? {}
  );
  const { activities = [] } = useSelector((state) => state.activities ?? {});
  const { expenses = [], totalSpent = 0 } = useSelector(
    (state) => state.expenses ?? {}
  );

  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedDay, setSelectedDay] = useState(1);
  const [showActForm, setShowActForm] = useState(false);
  const [actForm, setActForm] = useState({
    day: "",
    title: "",
    location: "",
    time: "",
    notes: "",
    category: "sightseeing",
  });
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({
    title: "",
    amount: "",
    category: "food",
    date: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchTripById(id));
      dispatch(fetchActivities(id));
      dispatch(fetchExpenses(id));
    }
  }, [dispatch, id]);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createActivity({ ...actForm, tripId: id })).unwrap();
      toast.success("Activity added");
      setActForm({
        day: "",
        title: "",
        location: "",
        time: "",
        notes: "",
        category: "sightseeing",
      });
      setShowActForm(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteActivity = async (actId) => {
    try {
      await dispatch(deleteActivity(actId)).unwrap();
      toast.success("Activity deleted");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createExpense({ ...expForm, tripId: id })).unwrap();
      toast.success("Expense added");
      setExpForm({ title: "", amount: "", category: "food", date: "" });
      setShowExpForm(false);
      dispatch(fetchExpenses(id));
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteExpense = async (expId) => {
    try {
      await dispatch(deleteExpense(expId)).unwrap();
      toast.success("Expense deleted");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/trip/public/${trip._id}`
    );
    toast.success("Link copied!");
  };

  if (tripLoading || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading trip...</p>
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

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const inputClass =
    "w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200";

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

  const expenseCategoryStyle = {
    food: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    transport:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
    hotel:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    shopping:
      "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400",
    tickets:
      "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400",
    other: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400",
  };

  const modalCategoryToBackend = {
    travel: "transport",
    hotel: "hotel",
    food: "food",
    sightseeing: "sightseeing",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium mb-6 transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {trip.title}
            </h1>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
              <MapPin size={14} />
              <span>{trip.destination}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 border border-gray-300 dark:border-[#374151] text-gray-600 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              <Link2 size={14} />
              Share
            </button>
            <Link
              to={`/trips/${id}/edit`}
              className="flex items-center gap-2 border border-gray-300 dark:border-[#374151] text-gray-600 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              <Pencil size={14} />
              Edit
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{daysCount} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
            <Wallet className="w-4 h-4" />
            <span>Rs {totalBudget.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>{activities.length} Activities</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-full px-4 py-1.5 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{trip.destination}</span>
          </div>
        </div>

        <div className="flex border-b border-gray-200 dark:border-[#1F2937] mb-6">
          {["itinerary", "budget", "overview"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "px-4 pb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 cursor-pointer capitalize"
                  : "px-4 pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-all duration-200 capitalize"
              }
            >
              {tab === "itinerary" ? "Itinerary" : tab === "budget" ? "Budget" : "Overview"}
            </button>
          ))}
        </div>

        {activeTab === "itinerary" && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {daysArray.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  className={
                    selectedDay === d
                      ? "flex-shrink-0 bg-indigo-600 text-white rounded-xl px-4 py-2 text-center cursor-pointer min-w-[80px]"
                      : "flex-shrink-0 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 rounded-xl px-4 py-2 text-center cursor-pointer min-w-[80px] hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
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
              {dayActivities.map((a) => {
                const type = getActivityType(a.category);
                const style = activityTypeStyles[type] || activityTypeStyles.sightseeing;
                return (
                  <div
                    key={a._id}
                    className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-xl p-4 flex items-center gap-4 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-200"
                  >
                    <div
                      className={`w-1 h-12 rounded-full ${style.bar} flex-shrink-0`}
                    />
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.icon}`}
                    >
                      {type === "travel" && <Car className="w-4 h-4" />}
                      {type === "hotel" && <Building className="w-4 h-4" />}
                      {type === "food" && (
                        <UtensilsCrossed className="w-4 h-4" />
                      )}
                      {type === "sightseeing" && (
                        <Camera className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Rs {a.cost != null ? Number(a.cost).toLocaleString("en-IN") : "0"}
                    </div>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(a._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setActForm((prev) => ({ ...prev, day: String(selectedDay) }));
                setShowActForm(true);
              }}
              className="w-full mt-4 border-2 border-dashed border-gray-300 dark:border-[#374151] rounded-xl py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Plus size={16} />
              Add Activity
            </button>
          </>
        )}

        {activeTab === "budget" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
                  Rs {totalBudget.toLocaleString("en-IN")}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
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
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
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
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                  Remaining
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 mb-4">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600 dark:text-gray-400">
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
              {remaining < 0 && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 mt-3 text-red-600 dark:text-red-400 text-sm">
                  <AlertTriangle size={14} />
                  <span>
                    Budget exceeded by Rs {Math.abs(remaining).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {["food", "transport", "hotel", "shopping"].map((cat) => {
                const amt = categoryTotals[cat] || 0;
                const pct =
                  totalSpent > 0 ? ((amt / totalSpent) * 100).toFixed(0) : 0;
                return (
                  <div
                    key={cat}
                    className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-xl p-4"
                  >
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 capitalize">
                      {cat}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Rs {amt.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{pct}%</p>
                    <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-700 mt-2">
                      <div
                        className="h-1 rounded-full bg-indigo-500"
                        style={{
                          width: `${totalSpent > 0 ? (amt / totalSpent) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-5 mb-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Add Expense
              </h3>
              {!showExpForm ? (
                <button
                  type="button"
                  onClick={() => setShowExpForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 dark:border-[#374151] rounded-xl py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  + Add expense
                </button>
              ) : (
                <form onSubmit={handleAddExpense} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Title
                      </label>
                      <input
                        value={expForm.title}
                        onChange={(e) =>
                          setExpForm({ ...expForm, title: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Expense title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Amount (Rs)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={expForm.amount}
                        onChange={(e) =>
                          setExpForm({ ...expForm, amount: e.target.value })
                        }
                        className={inputClass}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={expForm.date}
                        onChange={(e) =>
                          setExpForm({ ...expForm, date: e.target.value })
                        }
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Category
                      </label>
                      <select
                        value={expForm.category}
                        onChange={(e) =>
                          setExpForm({ ...expForm, category: e.target.value })
                        }
                        className={inputClass}
                      >
                        {["food", "transport", "hotel", "shopping", "tickets", "other"].map(
                          (c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowExpForm(false)}
                      className="flex-1 border border-gray-300 dark:border-[#374151] text-gray-600 dark:text-gray-400 rounded-xl py-2 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200"
                    >
                      Add Expense
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 bg-gray-50 dark:bg-[#0A0F1E] px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                <span>Title</span>
                <span>Category</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Action</span>
              </div>
              {expenses.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No expenses yet
                </div>
              ) : (
                expenses.map((exp) => (
                  <div
                    key={exp._id}
                    className="grid grid-cols-5 px-4 py-3 border-t border-gray-100 dark:border-[#1F2937] items-center"
                  >
                    <span className="text-sm text-gray-900 dark:text-white truncate">
                      {exp.title}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${
                        expenseCategoryStyle[exp.category] ||
                        expenseCategoryStyle.other
                      }`}
                    >
                      {exp.category}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Rs {Number(exp.amount).toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(exp.date).toLocaleDateString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteExpense(exp._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200 w-fit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "overview" && (
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F2937]">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Trip Title
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {trip.title}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F2937]">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Destination
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {trip.destination}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F2937]">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Start Date
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {startDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F2937]">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  End Date
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {endDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F2937] last:border-0">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Budget
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Rs {totalBudget.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <Link
              to={`/trips/${id}/edit`}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Trip
            </Link>
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showActForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add Activity
              </h3>
              <button
                type="button"
                onClick={() => setShowActForm(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddActivity} className="space-y-5">
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { key: "travel", icon: Car, label: "Travel" },
                  { key: "hotel", icon: Building, label: "Hotel" },
                  { key: "food", icon: UtensilsCrossed, label: "Food" },
                  { key: "sightseeing", icon: Camera, label: "Sightseeing" },
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setActForm((prev) => ({
                        ...prev,
                        category: modalCategoryToBackend[key] || key,
                      }))
                    }
                    className={
                      actForm.category === (modalCategoryToBackend[key] || key)
                        ? "flex flex-col items-center gap-1 py-3 rounded-xl bg-indigo-600 text-white text-xs font-medium"
                        : "flex flex-col items-center gap-1 py-3 rounded-xl bg-gray-100 dark:bg-[#1F2937] text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Day
                </label>
                <input
                  type="number"
                  min="1"
                  value={actForm.day}
                  onChange={(e) =>
                    setActForm({ ...actForm, day: e.target.value })
                  }
                  className={inputClass}
                  placeholder="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  value={actForm.title}
                  onChange={(e) =>
                    setActForm({ ...actForm, title: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Activity title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Location
                </label>
                <input
                  value={actForm.location}
                  onChange={(e) =>
                    setActForm({ ...actForm, location: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Time
                </label>
                <input
                  type="time"
                  value={actForm.time}
                  onChange={(e) =>
                    setActForm({ ...actForm, time: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={actForm.notes}
                  onChange={(e) =>
                    setActForm({ ...actForm, notes: e.target.value })
                  }
                  className={`${inputClass} min-h-[80px]`}
                  placeholder="Notes"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowActForm(false)}
                  className="flex-1 border border-gray-300 dark:border-[#374151] text-gray-600 dark:text-gray-400 rounded-xl py-2.5 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
