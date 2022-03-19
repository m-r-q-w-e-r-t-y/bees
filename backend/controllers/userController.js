const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

  //Default token
  const Str = require('@supercharge/strings')
  const token = Str.random(50)

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    token: token,
  });
  if (user) {
    res.status(200);
    // res.status(201).json({
    //   _id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });
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
    // res.json({
    //   _id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });
    res.status(200).json({success: true})
  } else {
    res.status(200).json({success: false})
    throw new Error("Invalid credentials");
  }
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

  // Obtain user by email
  const user = await User.findOne({ email });

  if (user){
    const str = require('@supercharge/strings')
    const token = str.random(50)
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
    
    res.json({
      email: email,
    });
  }
  res.json({
    user_exists: false,
  });
})

// @desc    Change password
// @route   POST /reset
// @access  Public
const resetUser = asyncHandler(async (req, res) => {
  const { token, password, confirmNewPassword } = req.body;
  const user = await forgotUser.find({ token })
  if (user) {
    const id = user.id;
    const str = require('@supercharge/strings');
    const updatedToken = str.random(50);
    const updatedUserToken = await User.findByIdAndUpdate(id, { 
      token : updatedToken,
      password: password
    })
  }
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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

// const nodemailer = require('nodemailer');
// const { application } = require("express");
// const { db } = require("../models/userModel");
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "noreply1bees@gmail.com",
//     pass: "AnyPass1!"
//   }
// })

// let mailOptions = {
//   from: "noreply1bees@gmail.com",
//   to: "noreply1bees@gmail.com",
//   subject: "Reset Token",
//   html: "token sent"
// }

// transporter.sendMail(mailOptions, function (err, info) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(info);
//   }
// })
