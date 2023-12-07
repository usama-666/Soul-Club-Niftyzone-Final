const express = require("express");
const { isUser } = require("../middleware/authenticate");
const { addFeedback, getFeedback } = require("../controllers/feedback");

const router = express.Router();

router.post("/feedback", addFeedback);

// GET endpoint to retrieve all feedback
router.get("/feedback", getFeedback);
module.exports = router;
