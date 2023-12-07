const Project = require("../model/projSchema");

require("../db/conn");

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({}).sort({ _id: -1 });
    res.status(200).json({ data: allProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleProject = async (req, res) => {
  let project_id = req.params.id;
  try {
    const singleProject = await Project.findOne({ _id: project_id });
    if (!singleProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ data: singleProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProject = async (req, res) => {
  let project_id = req.params.id;
  const {
    project_name,
    email,
    description,
    supply,
    twitter,
    discord,
    website,
    opensea,
    photo,
  } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      { _id: project_id },
      {
        project_name,
        email,
        description,
        supply,
        twitter,
        discord,
        website,
        opensea,
        photo,
      },
      { new: true } // To get the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(201).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProject = async (req, res) => {
  let project_id = req.params.id;
  try {
    const deletedProject = await Project.findByIdAndRemove({ _id: project_id });

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProjects,
  getSingleProject,

  updateProject,
  deleteProject,
};
