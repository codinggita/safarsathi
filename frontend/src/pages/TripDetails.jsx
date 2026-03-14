import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripById } from "../redux/tripSlice";
import { fetchActivities, createActivity, deleteActivity } from "../redux/activitySlice";
import { fetchExpenses, createExpense, deleteExpense } from "../redux/expenseSlice";
import { toast } from "react-toastify";
import ActivityCard from "../components/ActivityCard";
import ExpenseTable from "../components/ExpenseTable";
import BudgetChart from "../components/BudgetChart";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrip: trip, loading: tripLoading } = useSelector((state) => state.trips);
  const { activities } = useSelector((state) => state.activities);
  const { expenses, totalSpent } = useSelector((state) => state.expenses);

  const [showActForm, setShowActForm] = useState(false);
  const [actForm, setActForm] = useState({ day: "", title: "", location: "", time: "", notes: "", category: "sightseeing" });

  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ title: "", amount: "", category: "food", date: "" });

  useEffect(() => {
    dispatch(fetchTripById(id));
    dispatch(fetchActivities(id));
    dispatch(fetchExpenses(id));
  }, [dispatch, id]);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createActivity({ ...actForm, tripId: id })).unwrap();
      toast.success("Activity added");
      setActForm({ day: "", title: "", location: "", time: "", notes: "", category: "sightseeing" });
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

  if (tripLoading || !trip) {
    return <p className="text-center text-gray-500 dark:text-white/50 py-20">Loading trip...</p>;
  }

  const start = new Date(trip.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const end = new Date(trip.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => navigate("/trips")} className="text-gray-500 dark:text-white/50 hover:text-primary-600 dark:hover:text-white text-sm mb-6 inline-block transition">
        ← Back to Trips
      </button>

      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">{trip.title}</h1>
            <p className="text-gray-500 dark:text-white/50 mt-1">{trip.destination}</p>
            <p className="text-sm text-gray-400 dark:text-white/30 mt-2">{start} → {end}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400 dark:text-white/40 uppercase tracking-wider">Share Link</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/trip/public/${trip._id}`);
                toast.success("Link copied!");
              }}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-1"
            >
              Copy Public Link
            </button>
          </div>
        </div>
      </div>

      <BudgetChart totalBudget={trip.totalBudget || 0} totalSpent={totalSpent} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Activities ({activities.length})</h2>
            <button onClick={() => setShowActForm(!showActForm)} className="btn-primary text-xs py-1.5">
              {showActForm ? "Cancel" : "+ Add"}
            </button>
          </div>

          {showActForm && (
            <form onSubmit={handleAddActivity} className="card mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Day</label>
                  <input type="number" min="1" placeholder="1" value={actForm.day} onChange={(e) => setActForm({ ...actForm, day: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="label">Time</label>
                  <input type="time" value={actForm.time} onChange={(e) => setActForm({ ...actForm, time: e.target.value })} className="input-field" required />
                </div>
              </div>
              <div>
                <label className="label">Title</label>
                <input placeholder="Activity title" value={actForm.title} onChange={(e) => setActForm({ ...actForm, title: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="label">Location</label>
                <input placeholder="Location" value={actForm.location} onChange={(e) => setActForm({ ...actForm, location: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="label">Category</label>
                <select value={actForm.category} onChange={(e) => setActForm({ ...actForm, category: e.target.value })} className="input-field">
                  {["sightseeing", "food", "transport", "hotel", "adventure", "shopping", "other"].map((c) => (
                    <option key={c} value={c} className="bg-white dark:bg-card-dark">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Notes (optional)</label>
                <textarea placeholder="Notes" value={actForm.notes} onChange={(e) => setActForm({ ...actForm, notes: e.target.value })} className="input-field" rows={2} />
              </div>
              <button type="submit" className="btn-primary w-full text-sm">Add Activity</button>
            </form>
          )}

          {activities.length === 0 ? (
            <p className="text-gray-400 dark:text-white/40 text-sm text-center py-8">No activities yet. Start adding!</p>
          ) : (
            <div className="space-y-3">
              {activities.map((a) => <ActivityCard key={a._id} activity={a} onDelete={handleDeleteActivity} />)}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expenses ({expenses.length})</h2>
            <button onClick={() => setShowExpForm(!showExpForm)} className="btn-primary text-xs py-1.5">
              {showExpForm ? "Cancel" : "+ Add"}
            </button>
          </div>

          {showExpForm && (
            <form onSubmit={handleAddExpense} className="card mb-4 space-y-3">
              <div>
                <label className="label">Title</label>
                <input placeholder="Expense title" value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Amount (₹)</label>
                  <input type="number" min="0" placeholder="0" value={expForm.amount} onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input type="date" value={expForm.date} onChange={(e) => setExpForm({ ...expForm, date: e.target.value })} className="input-field" required />
                </div>
              </div>
              <div>
                <label className="label">Category</label>
                <select value={expForm.category} onChange={(e) => setExpForm({ ...expForm, category: e.target.value })} className="input-field">
                  {["food", "transport", "hotel", "shopping", "tickets", "other"].map((c) => (
                    <option key={c} value={c} className="bg-white dark:bg-card-dark">{c}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full text-sm">Add Expense</button>
            </form>
          )}

          <div className="card">
            <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
