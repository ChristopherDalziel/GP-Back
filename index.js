require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

//heroku won't always use port 5000
const PORT = process.env.PORT || 5000;

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

//mongoose
mongoose.connect(process.env.DB_URL, dbConfig, err => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log("Connected to MongoDB Atlas ✅");
  }
});

//middleware
const app = express();
app.use(express.json());
app.use(cors());

//Connecting to the routes
app.use(require("./routes/index"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/send", (req, res) => {
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
});
