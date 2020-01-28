const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

//staff
const Staff = require("../models/staff");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

let app = express();
app.use(express.json());
app.use(cors());

function dashboard(req, res) {
  return res.send("This is the admin dashboard");
}

// get all staffs

function staffs(req, res) {
  Staff.find(function(err, staffs) {
    if (err) {
      console.log(err);
    } else {
      res.json(staffs);
    }
  });
}

//add staff function
async function addStaff(req, res) {
  try {
    const { name, aboutText, imageUrl } = req.body;
    let newStaff = new Staff({
      name: name,
      aboutText: aboutText,
      imageUrl: imageUrl
    });
    const staff = await newStaff.save();
    res.send(staff);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// staff edit route
function editStaff(req, res) {
  let id = req.params.id;
  Staff.findById(id, function(err, staff) {
    res.json(staff);
  });
}

//  Staff update route
function updateStaff(req, res) {
  Staff.findById(req.params.id, function(err, staff) {
    if (!staff) res.status(404).send("data is not found");
    else {
      staff.name = req.body.name;
      staff.aboutText = req.body.aboutText;
      staff.imageUrl = req.body.imageUrl;

      staff
        .save()
        .then(staff => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
}

//delete staff function
async function deleteStaff(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);

    //Check for ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !staff) {
      return res.status(404).json({ msg: "staff not found" });
    }
    await staff.remove();
    res.json({ msg: "staff removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}




module.exports = {
  dashboard,
  staffs,
  addStaff,
  updateStaff,
  editStaff,
  deleteStaff
};
