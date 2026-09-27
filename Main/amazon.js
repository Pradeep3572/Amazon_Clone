import {cart,getCartCount} from "./cart-data.js"
let num=-1;
//localStorage.clear();
//localStorage.clear('cart-items','cart-count');
document.querySelector('.cart-value').innerHTML=getCartCount();
let newcart=[];
let item=[
    {
        id:num+=1,
        image:'athletic-cotton-socks-6-pairs.jpg',
        name:'Black and Gray Athletic Cotton Socks',
        ratings:{
            stars:'ratings1.png',
            num:87
        },
        price:'Rs 120.00'
    }
    ,
    {
        id:num+=1,
        image:'intermediate-composite-basketball.jpg',
        name:'Intermediate Size Basketball',
        ratings:{
            stars:'ratings2.png',
            num:127
        },
        price:'Rs 799.00'
    }
    ,
    {
        id:num+=1,
        image:'hoodie.png',
        name:'Naruto Itachi Hoodie',
        ratings:{
            stars:'ratings1.png',
            num:355
        },
        price:'Rs 449.00',
    }
    ,
    {
        id:num+=1,
        image:'sunglasses.webp',
        name:'UV Protected Sunglasses for Men and Women',
        ratings:{
            stars:'ratings3.png',
            num:182
        },
        price:'Rs 395.00',
    },
    {
        id:num+=1,
        image:'phone.webp',
        name:'OnePlus Nord CE6 | 8GB+128GB | Snapdragon 7s Gen 4',
        ratings:{
            stars:'ratings2.png',
            num:32
        },
        price:'Rs 37,999.00',
    },
    {
        id:num+=1,
        image:'bat.webp',
        name:'BAS Cricket bat 1100g',
        ratings:{
            stars:'ratings2.png',
            num:11
        },
        price:'Rs 14,436.00',
    },
    {
        id:num+=1,
        image:'Gloves.webp',
        name:'SG wicketKeeping Gloves',
        ratings:{
            stars:'ratings1.png',
            num:19
        },
        price:'Rs 2,999.00',
    },
    {
        id:num+=1,
        image:'football-shoes.jpg',
        name:'Donbest boys football boots',
        ratings:{
            stars:'ratings2.png',
            num:54
        },
        price:'Rs 6,233.00',
    },
    {
        id:num+=1,
        image:'Helmet.jpg',
        name:'Axor Helmet Special edition | Black',
        ratings:{
            stars:'ratings2.png',
            num:32
        },
        price:'Rs 6,499.00',
    },
    {
        id:num+=1,
        image:'Wilson.webp',
        name:'Wilson Tennis ball pack of 3',
        ratings:{
            stars:'ratings3.png',
            num:217
        },
        price:'Rs 447.00',
    }

];
let html=''
item.forEach((item)=>{
    html+=`<div class="items">
                <div class="product-image">
                    <img src="../Images/${item.image}" class="product-pic" >    
                </div>
                <div class="product-name">
                    <p>${item.name}</p>
                </div>
                <div class="product-rating">
                    <img src="../Images/${item.ratings.stars}" class="ratings-img">
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
        document.querySelectorAll('.success')[index].innerHTML=`<img src="../Images/checkmark.png" class="checkmark"> Added`;
      
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
        console.log(cart);
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
                    <img src="../Images/${item.image}" class="product-pic" >    
                </div>
                <div class="product-name">
                    <p>${item.name}</p>
                </div>
                <div class="product-rating">
                    <img src="../Images/${item.ratings.stars}" class="ratings-img">
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
             console.log('No')
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