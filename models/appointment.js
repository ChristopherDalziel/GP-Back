const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  comment: {
    type: String
  },
  cancelled: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamp: true }, {collection: 'appointments'});

module.exports = mongoose.model("Appointment", AppointmentSchema);