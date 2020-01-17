const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

//mongoose
mongoose.connect(process.env.DB_URL, dbConfig, err => {
  if (err) {
    console.log("Database Not Connected ❌");
  } else {
    console.log("Database Connected ✅");
  }
});
