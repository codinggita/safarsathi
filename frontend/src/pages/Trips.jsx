import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../redux/tripSlice";
import { Link } from "react-router-dom";
import TripCard from "../components/TripCard";
import { HiOutlinePlusCircle } from "react-icons/hi";

const Trips = () => {
  const dispatch = useDispatch();
  const { trips, loading } = useSelector((state) => state.trips);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Trips</h1>
        <Link to="/create-trip" className="btn-primary text-sm flex items-center gap-2">
          <HiOutlinePlusCircle /> New Trip
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 dark:text-white/40 text-lg mb-4">No trips yet. Start planning your first adventure!</p>
          <Link to="/create-trip" className="btn-primary">Create Your First Trip</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
        </div>
      )}
    </div>
  );
};

export default Trips;
