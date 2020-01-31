const mongoose = require("mongoose");
const app = require('./app')

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

//comment app.listen out for testing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
