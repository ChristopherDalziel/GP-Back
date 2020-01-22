const express = require("express");
const router = express.Router();
const { VaccineList } = require("../controllers/vaccine");

// here we're going to create routes
router.get("/", VaccineList);

module.exports = router;
