    import { placedOrder,presentDate,item,cart} from "./cart-data.js";
    console.log(placedOrder);
    let num=JSON.parse(localStorage.getItem('uuid'))||[];
    for(let i=num.length;i<placedOrder.length;i++)
    {
        num.push(crypto.randomUUID());
        localStorage.setItem('uuid',JSON.stringify(num));
    }
    function orderItems()
    {
        const finalBills =JSON.parse(localStorage.getItem('Final Bills')) || [];
        console.log(finalBills);
        placedOrder.forEach((order,index)=>{
        
        let total=finalBills[index];
            let html=`<div class="outer">
                        <div class="itemHeader">
                            <div class="orderplaced">
                                <strong>Order Placed:</strong>
                                <span>${presentDate}</span>
                            </div>

                            <div class="total">
                                <strong>Total:</strong>
                                <span>₹${total}</span>
                            </div>

                            <div class="orderid">
                                <strong>Order ID:</strong>
                                <span>${num[index]}</span>
                            </div>
                        </div>
                        `;
            order.forEach(item=>{
                html+=`
                        <div class="placedItems" data-id="${item.id}">
                        <div class="img-cnt">
                            <img src="../Images/${item.image}">
                        </div> 
                        <div class="info">
                            <span>${item.name} </span>
                            <span>Arriving on ${item.deliveryDate} </span>
                            <span>Qty:${item.qty} </span>
                            <a href="cart.html" target="_self"> 
                            <button class="buy-again">
                            Buy it again
                            </button>
                            </a>
                        </div>
                        <div class="tracking">   
                            <button class="track">
                            Track package
                            </button>
                        </div>
                       </div>`

            });
             html += `</div>`;
         document.querySelector('.body').innerHTML+=html;
        });
    }
orderItems();
/*
const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log(xhr.response)
})
xhr.open('GET','https://supersimplebackend.dev/products')
xhr.send()
*/

document.addEventListener('keydown',(event)=>{
    if(event.key==='F12'||event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==='i')
    {
        event.preventDefault();
    }
})

let element=JSON.parse(localStorage.getItem('again'))||[];
    document.querySelectorAll('.buy-again').forEach((button)=>{
        button.addEventListener('click',(event)=>{
        let id=event.target.closest(".placedItems").dataset.id;
        item.forEach((item)=>{
            if(item.id===Number(id))
            {
                element=item;
                localStorage.setItem('again',JSON.stringify(element));
                return;
            }
        })
let found=true;
        cart.forEach((item)=>{
            if(item.id===element.id)
            {
                item.qty+=1;
                found=false;
            }
        })
            if(found)
            {
                cart.push({
                id:element.id,
                name:element.name,
                price:element.price,
                image:element.image,
                qty:1
                })
            }
            localStorage.setItem('cart-items',JSON.stringify(cart));
        })
        
    })
    
