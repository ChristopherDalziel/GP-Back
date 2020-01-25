const express = require('express');
const router = express.Router();
const {newAppointment} = require('../controllers/appointment');


router.post('/new', newAppointment);
router.delete('/:id', );
router.get('/list', );

module.exports = router;