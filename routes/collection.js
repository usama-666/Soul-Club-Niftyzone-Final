const express = require("express");
const Collection = require("../model/collectionSchema");
const router = express.Router();

router.get("/collection", async (req, res) => {
  try {
    const collection = await Collection.find({});
    if (collection) {
      res.status(200).json(collection);
    } else {
      res.status(401).send("failed to fetch Collection");
    }
  } catch (error) {
    console.log("Error while fetching collection", error);
    res.status(501).send({ success: false, message: "internal server failed" });
  }
});

router.put("/collection/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await Collection.findByIdAndUpdate(
      id,
      { $set: { status: "Sold" } },
      { new: true }
    );
    if (updatedStatus) {
      res.status(201).send({ message: "Status updated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
