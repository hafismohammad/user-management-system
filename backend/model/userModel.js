const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
//     cpassword:{
//         type:String,
//         required:false
//     },
},
{
    timestamps:true
})



module.exports = mongoose.model('UserModel', userSchema)
