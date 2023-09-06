const express = require("express");
const Projects = require("../models/projects");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");
const projects = require("../models/projects");
router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;

      const list = await Projects.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибкаю Попробуйте позже" });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newProject = await Projects.create({
        ...req.body,
        userId: req.user._id,
      });

      res.status(201).send(newProject);
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибкаю Попробуйте позже" });
    }
  });

router.patch("/:projectId", auth, async (req, res) => {
  try {
    const { projectId } = req.params;

    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
      }
    );
    // console.log(chalk.red(updatedProject));
    res.send(updatedProject);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позжеsdsds" });
  }
});

router.delete("/:projectId", auth, async (req, res) => {
  try {
    const { projectId } = req.params;

    const removedProject = await Projects.findById(projectId);

    if (removedProject.userId.toString() === req.user._id) {
      // await removedProject.removeAllListeners();
      // Projects.remove({ ...removedProject });
      Projects.collection.deleteOne({
        projectName: removedProject.projectName,
      });
      return res.send(null);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
