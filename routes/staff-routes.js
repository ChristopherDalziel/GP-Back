const express = require("express");
const router = express.Router();

// const { addStaff, staffs } = require("../controllers/staff");
const {
  add_staff,
  update_staff,
  delete_staff
} = require("../controllers/staff");
router.post("/add_staff", add_staff);
router.put("/update_staff/:id", update_staff);
router.delete("/delete_staff/:id", delete_staff);

module.exports = router;
