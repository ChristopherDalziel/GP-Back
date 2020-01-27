const express = require('express');
const router = express.Router();
const {checkToken} = require("../controllers/token_middleware");
const {newAppointment, getAppointmentsByUser} = require('../controllers/appointment');


router.post('/new', newAppointment);
router.delete('/:id', );
router.get('/list', );
router.get('/user_appointments', checkToken, getAppointmentsByUser)

module.exports = router;