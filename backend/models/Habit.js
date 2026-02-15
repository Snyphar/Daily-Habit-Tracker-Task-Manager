const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: String,
  days: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Habit", habitSchema);
