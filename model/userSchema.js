const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   console.log("hi i am insie hash");
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

//generating jwt tokens
userSchema.methods.generateAuthToken = async function () {
  try {
    token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = await this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

//creating collection on databsae
const User = mongoose.model("USER", userSchema);

module.exports = User;
