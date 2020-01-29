const express = require("express");
const User = require("../models/user");
const mongoose = require("mongoose");
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

async function allUsers(req, res) {
  try {
    const query = User.find();
    query instanceof mongoose.Query; // true
    const usersList = await query.sort({lastName: 'descending'}); // Get the documents
    res.send(usersList);
  } catch (err) {
    console.log(err.message)
    res.send(err.message)
  }
}

// Get all Staff
function staffs(req, res) {
  Staff.find(function(err, staffs) {
    if (err) {
      console.log(err);
    } else {
      res.json(staffs);
    }
  });
}

//Create new Staff member
async function addStaff(req, res) {
  try {
    const { name, position,aboutText, imageUrl } = req.body;
    let newStaff = new Staff({
      name: name,
      position: position,
      aboutText: aboutText,
      imageUrl: imageUrl
    });
    const staff = await newStaff.save();
    res.send(staff);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Edit current Staff
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
      staff.position = req.body.position;
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

//Delete Staff member
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
  staffs,
  addStaff,
  updateStaff,
  editStaff,
  deleteStaff,
  upload_image,
  allUsers
};
