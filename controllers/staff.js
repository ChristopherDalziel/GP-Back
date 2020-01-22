const express = require("express");
const Staff = require("../models/staff");

let app = express();
app.use(express.json());


async function addStaff(req, res) {
  try {
    const { name, aboutText, imageUrl} = req.body;
    let newStaff = new Staff({
      name: name,
      aboutText:aboutText,
      imageUrl:imageUrl
    });
    user = await newStaff.save();

    res.send("Successfully add the staff");
  } catch (err) {
    console.log(err.message);
    
    res.status(500).send(err.message);
  }
}

async function staffs(req, res) {
  try {
    const staffs = await Staff.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
}


module.exports= {addStaff,staffs}