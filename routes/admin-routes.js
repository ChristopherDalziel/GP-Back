const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const users = require('../controllers/users');

const {checkToken} = require('../controllers/token_middleware');
const {checkAdmin} = require('../controllers/users_middleware');

//dashboard
router.get('/dashboard', checkToken, checkAdmin, admin.dashboard);

//staff
router.post('/add_staff', checkToken, checkAdmin, admin.addStaff);
router.put('/update_staff/:id', checkToken, checkAdmin, admin.updateStaff);
router.delete('/delete_staff/:id', checkToken, checkAdmin, admin.delete_staff)
router.post('/upload_image', checkToken, checkAdmin, admin.upload_image)

module.exports = router;

