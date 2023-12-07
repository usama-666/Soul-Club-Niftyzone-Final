const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      // default: "kiwvion21",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Feedback = mongoose.model("FEEDBACK", feedbackSchema);

module.exports = Feedback;
