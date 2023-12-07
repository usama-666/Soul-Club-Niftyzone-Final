require("../db/conn");
const Collab = require("../model/collabSchema");

const getCollab = async (req, res) => {
  try {
    collabData = await Collab.find({ status: "pending" }).sort({ _id: -1 });
    res.send(collabData);
    // res.send({ data: collabData });
  } catch (err) {
    console.log("error" + err.message);
  }
};

const getAcceptedCollab = async (req, res) => {
  try {
    collabData = await Collab.find({ status: "accept" }).sort({ _id: -1 });
    res.send(collabData);
    // res.send({ data: collabData });
  } catch (err) {
    console.log("error" + err.message);
  }
};
const updateCollabStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedCollabRequest = await Collab.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    // res.json(updatedCollabRequest);
    res.status(201).send({ message: "Collab updated", updatedCollabRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteCollab = async (req, res) => {
  const collab_id = req.params.id;
  try {
    const collabDeleted = await Collab.findByIdAndRemove(collab_id); // Remove curly braces around _id
    if (!collabDeleted) {
      return res.status(404).json({ message: "Collab not found" });
    } else {
      res.status(200).json({ message: "Collab deleted successfully" }); // Changed status code to 200
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getCollab,
  updateCollabStatus,
  getAcceptedCollab,
  deleteCollab,
};
