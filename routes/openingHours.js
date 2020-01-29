const express = require("express");
const router = express.Router();
const { index, create } = require("../controllers/openingHours");

router.use(express.json());

router.get("/", index);

router.post("/create", create);

module.exports = router;
