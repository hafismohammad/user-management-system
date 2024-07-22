const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const generateToken = require('../utils/jwt');



const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                token: generateToken({ userId: user._id }),
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
});


const signUp = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        if (!name || !email || !phone || !password) {
            console.log('Missing fields:', { name, email, phone, password });
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashPassword,
        });

        if (user) {
            console.log('registered user');
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: generateToken({ id: user._id }),
            });
        } else {
            throw new Error('Invalid user data');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Error during registration' });
    }
};

const jwttest = asyncHandler (async = (req, res) => {
    try {
        console.log('jwttest');
        res.status(200).json({message: 'hello token'})
    } catch (error) {
        res.status(500).json({message: ' error '})
        
    }
})

const profile = async (req, res) => {
    try {
        console.log('user profile');
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
}

module.exports = { login, signUp , jwttest, profile};
