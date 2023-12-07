const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "On Sale",
    },
  },
  { timestamps: true }
);
const Collection = mongoose.model("COLLECTION", collectionSchema);

module.exports = Collection;
