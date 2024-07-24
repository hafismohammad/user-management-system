const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/jwt');
const User = require('../model/userModel')


const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminId = process.env.ADMIN_ID;

const adminLogin = asyncHandler( async (req, res) => {
    const admin= {email, password} = req.body
    try {

        if(email === adminEmail && password === adminPassword) {

            const token = generateToken({ userId: adminId, email: adminEmail, role: 'admin' });
            
            res.json({
                message: 'Login Seuccessful',
                token,
                user:{
                    email:adminEmail,
                    id:adminId
                }
            })
        }
        
    } catch (error) {
        res.status(401).json({message: 'Invalid credentials'})
    }
})

const getUser = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users);

        res.json({
            users
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {adminLogin, getUser}