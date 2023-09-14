const express = require("express");
const Users = require("../models/user");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const list = await Users.find();

    res.send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка Попробуйте позже" });
  }
});

module.exports = router;
