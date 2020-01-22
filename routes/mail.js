const express = require("express");
const router = express.Router();
const { send, resetPassword } = require("../controllers/mail");

router.post("/send", send);

module.exports = router;
