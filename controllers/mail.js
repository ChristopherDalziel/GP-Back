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

async function resetPassword(req, res) {
  try {
    const { email } = req.user;
    const id = uuidv1();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Here is your link to reset your password: ${process.env.REACT_APP_FRONTEND_URL}/${id}/reset-password`
    });
    req.user.passwordToken = id;
    await req.user.save();
    res.status(200).send("Password reset successful");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { send, resetPassword };
