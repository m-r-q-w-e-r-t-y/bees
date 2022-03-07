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

// const authenticateUser = (req, res) => {
//   res.json({ message: "Authenticating User" });
// };

// @desc    Get register page
// @route   GET /register
// @access  Public
const registerPage = (req, res) => {
  res.json({ message: "Register User" });
};

// @desc    Submit new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
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

  //   res.json({ name: `name`, email: `email`, password: `password` });
  //   res.json({ name: "Register User" });
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

module.exports = {
  loginPage,
  //   authenticateUser,
  registerPage,
  registerUser,
  loginUser,
};
