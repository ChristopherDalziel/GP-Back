const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  // user: {
  //   type: ObjectId,
  //   ref: "User",
  // },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateTime: {
    type: String,
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