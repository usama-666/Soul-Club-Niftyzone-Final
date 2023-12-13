const JWT = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../helper/authHelper");
const User = require("../model/userSchema");

const registerController = async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  console.log(req.body);

  try {
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!cpassword) {
      return res.send({ message: "Confrim Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }

    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      phone,
      password: hashedPassword,
      cpassword: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const signinController = async (req, res) => {
  try {
    // let token;
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Logined successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
  // const userlogin = await User.findOne({ email: email });

  // if (userlogin) {
  //   const isMatch = await bcrypt.compare(password, userlogin.password);

  //   token = await userlogin.generateAuthToken();
  //   console.log("helllo token generated here when user login");
  //   console.log(token);
  //   res.cookie("jwtoken", token, {
  //     expires: new Date(Date.now() + 25892000000),
  //     httpOnly: true,
  //     //  sameSite: "None", // Set SameSite attribute
  //     //secure: true, // Set Secure attribute if using HTTPS
  //   });

  // console.log(token);
  //       if (!isMatch) {
  //         res.status(400).json({ message: "invalid credentials pss" });
  //       } else {
  //         res.json({ message: "user logined succesffulyy" });
  //       }
  //     } else {
  //       return res.status(400).json({ error: "invalid credentials email" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
};

// const forgotPasswordController = async (req, res) => {
//   const { email, newPassword, answer } = req.body;

//   if (!email) {
//     res.status(400).send({ message: " Email is required" });
//   }

//   if (!newPassword) {
//     res.status(400).send({ message: " Password is required" });
//   }

//   if (!answer) {
//     res.status(400).send({ message: " Answer is required" });
//   }
//   try {
//     const user = await User.findOne({
//       email,
//       answer,
//     });
//     //validation
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Wrong Email and Answer",
//       });
//     }
//     const hashed = await hashPassword(newPassword);
//     await User.findByIdAndUpdate(user._id, { password: hashed });
//     res.status(200).send({
//       success: true,
//       message: "Password Updated Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ success: false, message: "Something went Wrong", error });
//   }
// };

///Test Controller

const testController = (req, res) => {
  try {
    res.send({
      success: true,
      message: "protected route",
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
module.exports = {
  registerController,
  signinController,
  // forgotPasswordController,
  testController,
};
