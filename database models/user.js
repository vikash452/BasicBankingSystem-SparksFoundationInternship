const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    accountNumber:{
        type:Number,
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