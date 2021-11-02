const express = require('express')
const router = express.Router()

router.get('/test',(req,res)=>{
    console.log('working')
})

module.exports = router;