const Goal = require("../models/Goal");

// GET all goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST create goal
const createGoal = async (req, res) => {
  const { text, category, priority, targetDate } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Goal text is required" });
  }
  try {
    const goal = await Goal.create({
      text: text.trim(),
      category: category || "Other",
      priority: priority || "Medium",
      targetDate: targetDate || null,
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT update goal (toggle complete or edit fields)
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };