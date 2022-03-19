const express = require("express");
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
const app = express()
=======
>>>>>>> develop
const router = express.Router();
const {
  loginPage,
  registerPage,
  registerUser,
  loginUser,
<<<<<<< HEAD
  forgotPage,
  forgottenUser,
  resetUser,
  resetPage,
} = require("../controllers/userController");


router.route("/login").get(loginPage).post(loginUser);
router.route("/register").get(registerPage).post(registerUser);
router.route("/forgot").get(forgotPage).post(forgottenUser);
router.route("/reset").get(resetPage).post(resetUser);
=======
} = require("../controllers/userController");

router.route("/login").get(loginPage).post(loginUser);
router.route("/register").get(registerPage).post(registerUser);
>>>>>>> develop

module.exports = router;
