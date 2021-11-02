const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    account_1:{
        type:Number,
        required:true
    },
    name_1:{
        type:String
    },
    account_2:{
        type:Number,
        required:true
    },
    name_2:{
        type:String
    },
    amount_transferred:{
        type:Number
    },
    status:{
        type:Boolean
    },
    reason:{
        type:String
    },
    date_of_transaction:{
        type:Date,
        default:Date.now()
    }
})

const Transaction = new mongoose.model('Transaction', transactionSchema)
module.exports = Transaction;