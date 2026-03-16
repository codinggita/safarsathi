const Activity = require("../models/Activity");
const Trip = require("../models/Trip");

const createActivity = async (req, res, next) => {
  try {
    const { tripId, day, title, location, time, notes, category } = req.body;

    if (!tripId || !day || !title || !location || !time || !category) {
      res.status(400);
      throw new Error("Please provide tripId, day, title, location, time, and category");
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to add activities to this trip");
    }

    const activity = await Activity.create({
      tripId,
      day,
      title,
      location,
      time,
      notes: notes || "",
      category,
    });

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

const getActivitiesByTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to view activities for this trip");
    }

    const activities = await Activity.find({ tripId: req.params.tripId }).sort({ day: 1, time: 1 });
    res.status(200).json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    next(error);
  }
};

const updateActivity = async (req, res, next) => {
  try {
    let activity = await Activity.findById(req.params.id);
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }

    const trip = await Trip.findById(activity.tripId);
    if (!trip || trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this activity");
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }

    const trip = await Trip.findById(activity.tripId);
    if (!trip || trip.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this activity");
    }

    await Activity.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Activity deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createActivity, getActivitiesByTrip, updateActivity, deleteActivity };
