const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require( 'bcrypt' );
const cors = require("cors");



let app = express();
app.use(express.json());
app.use(cors());


const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const token_secret = process.env.TOKEN_SECRET;

const createToken = ({ email, admin }) => {
  return jwt.sign({ email, admin }, token_secret, { expiresIn: "24h" });
};

//registration path
async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await hashPassword(password);
    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
      admin: false
    });
    user = await newUser.save();
    const token = createToken(user);
    res.send({token: token,
      admin: user.admin})
    // res.redirect('back')
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
}

//login path
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email
    });
    if (user) {
      const correctPassword = await comparePassword(password, user.password);
      if (correctPassword) {
        console.log("password ok")
        const token = createToken(user);
        res.send({token: token,
          admin: user.admin})
      } else {
        console.log("password failed")
        res.status(403).send("Incorrect username or password");
      }
    } else {
      res.status(403).send("Unable to locate user with this email");
    }
  } catch (err) {
    res.status(400).send("Authentication failed, please check the request");
  }
}

//reset password path
async function resetPassword(req, res) {
  try {
    const {password, token} = req.body;
    if (!token) {
      res.status(403).send('Authentication failed')
    }
    const user = await User.findOne({
      passwordToken: token 
    })
    if (!user) {
      res.status(403).send('Reset password failed')
    } else {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      user.passwordToken = null;
      await user.save();
      const token = createToken(user)
      res.send({token: token,
        admin: user.admin})
    }
  } catch(err) {
    res.status(500).send(err.message)
  }
}

//find one user path
const findUser = async (req, res) => {
  console.log(req.decoded)

  const email = req.decoded.email;

  //finding user info from email decoded from token
  try {
    const user = await User.findOne({
      email: email
    }).then(
      res.send({
        email: user.email,
        admin: user.admin,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName
      })
    )
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = { register, login, resetPassword, findUser };
