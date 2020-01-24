const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin-routes"));

router.use("/users", require("./users"));

router.use("/appointments", require("./appointments"))

router.use("/mail", require("./mail"));

router.use("/vaccines", require("./vaccines"));

router.use("/services", require("./services"));

router.get("/", require("../controllers/index"));

module.exports = router;
