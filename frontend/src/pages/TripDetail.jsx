import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityForm, setActivityForm] = useState({
    day: "", title: "", location: "", time: "", notes: "", category: "sightseeing",
  });

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: "", amount: "", category: "food", date: "",
  });

  const fetchData = async () => {
    try {
      const [tripRes, actRes, expRes] = await Promise.all([
        API.get(`/trips/${id}`),
        API.get(`/activities/${id}`),
        API.get(`/expenses/${id}`),
      ]);
      setTrip(tripRes.data.data);
      setActivities(actRes.data.data);
      setExpenses(expRes.data.data);
      setTotalSpent(expRes.data.totalSpent || 0);
    } catch (err) {
      toast.error(err.message);
      navigate("/trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await API.post("/activities", { ...activityForm, tripId: id });
      toast.success("Activity added");
      setActivityForm({ day: "", title: "", location: "", time: "", notes: "", category: "sightseeing" });
      setShowActivityForm(false);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteActivity = async (actId) => {
    try {
      await API.delete(`/activities/${actId}`);
      toast.success("Activity deleted");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", { ...expenseForm, tripId: id });
      toast.success("Expense added");
      setExpenseForm({ title: "", amount: "", category: "food", date: "" });
      setShowExpenseForm(false);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteExpense = async (expId) => {
    try {
      await API.delete(`/expenses/${expId}`);
      toast.success("Expense deleted");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-center text-white/50 py-20">Loading...</p>;
  if (!trip) return null;

  const budgetPercent = trip.totalBudget > 0 ? Math.min((totalSpent / trip.totalBudget) * 100, 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => navigate("/trips")} className="text-white/50 hover:text-white text-sm mb-6 inline-block">← Back to Trips</button>

      <div className="card mb-8">
        <h1 className="text-2xl font-bold text-primary-400">{trip.title}</h1>
        <p className="text-white/50 mt-1">{trip.destination}</p>
        <div className="flex flex-wrap gap-6 mt-4 text-sm text-white/40">
          <span>{new Date(trip.startDate).toLocaleDateString()} → {new Date(trip.endDate).toLocaleDateString()}</span>
          <span>Budget: ₹{trip.totalBudget?.toLocaleString()}</span>
          <span>Spent: ₹{totalSpent.toLocaleString()}</span>
        </div>
        <div className="mt-4 w-full bg-white/10 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${budgetPercent > 90 ? "bg-red-500" : budgetPercent > 60 ? "bg-amber-500" : "bg-emerald-500"}`}
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
        <p className="text-xs text-white/30 mt-1">{budgetPercent.toFixed(0)}% of budget used</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Activities</h2>
            <button onClick={() => setShowActivityForm(!showActivityForm)} className="btn-primary text-xs">
              {showActivityForm ? "Cancel" : "+ Add"}
            </button>
          </div>

          {showActivityForm && (
            <form onSubmit={handleAddActivity} className="card mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="day" type="number" placeholder="Day" value={activityForm.day} onChange={(e) => setActivityForm({ ...activityForm, day: e.target.value })} className="input-field" required />
                <input name="time" type="time" value={activityForm.time} onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })} className="input-field" required />
              </div>
              <input name="title" placeholder="Activity title" value={activityForm.title} onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })} className="input-field" required />
              <input name="location" placeholder="Location" value={activityForm.location} onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })} className="input-field" required />
              <select name="category" value={activityForm.category} onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })} className="input-field">
                {["sightseeing", "food", "transport", "hotel", "adventure", "shopping", "other"].map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
              <textarea name="notes" placeholder="Notes (optional)" value={activityForm.notes} onChange={(e) => setActivityForm({ ...activityForm, notes: e.target.value })} className="input-field" rows={2} />
              <button type="submit" className="btn-primary w-full text-sm">Add Activity</button>
            </form>
          )}

          {activities.length === 0 ? (
            <p className="text-white/40 text-sm">No activities yet.</p>
          ) : (
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a._id} className="card py-4 flex items-start justify-between">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-white/40 text-xs">Day {a.day} • {a.time} • {a.location}</p>
                    <span className="inline-block mt-1 text-xs bg-primary-600/20 text-primary-300 px-2 py-0.5 rounded">{a.category}</span>
                    {a.notes && <p className="text-white/30 text-xs mt-1">{a.notes}</p>}
                  </div>
                  <button onClick={() => handleDeleteActivity(a._id)} className="text-red-400 hover:text-red-300 p-1">
                    <HiOutlineTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="btn-primary text-xs">
              {showExpenseForm ? "Cancel" : "+ Add"}
            </button>
          </div>

          {showExpenseForm && (
            <form onSubmit={handleAddExpense} className="card mb-4 space-y-3">
              <input name="title" placeholder="Expense title" value={expenseForm.title} onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })} className="input-field" required />
              <div className="grid grid-cols-2 gap-3">
                <input name="amount" type="number" placeholder="Amount (₹)" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} className="input-field" required />
                <input name="date" type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} className="input-field" required />
              </div>
              <select name="category" value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} className="input-field">
                {["food", "transport", "hotel", "shopping", "tickets", "other"].map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
              <button type="submit" className="btn-primary w-full text-sm">Add Expense</button>
            </form>
          )}

          {expenses.length === 0 ? (
            <p className="text-white/40 text-sm">No expenses yet.</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((e) => (
                <div key={e._id} className="card py-4 flex items-start justify-between">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-white/40 text-xs">{new Date(e.date).toLocaleDateString()} • ₹{e.amount.toLocaleString()}</p>
                    <span className="inline-block mt-1 text-xs bg-amber-600/20 text-amber-300 px-2 py-0.5 rounded">{e.category}</span>
                  </div>
                  <button onClick={() => handleDeleteExpense(e._id)} className="text-red-400 hover:text-red-300 p-1">
                    <HiOutlineTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
