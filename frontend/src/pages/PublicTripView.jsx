import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import ExpenseTable from "../components/ExpenseTable";
import BudgetChart from "../components/BudgetChart";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

const PublicTripView = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/trip/public/${id}`);
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
      <div className="flex justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="card text-center max-w-md">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Trip Unavailable</p>
          <p className="text-gray-500 dark:text-white/50 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const start = new Date(trip.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const end = new Date(trip.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wider font-semibold mb-2">SafarSathi Trip Plan</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{trip.title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-sm text-gray-500 dark:text-white/50">
          <span className="flex items-center gap-1"><HiOutlineLocationMarker className="text-primary-500" /> {trip.destination}</span>
          <span className="flex items-center gap-1"><HiOutlineCalendar className="text-emerald-500" /> {start} → {end}</span>
        </div>
      </div>

      <BudgetChart totalBudget={trip.totalBudget || 0} totalSpent={totalSpent} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activities ({activities.length})</h2>
        {activities.length === 0 ? (
          <p className="text-gray-400 dark:text-white/40 text-sm text-center py-6">No activities planned yet.</p>
        ) : (
          <div className="space-y-3">
            {activities.map((a) => <ActivityCard key={a._id} activity={a} />)}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Expenses ({expenses.length})</h2>
        <div className="card">
          <ExpenseTable expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default PublicTripView;
