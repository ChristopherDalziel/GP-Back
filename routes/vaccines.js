const express = require("express");
const router = express.Router();
const { VaccineList, create } = require("../controllers/vaccine");

// here we're going to create routes
router.get("/", VaccineList);

router.post("/create", express.json(), create);

module.exports = router;
