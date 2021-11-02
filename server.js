const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/BankingSystem',{useNewUrlParser:true,useUnifiedTopology:true});
// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('failed to connect to database')
})

app.use(require('./routes/app'))

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/html/home.html')
})

app.get('*',(req,res)=>{
    res.sendFile(__dirname + '/public/html/home.html')
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})