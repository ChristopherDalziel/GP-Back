const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
name: {
  type: String,
  required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: function(email) {
      return (/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      }
    },
    phone: {
      type: Number,
      required: true
    },

  text: {
    type: String,
    required: true
  }
}, {timestamp: true}, {collection: 'contactforms'});

module.exports = mongoose.model("ContactForm", ContactFormSchema);