const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const users = require('../controllers/users');
const staff = require('../controllers/staff');
const {checkToken} = require('../controllers/token_middleware');
const {checkAdmin} = require('../controllers/users_middleware');

router.get('/dashboard', checkToken, checkAdmin, admin.dashboard,);


module.exports = router;