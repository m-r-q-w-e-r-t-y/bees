const express = require("express");
const router = express.Router();
const {
  loginPage,
  registerPage,
  registerUser,
  loginUser,
} = require("../controllers/userController");

router.route("/login").get(loginPage).post(loginUser);
router.route("/register").get(registerPage).post(registerUser);

module.exports = router;
