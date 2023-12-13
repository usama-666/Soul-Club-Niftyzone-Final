const express = require("express");
const path = require("path");
const router = express.Router();
const {
  getAllProjects,
  getSingleProject,

  updateProject,
  deleteProject,
} = require("../controllers/project");
const Project = require("../model/projSchema");

require("../db/conn");

router.post("/projects", async (req, res) => {
  // console.log(req.file);

  console.log(req.body);
  // const image_url = req.file.filename;
  // console.log(image_url);

  const {
    project_name,
    email,
    description,
    supply,
    twitter,
    discord,
    website,
    opensea,
    file,
  } = req.body;

  // if (
  //   !project_name ||
  //   !email ||
  //   !description ||
  //   !twitter ||
  //   !discord ||
  //   !supply ||
  //   !file
  // ) {
  //   console.log(req.body);
  //   return res
  //     .status(422)
  //     .json({ error: "Fill in all required fields including file" });
  // }

  try {
    const projectExist = await Project.findOne({
      email: email,
    });
    if (projectExist) {
      return res.status(422).json({ error: "Project already exists" });
    }

    const project = new Project({
      project_name,
      email,
      description,
      supply,
      twitter,
      discord,
      website,
      opensea,
      file,
    });

    const projectSave = await project.save();
    if (projectSave) {
      res.status(201).json({ message: "Project uploaded successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/projects", getAllProjects);
router.get("/projects/:id", getSingleProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

module.exports = router;
