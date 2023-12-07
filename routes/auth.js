const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { isSignin, isUser, isAdmin } = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
const {
  registerController,
  signinController,
  testController,
  forgotPasswordController,
} = require("../controllers/auth");

// router.get("/", (req, res) => {
//   res.send("hello from Home Page Server");
// });

//using Aysncronus programming

router.get("/register", async (req, res) => {
  try {
    const finduser = await User.find({});
    res.send(finduser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//routing
//REGISTER || METHOD POST

router.post("/register", registerController);

//SIGNIN || POST
router.post("/signin", signinController);

//Forgot-Password
router.post("/forgot-password", forgotPasswordController);

//testing route
router.get("/test", isSignin, isAdmin, testController);

//Protected User Route
router.get("/userauth", isSignin, isUser, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Admin Route
router.get("/adminauth", isSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/logout", (req, res) => {
  console.log("Hello my Logout Page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});
module.exports = router;
