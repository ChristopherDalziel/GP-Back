const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const users = require("../controllers/users");

const { checkToken } = require("../controllers/token_middleware");
const { checkAdmin } = require("../controllers/users_middleware");

//Dashboard
// router.get("/admin_dashboard", checkToken, checkAdmin, admin.dashboard);

//staff
router.get('/staff',  checkToken, checkAdmin, admin.staffs);
router.get('/users', checkToken, checkAdmin, admin.allUsers);
router.get('/user/:id', checkToken, checkAdmin, admin.getUserInfo);
router.get('/appointments', checkToken, checkAdmin, admin.allAppointments);

router.post('/add_staff', checkToken, checkAdmin, admin.addStaff);
router.put('/edit_staff/:id', checkToken, checkAdmin, admin.editStaff);
router.put('/update_staff/:id', checkToken, checkAdmin, admin.updateStaff);

router.delete('/delete_staff/:id', checkToken, checkAdmin, admin.deleteStaff);



module.exports = router;
