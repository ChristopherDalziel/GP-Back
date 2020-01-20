const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin-routes'));
// router.use('/services', require('./services-routes'));
// router.use('/staff', require('./staff-routes'));
router.use('/users', require('./users'));
// router.use('/vaccines', require('./vaccine-routes'));

router.get("/", require('../controllers/index'));

module.exports = router;