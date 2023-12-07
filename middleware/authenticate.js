const JWT = require("jsonwebtoken");
const User = require("../model/userSchema");

//token base authentication& to protect route
const isSignin = async (req, res, next) => {
  try {
    // const token = req.cookies.jwtoken;
    const verifyToken = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = verifyToken;
    console.log(verifyToken);
    // const rootUser = await User.findOne({
    //   _id: verifyToken._id,
    //   "tokens.token": token,
    // });
    // if (!rootUser) {
    //   throw new Error("User not Found");
    // }
    // req.token = token;
    // req.rootUser = rootUser;
    // req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).json({ message: "unauthorize:No token provided" });
    console.log(err);
  }
};

//user access

const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in User middelware",
    });
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
module.exports = { isSignin, isUser, isAdmin };
