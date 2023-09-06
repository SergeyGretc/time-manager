const express = require("express");
const router = express.Router({ mergeParams: true });
router.use("/auth", require("./auth.routes"));
router.use("/projects", require("./projects.routes"));
router.use("/users", require("./user.routes"));
router.use("/analise", require("./analise.routes"));
module.exports = router;
