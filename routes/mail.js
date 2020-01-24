const express = require("express");
const router = express.Router();
const { send, resetPassword, appointment } = require("../controllers/mail");
const {checkEmail} = require('../controllers/users_middleware');

router.post("/send", send);
router.post("/appointment", appointment)
router.put('/reset-password', checkEmail, resetPassword)

module.exports = router;
