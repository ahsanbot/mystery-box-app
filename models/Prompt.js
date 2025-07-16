const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  category: String,
  status: {
    type: String,
    enum: ["Open", "Done"],
    default: "Open",
  },
  notes: String,
});

module.exports = mongoose.model("Prompt", promptSchema);
