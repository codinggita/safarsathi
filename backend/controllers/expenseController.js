const Expense = require("../models/Expense");
const Trip = require("../models/Trip");

const createExpense = async (req, res, next) => {
  try {
    const { tripId, title, amount, category, date } = req.body;

    if (!tripId || !title || !amount || !category || !date) {
      res.status(400);
      throw new Error("Please provide tripId, title, amount, category, and date");
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to add expenses to this trip");
    }

    const expense = await Expense.create({ tripId, title, amount, category, date });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

const getExpensesByTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to view expenses for this trip");
    }

    const expenses = await Expense.find({ tripId: req.params.tripId }).sort({ date: -1 });
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      totalSpent,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    const trip = await Trip.findById(expense.tripId);
    if (!trip || trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this expense");
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    const trip = await Trip.findById(expense.tripId);
    if (!trip || trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this expense");
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getExpensesByTrip, updateExpense, deleteExpense };
