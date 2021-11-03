document.addEventListener('DOMContentLoaded',async()=>{
    var data = await fetch('/transactionList').then(res=>res.json())
    console.log(data.data)
})