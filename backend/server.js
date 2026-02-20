require("dotenv").config(); // 👈 MUST be at top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Habit = require("./models/Habit");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Contect-Type", "Authorization"],
//     credentials: true,
//   }),
// );
app.use(express.json());

// ✅ Connect MongoDB
console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* =========================
        AUTH ROUTES
========================= */

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: token, userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
        HABIT ROUTES
========================= */

// Get user habits
app.get("/api/habits", authMiddleware, async (req, res) => {
  const habits = await Habit.find({ user: req.userId });
  res.json(habits);
});

// Add habit
app.post("/api/habits", authMiddleware, async (req, res) => {
  const { name, startDate } = req.body;
  console.log("Adding habit:", name, "for user:", req.userId);

  const newHabit = new Habit({
    name,
    startDate: startDate || new Date().toISOString().split("T")[0],
    days: [],
    user: req.userId,
  });

  await newHabit.save();

  res.status(201).json(newHabit);
});

// Toggle habit day
app.put("/api/habits/:id", authMiddleware, async (req, res) => {
  const { date } = req.body;

  const habit = await Habit.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!habit) return res.status(404).json({ message: "Habit not found" });

  if (habit.days.includes(date)) {
    habit.days = habit.days.filter((d) => d !== date);
  } else {
    habit.days.push(date);
  }

  await habit.save();

  res.json(habit);
});

// Delete habit
app.delete("/api/habits/:id", authMiddleware, async (req, res) => {
  await Habit.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  res.json({ message: "Habit deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
