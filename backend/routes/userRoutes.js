const express = require("express");
const jwt = require('jsonwebtoken')
const app = express()
const router = express.Router();
const {
  loginPage,
  registerPage,
  registerUser,
  loginUser,
  forgotPage,
  forgottenUser,
  resetUser,
  resetPage,
} = require("../controllers/userController");


router.route("/login").get(loginPage).post(loginUser);
router.route("/register").get(registerPage).post(registerUser);
router.route("/forgot").get(forgotPage).post(forgottenUser);
router.route("/reset").get(resetPage).post(resetUser);

module.exports = router;
