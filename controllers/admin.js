const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Staff = require("../models/staff");

let app = express();
app.use(express.json());
app.use(cors());

function dashboard(req, res) {
  return res.send("This is the admin dashboard");
}

//add staff function goes here

async function addStaff(req, res) {
  try {
    const { name, aboutText, imageUrl} = req.body;
    let newStaff = new Staff({
      name: name,
      aboutText:aboutText,
      imageUrl:imageUrl
    });
    const staff = await newStaff.save();
    res.send(staff);
  } catch (err) {
    
    res.status(500).send(err.message);
  }
}

module.exports = { dashboard, addStaff };
