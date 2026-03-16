import { HiOutlineTrash, HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";

const categoryColors = {
  sightseeing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  transport: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  hotel: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  adventure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const ActivityCard = ({ activity, onDelete }) => {
  return (
    <div className="card py-4 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded">
            Day {activity.day}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[activity.category] || categoryColors.other}`}>
            {activity.category}
          </span>
        </div>
        <p className="font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
        <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500 dark:text-white/40">
          <span className="flex items-center gap-1"><HiOutlineClock /> {activity.time}</span>
          <span className="flex items-center gap-1"><HiOutlineLocationMarker /> {activity.location}</span>
        </div>
        {activity.notes && (
          <p className="text-xs text-gray-400 dark:text-white/30 mt-1 line-clamp-2">{activity.notes}</p>
        )}
      </div>
      {onDelete && (
        <button onClick={() => onDelete(activity._id)} className="text-gray-400 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400 p-1 shrink-0 transition">
          <HiOutlineTrash />
        </button>
      )}
    </div>
  );
};

export default ActivityCard;
