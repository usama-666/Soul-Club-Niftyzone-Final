const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { comparePassword, hashPassword } = require("../helper/authHelper");

const router = express.Router();
const { isSignin, isUser, isAdmin } = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
const {
  registerController,
  signinController,
  testController,
  // forgotPasswordController
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
function generateRandomToken() {
  const length = 10;
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
}

const emailConfig = {
  service: "gmail",
  auth: {
    user: "harisarshad140@gmail.com", // Your Gmail email address
    pass: "njadrimbfrmbojdh", // Your Gmail password or an App Password if you have 2-factor authentication enabled
  },
};

const transporter = nodemailer.createTransport(emailConfig);
router.post("/forgot-password", async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }

    const token = generateRandomToken();
    console.log(token);

    const hashedPassword = await hashPassword(token, 8);
    user.password = hashedPassword;
    await user.save(); // Make sure to use await here to save the user.

    const mailOptions = {
      from: "harisarshad140@gmail.com",
      to: userEmail,
      subject: "Password Reset",
      text: "Your password is: " + token,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(400).json({ message: "Email not sent" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Password reset email sent successfully" });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

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
