const express = require("express");
const router = express.Router();
const {
  send,
  resetPassword,
  appointment,
  cancelAppointment
} = require("../controllers/mail");
const { checkEmail } = require("../controllers/users_middleware");
const cors = require("cors");

router.post("/send", send);
router.post("/appointment", appointment);
router.post("/cancel_appointment", cancelAppointment);
router.put("/reset-password", checkEmail, resetPassword);

module.exports = router;
