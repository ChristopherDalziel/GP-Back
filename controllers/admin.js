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

//add staff function 
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

//update staff function 

async function updateStaff(req,res){
  // const {name, aboutText, imageUrl} = req.body;

  // try {
  //   const staff = await Profile.findOne({ id=id });
  //   const newSta = {name, aboutText, imageUrl};
  //   await newSta.save();

  //   res.json(staff);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
}


//delete staff function 
async function delete_staff(req,res){

  try {
    const staff = await Staff.findById(req.params.id);

    //Check for ObjectId format 
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !staff) {
      return res.status(404).json({ msg: 'staff not found' });
    }
    await staff.remove();
    res.json({ msg: 'staff removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

//delete staff function 
async function upload_image(req,res){


}

module.exports = { dashboard, addStaff,updateStaff,delete_staff, upload_image };
