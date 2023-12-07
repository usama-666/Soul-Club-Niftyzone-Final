const Users = require("../model/userSchema");

require("../db/conn");

const getAllUser = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    // res.send(allUsers);
    res.status(200).json({ data: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const userDeleted = await Users.findByIdAndRemove(user_id); // Remove curly braces around _id
    if (!userDeleted) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" }); // Changed status code to 200
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllUser, deleteUser };
