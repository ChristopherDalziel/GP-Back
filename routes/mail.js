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
const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required()
})

const validate = (req, res, next) => {
  const result = schema.validate(req.body)
  if (result.error) {
    res.status(500).end()
  } else {
    next()
  }
}

router.post("/send", validate, send);
router.post("/appointment", appointment);
router.post("/cancel_appointment", cancelAppointment);
router.put("/reset-password", checkEmail, resetPassword);

module.exports = router;
