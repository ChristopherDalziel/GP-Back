const express = require("express");
const router = express.Router();
const { send, resetPassword } = require("../controllers/mail");
const {checkEmail} = require('../controllers/users_middleware');

router.post("/send", send);
router.put('/reset-password', express.json(), checkEmail, resetPassword)

module.exports = router;
