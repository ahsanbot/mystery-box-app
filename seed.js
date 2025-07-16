const mongoose = require("mongoose");
const Prompt = require("./models/Prompt");

mongoose.connect("mongodb://127.0.0.1:27017/mystery-box", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const samplePrompts = [
  {
    prompt: "Take a photo of something blue",
    category: "Creative",
    status: "Open",
  },
  { prompt: "Stretch for 3 minutes", category: "Health", status: "Open" },
  {
    prompt: "Write a compliment to yourself",
    category: "Wellness",
    status: "Open",
  },
  {
    prompt: "Organize one folder on your desktop",
    category: "Productivity",
    status: "Open",
  },
  {
    prompt: "Talk to someone you haven't in a while",
    category: "Social",
    status: "Open",
  },
];

async function seedDB() {
  await Prompt.deleteMany({});
  await Prompt.insertMany(samplePrompts);
  console.log("✅ Seeded MongoDB with sample prompts!");
  mongoose.connection.close();
}

seedDB();
