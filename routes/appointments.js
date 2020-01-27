const express = require('express');
const router = express.Router();
const {checkToken} = require("../controllers/token_middleware");
const {newAppointment, getAppointmentsByUser, deleteAppointment} = require('../controllers/appointment');


router.post('/new', newAppointment);
router.delete('/:id', deleteAppointment);
router.get('/list', );
router.get('/user_appointments', checkToken, getAppointmentsByUser)

module.exports = router;