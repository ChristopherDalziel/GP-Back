const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin-routes"));
// router.use('/admin/add_staff', require('./staff-routes'));
// router.use('/services', require('./services-routes'));

router.use("/users", require("./users"));

router.use("/mail", require("./mail"));

router.use("/vaccine", require("./vaccines"));

router.get("/", require("../controllers/index"));

module.exports = router;
