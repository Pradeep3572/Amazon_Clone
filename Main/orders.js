    import { placedOrder,item,cart,getCartCount} from "./cart-data.js";
    let num=JSON.parse(localStorage.getItem('uuid'))||[];
    for(let i=num.length;i<placedOrder.length;i++)
    {
        num.push(crypto.randomUUID());
        localStorage.setItem('uuid',JSON.stringify(num));
    }
    num.reverse()

    if(placedOrder.length===0)
    {
        document.querySelector(".body1").innerHTML=`<h1 style="color:red;font-size:20px">No Orders Placed</h1>`
    }

    function orderItems()
    {
        let finalBills =JSON.parse(localStorage.getItem('Final Bills')) || [];
        finalBills.reverse();
       [...placedOrder].reverse().forEach((order,index)=>{
        console.log("ORDER:", order);
        console.log("ITEMS:", order.items);
        const orderDateTime = dayjs(order.orderDateTime);
        const orderDate = orderDateTime.format("MMMM D");
        const orderTime = orderDateTime.format("h:mm A");
        let total=finalBills[index];
            let html=`<div class="outer">
                        <div class="itemHeader">
                            <div class="orderplaced">
                                <strong>Order Placed:</strong>
                                <span class="orderPlaced" data-order="${order.orderDateTime}">${orderDate}</span>
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
            order.items.forEach(item=>{
                html+=`
                        <div class="placedItems" data-id="${item.id}">
                        <div class="img-cnt">
                            <img class="img" src="../Images/${item.image}">
                        </div> 
                        <div class="info">
                            <span class="name">${item.name} </span>
                            <span class="date">Arriving on ${item.deliveryDate} </span>
                            <span class="qty">Qty:${item.qty} </span>
                            <a href="cart.html" target="_self"> 
                            <button class="buy-again">
                            Buy it again
                            </button>
                            </a>
                        </div>
                        <div class="tracking">   
                            <a href="./tracker.html">
                                <button class="track">
                                Track package
                                </button>
                            </a>
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
    
console.log(placedOrder);

let tracker = JSON.parse(localStorage.getItem('tracker')) || {};

document.querySelectorAll(".track").forEach((button) => {
    button.addEventListener('click', (event) => {

        let placed = event.target.closest(".placedItems");
        let id = Number(placed.dataset.id);

        let order = placed.closest(".outer");

        let orderDateTime =
            order.querySelector(".orderPlaced").dataset.order;

        let date =
            placed.querySelector(".date").textContent
                .replace("Arriving on ", "")
                .trim();

        placedOrder.forEach((outer) => {

            outer.items.forEach((inner) => {

                if (
                    inner.id === id &&
                    inner.deliveryDate === date
                ) {
                    tracker = {
                        ...inner,
                        orderDateTime: orderDateTime
                    };

                    localStorage.setItem(
                        'tracker',
                        JSON.stringify(tracker)
                    );

                    console.log(tracker);
                }

            });

        });
    });
});
console.log(tracker)
document.querySelector(".cart-value").textContent=getCartCount();