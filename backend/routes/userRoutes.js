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
  noteUser,
  notePage,
  commentUser,
  commentPage,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/login").get(loginPage).post(loginUser);
router.route("/register").get(registerPage).post(registerUser);
router.route("/forgot").get(forgotPage).post(forgottenUser);
router.route("/reset").get(resetPage).post(resetUser);
router.route("/note").get(notePage).post(noteUser);
router.route("/comment").get(commentPage).post(commentUser);

module.exports = router;
