const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
      maxlength: [100, "Destination cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    totalBudget: {
      type: Number,
      required: [true, "Total budget is required"],
      min: [0, "Budget cannot be negative"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
