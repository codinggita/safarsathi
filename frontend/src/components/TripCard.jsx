import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTrip } from "../redux/tripSlice";
import { toast } from "react-toastify";
import { HiOutlineTrash, HiOutlineEye, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyRupee } from "react-icons/hi";

const TripCard = ({ trip }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!window.confirm("Delete this trip? This will also remove all activities and expenses.")) return;
    try {
      await dispatch(deleteTrip(trip._id)).unwrap();
      toast.success("Trip deleted");
    } catch (err) {
      toast.error(err);
    }
  };

  const start = new Date(trip.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const end = new Date(trip.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="card hover:border-primary-500/50 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition truncate pr-2">
          {trip.title}
        </h3>
        <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400 p-1 shrink-0 transition">
          <HiOutlineTrash />
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-500 dark:text-white/50 mb-4">
        <p className="flex items-center gap-2">
          <HiOutlineLocationMarker className="text-primary-500 shrink-0" />
          {trip.destination}
        </p>
        <p className="flex items-center gap-2">
          <HiOutlineCalendar className="text-emerald-500 shrink-0" />
          {start} → {end}
        </p>
        <p className="flex items-center gap-2">
          <HiOutlineCurrencyRupee className="text-amber-500 shrink-0" />
          ₹{trip.totalBudget?.toLocaleString("en-IN")}
        </p>
      </div>

      <Link to={`/trips/${trip._id}`} className="btn-primary text-sm py-2 px-4 w-full text-center flex items-center justify-center gap-2">
        <HiOutlineEye /> View Details
      </Link>
    </div>
  );
};

export default TripCard;
