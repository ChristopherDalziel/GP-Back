const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const users = require('../controllers/users');
const {checkToken} = require('../controllers/token_middleware')

router.get('/dashboard', checkToken, admin.dashboard);


module.exports = router;