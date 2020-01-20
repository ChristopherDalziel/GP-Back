const express = require('express');
const router = express.Router();
const User = require('../models/user');


const checkAdmin = (req, res, next) => {
  console.log(req.decoded.admin)
  if (req.decoded.admin == true) {
    next();
  } else {
    return res.status(403).send("Not authorized")
  }
}

module.exports = {checkAdmin}