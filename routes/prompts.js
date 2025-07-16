const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");

// Redirect root to /prompts
router.get("/", (req, res) => {
  res.redirect("/prompts");
});

// Main /prompts route
router.get("/prompts", async (req, res) => {
  const { search = "", status = "", category = "", success = "" } = req.query;

  let query = {};
  if (search) query.prompt = { $regex: search, $options: "i" };
  if (status) query.status = status;
  if (category) query.category = { $regex: category, $options: "i" };

  const prompts = await Prompt.find(query);
  const total = await Prompt.countDocuments();
  const done = await Prompt.countDocuments({ status: "Done" });
  const open = await Prompt.countDocuments({ status: "Open" });

  res.render("index", {
    prompts,
    search,
    status,
    category,
    total,
    done,
    open,
    success,
  });
});

// New prompt form
router.get("/prompts/new", (req, res) => {
  res.render("new");
});

// Create new prompt
router.post("/prompts", async (req, res) => {
  await Prompt.create(req.body);
  res.redirect("/prompts?success=Prompt added successfully!");
});

// Edit prompt form
router.get("/prompts/:id/edit", async (req, res) => {
  const prompt = await Prompt.findById(req.params.id);
  res.render("edit", { prompt });
});

// Update prompt
router.put("/prompts/:id", async (req, res) => {
  await Prompt.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/prompts?success=Prompt updated!");
});

// Delete prompt
router.delete("/prompts/:id", async (req, res) => {
  await Prompt.findByIdAndDelete(req.params.id);
  res.redirect("/prompts?success=Prompt deleted.");
});

// Random mystery box reveal
router.get("/random", async (req, res) => {
  const openPrompts = await Prompt.find({ status: "Open" });
  const random =
    openPrompts.length > 0
      ? openPrompts[Math.floor(Math.random() * openPrompts.length)]
      : null;

  // 👇 Respond with JSON if it's a fetch request
  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    console.log("🎲 Sending JSON response:", random); // debug log
    return res.json({ random });
  }

  // 👇 Otherwise render the page normally
  res.render("random", { random });
});

module.exports = router;
