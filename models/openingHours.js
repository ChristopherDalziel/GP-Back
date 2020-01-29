const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpeningHoursSchema = new Schema(
  {
    openingHours: {
      type: String,
      required: true
    }
  },
  { collection: "openingHours" }
);

module.exports = mongoose.model("openingHours", OpeningHoursSchema);
