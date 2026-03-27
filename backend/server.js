const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
const goalRoutes = require("./routes/goalRoutes");
app.use("/api/goals", goalRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});