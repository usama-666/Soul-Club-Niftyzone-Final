const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { getAllUser, deleteUser } = require("../controllers/users");

require("../db/conn");

router.get("/users", getAllUser);
router.delete("/users/:id", deleteUser);
module.exports = router;

// router.get("/user", authenticate, (req, res) => {
//   console.log(`hello this is influencer page`);
//   res.send(req.rootUser);
// });

// router.put("/users/:id", async (req, res) => {
//   const { name, email, phone, password, cpassword } = req.body;
//   const user_id = req.params.id;

//   console.log(req.body);

//   if (!name || !email || !phone || !password || !cpassword) {
//     console.log("enter all fileds");
//     return res.status(422).json({ error: "fill all fields" });
//   }
//   try {
//     const updatedUser = await Users.findByIdAndUpdate(
//       { _id: user_id },
//       {
//         name,
//         email,
//         phone,
//         password,
//         cpassword,
//       },
//       { new: true } // To get the updated document
//     );

//     //here in between hashing is performed inside schemajs
//     const updated = await updatedUser.save();

//     if (!updated) {
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       res.status(201).json({ message: "User updated successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.delete("/users/:id", async (req, res) => {
//   let user_id = req.params.id;
//   try {
//     const userDeleted = await Users.findByIdAndRemove({ _id: user_id });
//     if (!userDeleted) {
//       return res.status(404).json({ message: "user not found" });
//     } else {
//       res.status(201).json({ message: "User deleted successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
