const Feedback = require("../model/feedbackSchema");

const addFeedback = async (req, res) => {
  const { username, comment, rating } = req.body;

  console.log(req.body);
  console.log(username, comment, rating);
  if (!username || !comment || !rating) {
    return res.status(422).json({ message: "fields required" });
  }
  try {
    const newFeedback = new Feedback({ username, comment, rating });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ _id: -1 });
    res.json(feedbackList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addFeedback, getFeedback };
