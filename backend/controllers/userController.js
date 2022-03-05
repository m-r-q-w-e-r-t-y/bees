// @desc    Get login page
// @route   GET /login
// @access  Public
const loginPage = (req, res) => {
    res.json({message: 'Login Page'});
};

// @desc    Authenticate user
// @route   POST /login
// @access  Public
const authenticateUser = (req, res) => {
    res.json({message: 'Authenticating User'});
};

// @desc    Get register page
// @route   GET /register
// @access  Public
const registerPage = (req, res) => {
    res.json({message: 'Register Page'});
};

// @desc    Submit new user
// @route   POST /register
// @access  Public
const registerUser = (req, res) => {
    res.json({message: 'Register User'});
};

module.exports = { loginPage, authenticateUser, registerPage, registerUser }