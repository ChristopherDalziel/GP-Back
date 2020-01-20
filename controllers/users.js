const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require( 'bcrypt' );
const cors = require('cors');


let app = express();
app.use(express.json());
app.use(cors());

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const token_secret = process.env.TOKEN_SECRET;

const createToken = ({email, admin}) => {
  // let isAdmin = admin.toString();
  // console.log(isAdmin)
  return jwt.sign({email, admin}, token_secret, {expiresIn: '24h' })
}

async function register(req, res) {
  try {
    const {firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await hashPassword(password);
    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
      admin: false
    });
    user = await newUser.save()
    const token = createToken(user)
    res.send(token)
  } catch(err) {
    res.status(500).send(err.message)
  }
}


async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email
    });
    if (user) {
      const correctPassword = await comparePassword(password, user.password);
      if (correctPassword) {
        const token = createToken(user);
        res.send(token);
        // next();
      } else {
        res.status(403).send('Incorrect username or password')
      }
    } else {
      res.status(403).send('Unable to locate user with this email')
    }
  } catch(err) {
    res.status(400).send('Authentication failed, please check the request')
  }
}

module.exports = {register, login}





