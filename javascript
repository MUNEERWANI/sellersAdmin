let heading=document.querySelector('#heading');
heading.style.backgroundColor='blue';
let body=document.querySelector('body');
body.style.backgroundColor='azure';
console.log('hello bitchs')

//function to post data in crud crud on submit
function storeInCrud(event){
    event.preventDefault();
    const sellingPrice=document.getElementById("sellingPrice").value
    const productName=document.getElementById("productName").value
    const category=document.getElementById("category").value


    const formData={
        sellingPrice:sellingPrice,
        productName:productName,
        category:category
    };


    axios.post("https://crudcrud.com/api/12d6c55d3fed4e9a8aa44a2d6c014700/appointmentData",formData)
    .then((response)=>{
        console.log(response)
        showItemOnScreen(response.data)
    }).catch((err)=>{
        console.log(err)
    })
}

//function to put product on screen

function showItemOnScreen(formData){
    const parentELe=document.getElementById('listofitems');
    const childEle=document.createElement('li');
    childEle.textContent=formData.sellingPrice+'-'+formData.productName+'-'+formData.category


    const deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='Delete Product';

    //on click what will get data
    deleteButton.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/12d6c55d3fed4e9a8aa44a2d6c014700/appointmentData/${formData._id}`)
        .then((response)=>{
            parentELe.removeChild(childEle)
            console.log('data deleted');
        }).catch((err)=>{
            console.log('error deleting data')
        })
        
    }
    childEle.appendChild(deleteButton);
        parentELe.appendChild(childEle);
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/12d6c55d3fed4e9a8aa44a2d6c014700/appointmentData")
    .then((response)=>{
        console.log(response);
        for(let i=0;i<response.data.length;i++){
            showItemOnScreen(response.data[i])
        }
    }).catch((error)=>{
        console.log(error)
    })
})
