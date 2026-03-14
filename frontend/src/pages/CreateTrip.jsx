import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTrip } from "../redux/tripSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(createTrip(formData)).unwrap();
      toast.success("Trip created!");
      navigate(`/trips/${result._id}`);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Trip</h1>
      <p className="text-gray-500 dark:text-white/50 text-sm mb-8">Fill in the details to start planning your adventure.</p>

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="label">Trip Title</label>
          <input name="title" value={formData.title} onChange={handleChange} className="input-field" placeholder="e.g. Goa Beach Trip" required />
        </div>
        <div>
          <label className="label">Destination</label>
          <input name="destination" value={formData.destination} onChange={handleChange} className="input-field" placeholder="e.g. Goa, India" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="label">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" required />
          </div>
        </div>
        <div>
          <label className="label">Total Budget (₹)</label>
          <input type="number" name="totalBudget" value={formData.totalBudget} onChange={handleChange} className="input-field" placeholder="e.g. 25000" min="0" required />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? "Creating..." : "Create Trip"}
          </button>
          <button type="button" onClick={() => navigate("/trips")} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
