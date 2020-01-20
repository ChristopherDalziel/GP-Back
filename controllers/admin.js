const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require( 'bcrypt' );
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

function dashboard(req, res) {
  return res.send('This is the admin dashboard')
}

module.exports = {dashboard}





