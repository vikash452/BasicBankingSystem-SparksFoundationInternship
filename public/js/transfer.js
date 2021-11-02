document.querySelector('.send').addEventListener('click',()=>{
    // console.log('h')
    var acc_1 = document.getElementById('acc_1').value
    var acc_2 = document.getElementById('acc_2').value
    var amount = document.getElementById('amount').value
    amount = parseInt(amount)
    console.log(acc_1,acc_2,amount)
})