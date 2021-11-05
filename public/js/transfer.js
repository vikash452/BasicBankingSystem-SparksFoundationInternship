function addSpace(container)
{
    for(var i=0; i<6; ++i)
    {
        let br = document.createElement('div')
        br.classList.add('grid-item')
        br.innerText = ' '
        container.appendChild(br)
    }
}

document.querySelector('.send').addEventListener('click',async ()=>{
    // console.log('h')
    var acc_1 = document.getElementById('acc_1').value
    var acc_2 = document.getElementById('acc_2').value
    var amountToTransfer = document.getElementById('amount').value
    amountToTransfer = parseInt(amountToTransfer)
    // console.log(acc_1,acc_2,amountToTransfer)
    var container = document.querySelector('.grid-container')

    var customer_1 = await fetch(`/getUserData/${acc_1}`).then(res=>res.json())
    if(customer_1.isError)
    {
        window.alert("Receiver with the given account number does not exist")
        return;
    }
    
    var customer_2 = await fetch(`/getUserData/${acc_2}`).then(res=>res.json())
    if(customer_2.isError)
    {
        window.alert("Sender with the given account number does not exist")
        return;
    }

    addSpace(container)
    var from = document.createElement('div')
    var from_details = document.createElement('div')
    var to = document.createElement('div')
    var to_details = document.createElement('div')
    var amount = document.createElement('div')
    var amount_details = document.createElement('div')
    var cancel = document.createElement('button')
    var confirm = document.createElement('button')

    from.innerHTML = `From ${customer_1.data.name}`
    from.style.marginLeft = '25%'
    from.classList.add('grid-item')

    from_details.innerHTML = `Account Number = ${customer_1.data.accountNumber}`
    from_details.style.marginRight = '25%';
    from_details.classList.add('grid-item')
    
    to.innerHTML = `To ${customer_2.data.name}`
    to.style.marginLeft = '25%'
    to.classList.add('grid-item')

    to_details.innerHTML = `Account Number = ${customer_2.data.accountNumber}`
    to_details.style.marginRight = '25%';
    to_details.classList.add('grid-item')

    amount.innerHTML = 'Payment of'
    amount.style.marginLeft = '25%'
    amount.classList.add('grid-item')

    amount_details.innerHTML = `${amountToTransfer}`
    amount_details.style.marginRight = '25%';
    amount_details.classList.add('grid-item')

    cancel.innerText = 'Cancel'
    cancel.style.marginLeft = '25%'
    cancel.style.marginRight = '15%'
    cancel.classList.add('button')
    cancel.classList.add('grid-item')
    console.log(cancel)
    cancel.onclick = ()=>{
        window.location = '/transfer'
    }

    confirm.innerText = 'Confirm'
    confirm.style.marginRight = '25%';
    confirm.style.marginLeft = '5%';
    confirm.classList.add('button')
    confirm.classList.add('grid-item')
    confirm.onclick = sendMoney;

    container.appendChild(from)
    container.appendChild(from_details)
    container.appendChild(to)
    container.appendChild(to_details)
    container.appendChild(amount)
    container.appendChild(amount_details)
    container.appendChild(cancel)
    container.appendChild(confirm)
})

async function sendMoney()
{
    var acc_1 = document.getElementById('acc_1').value
    var acc_2 = document.getElementById('acc_2').value
    var amountToTransfer = document.getElementById('amount').value
    amountToTransfer = parseInt(amountToTransfer)

    var data = await fetch('/transferMoney',{
        method:'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            acc_1,
            acc_2,
            amountToTransfer
        })
    })
    .then(res=>res.json())

    if(data.isError)
    {
        window.alert(data.message)
        return;
    }

    // console.log(data)
    window.alert('Success!! Amount transferred successfully')
}