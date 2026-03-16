const Trip = require("../models/Trip");

const createTrip = async (req, res, next) => {
  try {
    const { title, destination, startDate, endDate, totalBudget } = req.body;

    if (!title || !destination || !startDate || !endDate || !totalBudget) {
      res.status(400);
      throw new Error("Please provide title, destination, startDate, endDate, and totalBudget");
    }

    if (new Date(endDate) < new Date(startDate)) {
      res.status(400);
      throw new Error("End date cannot be before start date");
    }

    const trip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      totalBudget,
      userId: req.user._id,
    });

    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    const {
      search = "",
      status = "",
      sort = "newest",
      page = 1,
      limit = 6,
    } = req.query;

    // --- Base filter: only current user's trips ---
    const query = { userId: req.user._id };

    // --- Search: case-insensitive regex on title OR destination ---
    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ title: regex }, { destination: regex }];
    }

    // --- Status filter based on dates ---
    const now = new Date();
    if (status === "upcoming") {
      query.startDate = { $gt: now };
    } else if (status === "ongoing") {
      query.startDate = { $lte: now };
      query.endDate = { $gte: now };
    } else if (status === "completed") {
      query.endDate = { $lt: now };
    }

    // --- Sort ---
    let sortOption = { createdAt: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "budget_high") sortOption = { totalBudget: -1 };
    if (sort === "budget_low") sortOption = { totalBudget: 1 };

    // --- Pagination ---
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 6));
    const skip = (pageNum - 1) * limitNum;

    const [trips, total] = await Promise.all([
      Trip.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Trip.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: trips.length,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: trips,
      totalTrips: total,
    });
  } catch (error) {
    next(error);
  }
};

const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to access this trip");
    }

    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this trip");
    }

    const { startDate, endDate } = req.body;
    const newStart = startDate ? new Date(startDate) : trip.startDate;
    const newEnd = endDate ? new Date(endDate) : trip.endDate;

    if (newEnd < newStart) {
      res.status(400);
      throw new Error("End date cannot be before start date");
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this trip");
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTrip, getTrips, getTripById, updateTrip, deleteTrip };
