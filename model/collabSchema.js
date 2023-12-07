const mongoose = require("mongoose");
const collabSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
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
    file: {
      type: String,
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
    status: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);
const Collab = mongoose.model("COLLAB", collabSchema);

module.exports = Collab;
