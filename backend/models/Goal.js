const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Goal text is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Strength", "Cardio", "Flexibility", "Nutrition", "Other"],
      default: "Other",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    targetDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);