const express = require("express");
const Appointment = require("../models/appointment");
const cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors());

async function newAppointment (req, res) {
  try {
    const { firstName, lastName, email, phone, dateTime, comment} = req.body;
    // const userId = await User.findOne({
    //   email: email
    // }).then((response) => {
    //   if (response._id) {
    //     id = response._id
    //   } else {
    //     id = null
    //   }
    //   return id
    // })

    let newAppointment = new Appointment({
      // user: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      dateTime: dateTime,
      comment: comment,
      cancelled: false
    });
    appointment = await newAppointment.save();
    
    res.status(200).send('Appointment Created')
    // res.redirect('back')
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
}

module.exports = {newAppointment}