const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const users = require("../controllers/users");

const { checkToken } = require("../controllers/token_middleware");
const { checkAdmin } = require("../controllers/users_middleware");

//Dashboard
router.get("/admin_dashboard", checkToken, checkAdmin, admin.dashboard);

//Staff
router.get("/staffs", checkToken, checkAdmin, admin.staffs);
router.post("/add_staff", checkToken, checkAdmin, admin.addStaff);
router.put("/edit_staff/:id", checkToken, checkAdmin, admin.editStaff);
router.put("/update_staff/:id", checkToken, checkAdmin, admin.updateStaff);
router.delete("/delete_staff/:id", checkToken, checkAdmin, admin.deleteStaff);
router.post("/upload_image", checkToken, checkAdmin, admin.upload_image);

module.exports = router;
