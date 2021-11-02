const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    amount:{
        type:Number
    },
    accountNumber:{
        type:String,
        unique:true,
        required:true
    },
    bankName:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User