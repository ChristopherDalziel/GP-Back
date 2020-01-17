const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require( 'bcrypt' );

let app = express();
app.use(express.json());
app.use(cors());

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hashedPassword)
}

const token_secret = process.env.TOKEN_SECRET;

const createToken = ({username}) => {
  return jwt.sign({username}, token_secret, {expiresIn: '24h' })
}

async function register(req, res) {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    let user = new User({
      username: req.body.username,
      password: hashedPassword
    })
    user = await user.save()
    const token = createToken(user)
    res.send(token)
  } catch(err) {
    res.status(500).send(err.message)
  }
}


async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username
    });
    if (user) {
      const correctPassword = await comparePassword(password, user.password);
      if (correctPassword) {
        const token = createToken(user);
        res.send(token);
      } else {
        res.status(403).send('Incorrect username or password')
      }
    } else {
      res.status(403).send('Incorrect username or password')
    }
  } catch(err) {
    res.status(400).send('Authentication failed, please check the request')
  }
}

module.exports = {register, login}





