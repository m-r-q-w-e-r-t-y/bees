const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Files = require("../models/fileModel");

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

// @desc    Get note page
// @route   GET /note
// @access  Public
const notePage = async (req, res) => {
  const notes = await Files.find();

  res.status(200).json(notes);
};

const commentPage = async (req, res) => {
  const comments = await Files.find();

  res.status(200).json(comments);
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
    res.json({
      success: false
    })
  }
  else{
    res.json({
      success: true
    })
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

  const file = await Files.create({
    email,
    filename: "test",
    code: "print(Hello World!)",
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


  const Str = require('@supercharge/strings')
  const token = Str.random(50)
  const filter = { email: email };
  const update = { token: token };

  const userExists = await User.findOneAndUpdate( filter, update);

  if(userExists){

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

      res.json({
        success: true
      })
    })
  }
  else {
    res.json({
      success: false
    })
  }
  

})

// @desc    Change password
// @route   POST /reset
// @access  Public
const resetUser = asyncHandler(async (req, res) => {

  const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {

    res.status(400);
    throw new Error(`Please add all fields\n`);
  }


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const filter = { token: token };
  const update = { password: hashedPassword };

  const tokenExists = await User.findOneAndUpdate(filter, update);

  if(!tokenExists){
    throw new Error(`Invalid Code\n`);
  }
  else{
    res.json({
      success: true
    })
  }
  

});

// @desc    Save note
// @route   POST /note
// @access  Public
const noteUser = asyncHandler(async (req, res) => {

  const { email, filename, code } = req.body;

  const filter = { email: email };
  const update = { code: code };

  const fileExists = await Files.findOneAndUpdate(filter, update);
  if(!fileExists){
    throw new Error(`Invalid Code\n`);
  }
  else{
    res.json({
      success: true
    })
  }

});

const commentUser = asyncHandler(async (req, res) => {
  const { email, currentComment, comments } = req.body;
  const filter = { email: email };
  
  await Files.findOneAndUpdate(filter, 
    { $push: { 
      comments: {
        height : comments[0].height,
        title : comments[0].title,
        input: comments[0].input
        }  
    } 
  })
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
  resetPage,
  noteUser,
  notePage,
  commentUser,
  commentPage
};


const nodemailer = require('nodemailer');
const { db } = require("../models/fileModel");

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

