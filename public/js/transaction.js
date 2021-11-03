document.addEventListener('DOMContentLoaded',async()=>{
    var data = await fetch('/transactionList').then(res=>res.json())
    console.log(data.data)

    var transferContainer = document.querySelector('.transaction-container')

    data.data.forEach((element,index) => {
        var acc_1 = document.createElement('div')
        var acc_2 = document.createElement('div')
        var name_1 = document.createElement('div')
        var name_2 = document.createElement('div')
        var amount = document.createElement('div')
        var date = document.createElement('div')
        var status = document.createElement('div')

        acc_1.classList.add('transaction-item')
        acc_1.innerHTML = element.account_1

        acc_2.classList.add('transaction-item')
        acc_2.innerHTML = element.account_2
        
        name_1.classList.add('transaction-item')
        name_1.innerHTML = element.name_1

        name_2.classList.add('transaction-item')
        name_2.innerHTML = element.name_2

        amount.classList.add('transaction-item')
        amount.innerHTML = element.amount_transferred
        
        date.classList.add('transaction-item')
        var temp = new Date(element.date_of_transaction)
        date.innerHTML = temp.toDateString() + ' ' + temp.toLocaleTimeString()

        status.classList.add('transaction-item')
        status.innerHTML = element.status

        if(index%2 != 0)
        {
            name_1.style.backgroundColor = 'lightgray';
            name_2.style.backgroundColor = 'lightgray';
            acc_1.style.backgroundColor = 'lightgray';
            acc_2.style.backgroundColor = 'lightgray';
            amount.style.backgroundColor = 'lightgray';
            date.style.backgroundColor = 'lightgray';
            status.style.backgroundColor = 'lightgray';
        }

        transferContainer.appendChild(name_1)
        transferContainer.appendChild(acc_1)
        transferContainer.appendChild(name_2)
        transferContainer.appendChild(acc_2)
        transferContainer.appendChild(amount)
        transferContainer.appendChild(date)
        transferContainer.appendChild(status)

    });
})