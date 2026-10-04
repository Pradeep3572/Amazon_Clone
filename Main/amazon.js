import {cart,getCartCount,item} from "./cart-data.js"
//localStorage.clear();
//localStorage.clear('cart-items','cart-count');
document.querySelector('.cart-value').innerHTML=getCartCount();
let newcart=[];

let html=''
item.forEach((item)=>{
    html+=`<div class="items">
                <div class="product-image">
                    <img src="Images/${item.image}" class="product-pic" >    
                </div>
                <div class="product-name">
                    <p>${item.name}</p>
                </div>
                <div class="product-rating">
                    <img src="Images/${item.ratings.stars}" class="ratings-img">
                    <span class="rating-num">${item.ratings.num}</span>
                </div>
                <div class="product-price">
                    <p><b>${item.price}</b></p>
                </div>
                <div class="product-quantity">
                    <select class="total-quantity">
                        <option selected value="1">1</option>
                        <option  value="2">2</option>
                        <option  value="3">3</option>
                        <option  value="4">4</option>
                        <option  value="5">5</option>
                        <option  value="6">6</option>
                        <option  value="7">7</option>
                        <option  value="8">8</option>
                        <option  value="9">9</option>
                        <option  value="10">10</option>
                    </select>
                </div>
                <div class="product-message">
                    <p class="success"></p>
                </div>
                <div class="product-to-cart">
                    <button class="add-to-cart" data-id="${item.id}">Add to cart</button>
                </div>
            </div>`
})
document.querySelector('.products').innerHTML=html;


function button()
{
document.querySelectorAll('.add-to-cart').forEach((button,index)=>
{
    let timer,qty;
    button.addEventListener('click',()=>{
        qty=Number(document.querySelectorAll('.total-quantity')[index].value);
        document.querySelectorAll('.success')[index].innerHTML=`<img src="Images/checkmark.png" class="checkmark"> Added`;
      
        clearTimeout(timer);
        timer=setTimeout(()=>{
             document.querySelectorAll('.success')[index].innerHTML='';
        },1000);
       
       let product = cart.find((product) => product.id === item[index].id);

            if (product) 
            {
                product.qty += qty;
            }
            else{
                cart.push({
                id:item[index].id,
                name:item[index].name,
                price:item[index].price,
                image:item[index].image,
                qty
                });
            }
        
        localStorage.setItem('cart-items',JSON.stringify(cart));
        document.querySelector('.cart-value').innerHTML=getCartCount();;
    });
        
    });
};
function findProduct()
{

    document.querySelector('.search-bar').addEventListener('change',()=>{
        let searched= document.querySelector('.search-bar').value;
        newcart=[]
        item.forEach((product)=>{
        if(product.name.toLowerCase().includes(searched.toLowerCase()))
        {
            newcart.push(product);

        }
        })
        if(newcart.length>0)
        {
        let newhtml='';    
        newcart.forEach((item)=>{
            newhtml+=`<div class="items">
                <div class="product-image">
                    <img src="Images/${item.image}" class="product-pic" >    
                </div>
                <div class="product-name">
                    <p>${item.name}</p>
                </div>
                <div class="product-rating">
                    <img src="Images/${item.ratings.stars}" class="ratings-img">
                    <span class="rating-num">${item.ratings.num}</span>
                </div>
                <div class="product-price">
                    <p><b>${item.price}</b></p>
                </div>
                <div class="product-quantity">
                    <select class="total-quantity">
                        <option selected value="1">1</option>
                        <option  value="2">2</option>
                        <option  value="3">3</option>
                        <option  value="4">4</option>
                        <option  value="5">5</option>
                        <option  value="6">6</option>
                        <option  value="7">7</option>
                        <option  value="8">8</option>
                        <option  value="9">9</option>
                        <option  value="10">10</option>
                    </select>
                </div>
                <div class="product-message">
                    <p class="success"></p>
                </div>
                <div class="product-to-cart">
                    <button class="add-to-cart" data-id="${item.id}">Add to cart</button>
                </div>
            </div>`
        })
        document.querySelector('.products').innerHTML=newhtml;
        button();
        }
        else{
             document.querySelector('.products').innerHTML=`<h3 style='color:red'>No products matched your results</h3>`;
        }
        if(searched==='')
        {
            newcart=[]
            document.querySelector('.products').innerHTML=html;
            button();
            
        }
    })
}
button();
findProduct();