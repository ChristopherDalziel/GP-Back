const express = require("express");
const router = express.Router();
const { checkToken } = require("../controllers/token_middleware");
const { checkAdmin } = require("../controllers/users_middleware");

// const { addStaff, staffs } = require("../controllers/staff");
const {
  add_staff,
  update_staff,
  delete_staff
} = require("../controllers/staff");
router.post("/add_staff", checkToken, checkAdmin,add_staff);
router.put("/update_staff/:id", checkToken, checkAdmin,update_staff);
router.delete("/delete_staff/:id", checkToken, checkAdmin,delete_staff);

module.exports = router;
