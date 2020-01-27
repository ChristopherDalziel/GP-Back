const express = require("express");
const Appointment = require("../models/appointment");
const cors = require("cors");
const mongoose = require('mongoose');

let app = express();
app.use(express.json());
app.use(cors());

async function newAppointment (req, res) {
  try {
    const { firstName, lastName, email, phone, dateTime, comment} = req.body;

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
    
    res.status(200).send(appointment)
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
}

async function getAppointmentsByUser (req, res) {
 try {
  const email = req.decoded.email;
  const query = Appointment.find({email: email, cancelled:false});
  query instanceof mongoose.Query; // true
  const appointments =  await query; // Get the documents
  res.send(appointments);
 } catch(err) {
   console.log(err);
 }
}

module.exports = {newAppointment, getAppointmentsByUser}