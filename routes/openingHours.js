const express = require("express");
const router = express.Router();
const { index, show, update } = require("../controllers/openingHours");

router.use(express.json());

router.get("/", index);

router.post("/show", show);

router.put("/update", update);

module.exports = router;
