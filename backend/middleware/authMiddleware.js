const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
     
    if (!token) {
        console.log("no token passing")
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = { protect };
