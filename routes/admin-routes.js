const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const users = require("../controllers/users");

const { checkToken } = require("../controllers/token_middleware");
const { checkAdmin } = require("../controllers/users_middleware");

//Dashboard
// router.get("/admin_dashboard", checkToken, checkAdmin, admin.dashboard);

//staff
router.get('/staff',  admin.staffs);
router.get('/users', checkToken, checkAdmin, admin.allUsers)
router.post('/add_staff', admin.addStaff);
router.put('/edit_staff/:id',  admin.editStaff);
router.put('/update_staff/:id',  admin.updateStaff);
router.delete('/delete_staff/:id',  admin.deleteStaff);
router.post('/upload_image', admin.upload_image);

module.exports = router;



