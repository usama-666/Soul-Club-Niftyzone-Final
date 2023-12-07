const mongoose = require("mongoose");
const projSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    supply: {
      type: Number,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    discord: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    opensea: {
      type: String,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Project = mongoose.model("PROJECT", projSchema);

module.exports = Project;
