const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VaccineSchema = new Schema(
  {
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    manufacturer: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  { collection: "vaccines" }
);

module.exports = mongoose.model("Vaccine", VaccineSchema);
