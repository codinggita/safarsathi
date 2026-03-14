import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTrip } from "../redux/tripSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";

const CreateTrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors below");
      return;
    }
    setErrors({});
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

  const inputBase =
    "w-full bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-[#374151] text-gray-900 dark:text-white rounded-xl px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200";

  const borderError = "border-red-500 dark:border-red-500";
  const borderValid = "border-emerald-500 dark:border-emerald-500";

  const getInputBorder = (name) => {
    if (errors[name]) return borderError;
    if (formData[name]) return borderValid;
    return "";
  };

  const durationDays =
    formData.startDate && formData.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(formData.endDate) - new Date(formData.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : null;

  const budgetPresets = [5000, 10000, 25000, 50000];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[560px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-8 shadow-sm">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-sm font-medium mb-6 transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Plan New Trip
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Fill in the details to start your adventure
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Trip Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${inputBase} ${getInputBorder("title")}`}
              placeholder="e.g. Goa Beach Trip"
              required
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className={`${inputBase} pl-10 ${getInputBorder("destination")}`}
                placeholder="e.g. Goa, India"
                required
              />
            </div>
            {errors.destination && (
              <p className="text-xs text-red-500 mt-1">{errors.destination}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`${inputBase} ${getInputBorder("startDate")}`}
                required
              />
              {errors.startDate && (
                <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`${inputBase} ${getInputBorder("endDate")}`}
                required
              />
              {errors.endDate && (
                <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>
              )}
            </div>
            {durationDays !== null && durationDays > 0 && (
              <p className="col-span-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {durationDays} Day{durationDays !== 1 ? "s" : ""} Trip
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Total Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                Rs
              </span>
              <input
                type="number"
                name="totalBudget"
                value={formData.totalBudget}
                onChange={handleChange}
                className={`${inputBase} pl-8 ${getInputBorder("totalBudget")}`}
                placeholder="e.g. 25000"
                min="0"
                required
              />
            </div>
            {errors.totalBudget && (
              <p className="text-xs text-red-500 mt-1">{errors.totalBudget}</p>
            )}
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {budgetPresets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      totalBudget: String(amount),
                    }));
                    if (errors.totalBudget) {
                      setErrors((prev) => ({ ...prev, totalBudget: "" }));
                    }
                  }}
                  className="border border-gray-300 dark:border-[#374151] text-gray-600 dark:text-gray-400 rounded-lg px-3 py-1 text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer"
                >
                  Rs {amount.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Trip"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-100 dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-[#374151] text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
