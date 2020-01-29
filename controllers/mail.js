var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const express = require("express");
const uuidv1 = require("uuidv1");

require("dotenv").config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_USER_PASS
  }
});

const send = (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>First Name: ${req.body.first_name}</li>
      <li>Last Name: ${req.body.last_name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.contact_number}</li>
      </ul>
    <h3>Subject: ${req.body.subject} </h3>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Klinik FWD EMAIL" <process.env.EMAIL_USER>', // sender address
    to: "christopher.dalziel@icloud.com", // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: "Example", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("ContactForm", { msg: "Email has been sent" });
  });
};

//send an email with a link containing a token to allow password reset
const resetPassword = async (req, res) => {
  try {
    const { email } = req.user;
    const id = uuidv1();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Here is the link to reset your password: ${process.env.REACT_APP_FRONTEND_URL}/${id}/reset-password`
    });
    req.user.passwordToken = id;
    await req.user.save();
    res.status(200).send("Password reset successful");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const appointment = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, dateTime, comment } = req.body;

    if (comment == 'undefined') {
      comment = 'No comment included'
    }

    const output = `
    <p>Thank you for choosing Klinik Doctor Leong.</p>
    <h3>Here are your appointment details: </h3>
    <h3>Date and Time: ${dateTime}</h3>
    <ul>  
      <li>First Name: ${firstName}</li>
      <li>Last Name: ${lastName}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
      <li>Your comments: ${comment} </li>
      </ul>
      <h5>To cancel your appointment, please phone the clinic directly, reply to this message, or via our website once you're logged in.</h5>
      <h5>To Change your appointment, please cancel this appointment and make a new one.</h5>
      <h5>Kind regards, <br>
      The team at Klinik Dr Leong</h5>
  `;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      bcc: process.env.EMAIL_USER,
      subject: "Appointment Details",
      html: output
    });
    res.status(200).end();
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, dateTime, comment } = req.body;

    if (comment == 'undefined') {
      comment = 'No comment included'
    }

    const output = `
    <h2>Your appointment below has been CANCELLED:</h2>
    <h3>Date and Time: ${dateTime}</h3>
    <ul>  
      <li>First Name: ${firstName}</li>
      <li>Last Name: ${lastName}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
      <li>Your comments: ${comment} </li>
      </ul>
      <h5>To make a new appointment, please visit our website or call the clinic on <a href="tel:+603-7498-0017">+60 3-7498 0017</a></h5>
      <h5>Kind regards, <br>
      The team at Klinik Dr Leong</h5>
  `;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      bcc: process.env.EMAIL_USER,
      subject: "CANCELLED Appointment",
      html: output
    });
    res.status(200).end();
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
}
module.exports = { send, resetPassword, appointment, cancelAppointment };
