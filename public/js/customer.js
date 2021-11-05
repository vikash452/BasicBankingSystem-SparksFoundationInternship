var order = 'default'

async function loadContent()
{
    var data = await fetch(`/userList/${order}`).then(res=>res.json())
    // console.log(data.data)

    var customerContainer = document.querySelector('.customer-container');

    data.data.forEach((element,index) => {
        var nameDiv = document.createElement('div')
        var amountDiv = document.createElement('div')
        var accountDiv = document.createElement('div')
        var emailDiv = document.createElement('div')

        if(index%2 != 0)
        {
            nameDiv.style.backgroundColor = '#ffffcc'
            amountDiv.style.backgroundColor = '#ffffcc'
            emailDiv.style.backgroundColor = '#ffffcc'
            accountDiv.style.backgroundColor = '#ffffcc'
        }

        nameDiv.innerHTML = element.name
        emailDiv.innerHTML = element.email
        accountDiv.innerHTML = element.accountNumber
        amountDiv.innerHTML = element.amount

        nameDiv.classList.add('customer-item');
        amountDiv.classList.add('customer-item');
        emailDiv.classList.add('customer-item');
        accountDiv.classList.add('customer-item');

        customerContainer.appendChild(nameDiv);
        customerContainer.appendChild(emailDiv);
        customerContainer.appendChild(accountDiv);
        customerContainer.appendChild(amountDiv);
    });
}

document.addEventListener('DOMContentLoaded',async ()=>{
    loadContent();
})

document.getElementById('makeAscending').addEventListener('click', async ()=>{
    var customerContainer = document.querySelector('.customer-container');
    order  = 'asc'
    
    while(customerContainer.childNodes.length > 8)
    {
        customerContainer.removeChild(customerContainer.childNodes[8]);
    }

    loadContent();
})

document.getElementById('makeDescending').addEventListener('click', async ()=>{
    var customerContainer = document.querySelector('.customer-container');
    order  = 'desc'
    
    while(customerContainer.childNodes.length > 8)
    {
        customerContainer.removeChild(customerContainer.childNodes[8]);
    }

    loadContent();
})