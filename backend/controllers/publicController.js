const Trip = require("../models/Trip");
const Activity = require("../models/Activity");
const Expense = require("../models/Expense");

const getPublicTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    const activities = await Activity.find({ tripId: trip._id }).sort({ day: 1, time: 1 });
    const expenses = await Expense.find({ tripId: trip._id }).sort({ date: -1 });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        trip,
        activities,
        expenses,
        totalSpent,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPublicTrip };
