const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpeningHoursSchema = new Schema(
  {
    order: {
      type: String
    },
    dayOfTheWeek: {
      type: String
    },
    openingHours: {
      type: String,
      required: true
    }
  },
  { collection: "openingHours" }
);

module.exports = mongoose.model("openingHours", OpeningHoursSchema);
