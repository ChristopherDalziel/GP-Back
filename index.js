require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const morgan = require("morgan");

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
app.use(morgan("dev"));

//Connecting to the routes
app.use(require("./routes/index"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//comment app.listen out for testing
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
