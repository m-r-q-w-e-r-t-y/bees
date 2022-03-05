const express = require('express');
const router = express.Router();
const { loginPage, authenticateUser, registerPage, registerUser } = require('../controllers/userController')

router.route('/login').get(loginPage).post(authenticateUser)
router.route('/register').get(registerPage).post(registerUser)

module.exports = router;