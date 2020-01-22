const express = require("express");
const router = express.Router();
const { vaccine } = require("../controllers/vaccines");

// here we're going to create routes
router.get("/vaccine", vaccine);
