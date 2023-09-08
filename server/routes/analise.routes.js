const express = require("express");
const Analise = require("../models/analise");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");
router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;

      const list = await Analise.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибкаю Попробуйте позже" });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newAnalise = await Analise.create({
        ...req.body,
        userId: req.user._id,
      });

      res.status(201).send(newAnalise);
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибкаю Попробуйте позже" });
    }
  });

router.patch("/:analiseId", auth, async (req, res) => {
  try {
    const { analiseId } = req.params;
    console.log(chalk.blue(analiseId));
    const findan = await Analise.findById(analiseId);
    console.log(chalk.red(findan));
    const updatedAnalise = await Analise.findByIdAndUpdate(
      analiseId,
      req.body,
      {
        new: true,
      }
    );
    console.log(chalk.green(updatedAnalise));
    res.send(updatedAnalise);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позжеsdsds" });
  }
});

router.delete("/:analiseId", auth, async (req, res) => {
  try {
    const { analiseId } = req.params;

    const removedAnalise = await Analise.findById(analiseId);

    if (removedAnalise.userId.toString() === req.user._id) {
      Analise.collection.deleteOne({
        projectName: removedAnalise.projectName,
      });
      return res.send(null);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {}
});

module.exports = router;
