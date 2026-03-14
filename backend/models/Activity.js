const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip ID is required"],
    },
    day: {
      type: Number,
      required: [true, "Day number is required"],
      min: [1, "Day must be at least 1"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [150, "Location cannot exceed 150 characters"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["sightseeing", "food", "transport", "hotel", "adventure", "shopping", "other"],
        message: "Category must be sightseeing, food, transport, hotel, adventure, shopping, or other",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
