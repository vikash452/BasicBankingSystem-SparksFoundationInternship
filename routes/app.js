const express = require('express')
const router = express.Router()
const Transaction = require('../database_models/transaction')
const User = require('../database_models/user')

router.get('/test',(req,res)=>{
    console.log('working')
})

router.get('/transactionList',async(req,res)=>{
    try{
        // console.log('working fine')
        var result = await Transaction.find()
        // console.log(result)
        result.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date_of_transaction) - new Date(a.date_of_transaction);
          });
        return res.status(200).json({isError:false, data:result})
    }catch(error){
        console.log(error.message)
        return res.status(400).json({isError:true, message:error.message})
    }
})

router.post('/addUser',async(req,res)=>{
    try{
        var name = req.body.name
        var email = req.body.email
        var amount = req.body.amount
        var accountNumber = req.body.accountNumber
        var bankName = req.body.bankName

        var newUser = new User({
            name,
            email,
            amount,
            accountNumber,
            bankName
        })

        var savedUser = await newUser.save()
        return res.status(200).json(savedUser)

    }catch(error){
        console.log(error.message)
    }
})

router.get('/userList',async(req,res)=>{
    try{
        var result = await User.find()
        return res.status(200).json({isError:false, data:result})
    }catch(error){
        console.log(error.message)
        return res.status(400).json({isError:true, message:error.message})
    }
})

router.put('/transferMoney',async(req,res)=>{
    try{
        var acc_1 = req.body.acc_1   
        var acc_2 = req.body.acc_2
        var amountToTransfer = req.body.amountToTransfer
        
        if(!acc_1 || !acc_2) throw new Error('Account Number missing')
        if(!amountToTransfer) throw new Error('Amount missing')

        var customer_1 = await User.findOne({accountNumber : acc_1})
        if(!customer_1 || customer_1 == null || customer_1 == undefined) throw new Error(`No customer found with account number ${acc_1}`);
        
        var customer_2 = await User.findOne({accountNumber : acc_2})
        if(!customer_2 || customer_2 == null || customer_2 == undefined) throw new Error(`No customer found with account number ${acc_2}`);
        
        if(customer_1.amount < amountToTransfer)
        {
            var newTransaction = new Transaction({
                account_1:acc_1,
                account_2:acc_2,
                name_1:customer_1.name,
                name_2:customer_2.name,
                amount_transferred:amountToTransfer,
                status:"Not enough amount in sender's account"
            })

            await newTransaction.save()
            throw new Error("Not enough amount in sender's account")
        }
        

        customer_1.amount = customer_1.amount - amountToTransfer
        customer_2.amount = customer_2.amount + amountToTransfer

        await customer_1.save();
        await customer_2.save();

        var newTransaction = new Transaction({
            account_1:acc_1,
            account_2:acc_2,
            name_1:customer_1.name,
            name_2:customer_2.name,
            amount_transferred:amountToTransfer,
            status:"Amount transferred successfully"
        })

        var savedTransaction = await newTransaction.save()
        return res.status(200).json({isError:false, data:savedTransaction})

    }catch(error){
        console.log(error.message)
        return res.status(400).json({isError:true, message:error.message})
    }
})

router.get('/getUserData/:acc', async(req,res)=>{
    try{
        var acc = req.params.acc
        var customer = await User.findOne({accountNumber : acc})

        if(!customer || customer == null || customer == undefined)
        throw new Error('User not found')
        
        return res.status(200).json({isError:false, data:customer})

    }catch(error){
        console.log(error.message)
        return res.status(400).json({isError:true, message:error.message})
    }
})

module.exports = router;