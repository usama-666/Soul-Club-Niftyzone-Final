const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
require("../db/conn");
const {
  getCollab,
  updateCollabStatus,
  getAcceptedCollab,
  deleteCollab,
} = require("../controllers/collab");
const Collab = require("../model/collabSchema");

// where we want to upload images with their name

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, path.join(__dirname, "../uploads/collab_images"));
//     // return cb(null, "../public/images");
//   },
//   filename: function (req, file, cb) {
//     // console.log(file);
//     return cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

router.post("/collab", async (req, res) => {
  console.log(req.body);

  const {
    project_name,
    email,
    phone,
    description,
    supply,
    file,
    twitter,
    discord,
    website,
    opensea,
  } = req.body;

  // if (
  //   !project_name ||
  //   !email ||
  //   !description ||
  //   !twitter ||
  //   !discord ||
  //   !phone ||
  //   !supply ||
  //   !image_url
  // )
  //   return res.status(422).json({ error: "fill Above fields" });

  try {
    const usercollabExist = await Collab.findOne({
      email: email,
      project_name: project_name,
    });
    if (usercollabExist) {
      return res.status(422).json({ error: "Email Already exists" });
    } else {
      const collab = new Collab({
        project_name,
        email,
        phone,
        description,
        supply,
        file,
        twitter,
        discord,
        website,
        opensea,
        status: "pending",
      });

      const CollabSave = await collab.save();

      if (CollabSave) {
        return res.status(201).json({ message: " Collaboration done" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/collab", getCollab);
router.get("/accepted-collab", getAcceptedCollab);

router.put("/collab/:id", updateCollabStatus);
router.delete("/collab/:id", deleteCollab);
module.exports = router;
