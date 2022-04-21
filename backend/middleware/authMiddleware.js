const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.token) {
        try {
            const decodedId = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not Authorized. No token present");
    }
});

module.exports = { protect }