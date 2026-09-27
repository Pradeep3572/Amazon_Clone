    import { placedOrder,presentDate} from "./cart-data.js";
    console.log(placedOrder);
    let retunsAndOrders=JSON.parse(localStorage.getItem('returnItems'))||[]
    retunsAndOrders.push(placedOrder);
    localStorage.setItem('returnItems',JSON.stringify(retunsAndOrders));
    console.log(retunsAndOrders);   
    function orderItems()
    {
        console.log(Math.random())
        const num = Math.floor(10000 + Math.random() * 90000);
        let html=`<div class="outer">

                        <div class="itemHeader">
                            <div class="orderplaced">
                                <strong>Order Placed:</strong>
                                <span>${presentDate}</span>
                            </div>

                            <div class="total">
                                <strong>Total:</strong>
                                <span>₹198.64</span>
                            </div>

                            <div class="orderid">
                                <strong>Order ID:</strong>
                                <span>${num}</span>
                            </div>
                        </div>
                        `;
       
        placedOrder.forEach((prod)=>{
            html+=`
                        <div class="placedItems">
                        <div class="img-cnt">
                            <img src="../images/${prod.image}">
                        </div> 
                        <div class="info">
                            <span>${prod.name} </span>
                            <span>Arriving on ${prod.deliveryDate} </span>
                            <span>Qty:${prod.qty} </span>
                            <button class="buy-again">
                            Buy it again
                            </button>
                        </div>
                        <div class="tracking">    
                            <button class="track">
                            Track package
                            </button>
                        </div>
                       </div>`

        });
         html += `</div>`;
         document.querySelector('.body').innerHTML=html;
    }
    orderItems();

const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log(xhr.response)
})
xhr.open('GET','https://supersimplebackend.dev/products')
xhr.send()

document.addEventListener('keydown',(event)=>{
    if(event.key==='F12'||event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==='i')
    {
        event.preventDefault();
    }
})