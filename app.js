const engine = require("ejs-mate");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mystery-box");

// View Engine
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const promptRoutes = require("./routes/prompts");
app.use("/", promptRoutes);

// Server
app.listen(3000, () => {
  console.log("🚀 App running at http://localhost:3000");
});
