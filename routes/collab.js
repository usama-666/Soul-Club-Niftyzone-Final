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
