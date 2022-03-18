const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const forgotUser = require("../models/userModel");

// @desc    Get login page
// @route   GET /login
// @access  Public
const loginPage = (req, res) => {
  res.json({ message: "Login Page" });
};


// @desc    Get register page
// @route   GET /register
// @access  Public
const registerPage = (req, res) => {
  res.json({ message: "Register User" });
};

// @desc    Get forgot page
// @route   GET /forgot
// @access  Public
const forgotPage = (req, res) => {
  res.json({ message: "Forgot Page" });
};

// @desc    Get reset page
// @route   GET /reset
// @access  Public
const resetPage = (req, res) => {
  res.json({ message: "Reset Page" });
};


// @desc    Submit new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please add all fields\n${name}\n${email}\n${password}`);
  }
  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists")
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// @desc    Authenticate user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  //   res.json({ message: "Login User" });

});

// @desc    Send email token for reset password
// @route   POST /forgot
// @access  Public
const forgottenUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error(`Please add all fields\n${email}`);
  }

  res.json({
    email: email,
  });
  const Str = require('@supercharge/strings')
  const token = Str.random(50)
  let mailOptions = {
    from: "noreply1bees@gmail.com",
    to: email,
    subject: "Reset Token",
    html: "token code:" + token
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  })

  //Create User
  const forgottenUser1 = await forgotUser.create({
    email,
    token: token,
  });
  if (user) {
    res.status(201).json({
      email: forgottenUser1.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});

// @desc    Change password
// @route   POST /reset
// @access  Public
const resetUser = asyncHandler(async (req, res) => {
  const { token, password, confirmNewPassword } = req.body;
  const user = await forgotUser.find({ token })

  if (user) {
    res.json({
      password: password,
    });
  }
    else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const filter = { email: 'mrj26@buffalo.edu' };
  const update = { password: 'matt' };

  const resetpassworduser = await User.findByIdAndUpdate(filter, update);
});


module.exports = {
  loginPage,
  //   authenticateUser,
  registerPage,
  registerUser,
  loginUser,
  forgottenUser,
  forgotPage,
  resetUser,
  resetPage
};

const nodemailer = require('nodemailer');
const { application } = require("express");
const { db } = require("../models/userModel");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "noreply1bees@gmail.com",
    pass: "AnyPass1!"
  }
})

let mailOptions = {
  from: "noreply1bees@gmail.com",
  to: "noreply1bees@gmail.com",
  subject: "Reset Token",
  html: "token sent"
}

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
})