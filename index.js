require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//heroku won't always use port 5000
const PORT = process.env.PORT || 5000;

const app = express();

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
app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
