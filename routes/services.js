const express = require("express");
const router = express.Router();
const {
  serviceList,
  create,
  deleteService
} = require("../controllers/service");

router.get("/", serviceList);

router.post("/create", express.json(), create);

router.delete("/delete/:id", express.json(), deleteService);

module.exports = router;
