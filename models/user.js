const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    lowercase: true,
    required: true,
    validate: function(email) {
      return (/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      }
    },
  
  phone: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum of 6 characters']
  },

  admin: {
    type: Boolean,
    required: true,
    default: false
  }

}, { timestamps: true}, {collection: 'users'});

module.exports = mongoose.model("User", UserSchema);
