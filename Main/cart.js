    import {cart,presentDate,saveOrder,placedOrder} from "./cart-data.js"
    let html='';
    let shippingCost=JSON.parse(localStorage.getItem('shipping-cost'))||0;
    let currDate=dayjs();
    let ship2days=currDate.add(2,'days')
    let ship1days=currDate.add(1,'days');
    let free=currDate.add(5,'days');
    let freeshipping=free.format('dddd, MMMM D')
    let ship100=ship2days.format('dddd, MMMM D');
    let ship200=ship1days.format('dddd, MMMM D');
    let finalbill=JSON.parse(localStorage.getItem('Final Bill'))||0;

    function deliveryDate(savedDelivery)
            {
            if(savedDelivery==='0.00'||savedDelivery===null)
            {
                return freeshipping;
            }
            else if(savedDelivery==='100.00')
            {
                return ship100;
            }
            else if(savedDelivery==='200.00')
            {
                return ship200;
            }
            }
    function cartPage(cart)
    {
        html='';
        cart.forEach((prod)=>
        {
            const savedDelivery = localStorage.getItem(`delivery-${prod.id}`);  
        
            html+=
            `<div class="cart-item">

        <div class="delivery-date">

        </div>

        <div class="cart-item-content">

            <!-- PRODUCT -->
            <div class="cart-product">

                <div class="cart-image">
                    <img src="../Images/${prod.image}">
                </div>

                <div class="cart-product-details">

                    <div class="cart-product-name">
                        ${prod.name}
                    </div>

                    <div class="cart-product-price">
                        ${prod.price}
                    </div>

                    <div class="cart-product-quantity">

                        Quantity:
                        <span>${prod.qty}</span>

                        <button
                            class="update-button"
                            data-id="${prod.id}">
                            Update
                        </button>



                        <button
                            class="delete-button"
                            data-id="${prod.id}">
                            Delete
                        </button>

                    </div>

                </div>

            </div>


            <!-- DELIVERY OPTIONS -->
            <div class="delivery-options">

                <div class="delivery-title">
                    Choose a delivery option:
                </div>


                <label class="delivery-option">

                    <input
                        type="radio"
                        name="delivery-${prod.id}"
                        value="0.00"
                        ${savedDelivery==='0.00'||savedDelivery===null?'checked':''}
                    >

                    <div>

                        <div class="delivery-date-option">
                            ${freeshipping}
                        </div>

                        <div class="delivery-price">
                            FREE Shipping
                        </div>

                    </div>

                </label>


                <label class="delivery-option">

                    <input
                        type="radio"
                        name="delivery-${prod.id}"
                        value="100.00"
                        ${savedDelivery==='100.00'?'checked':''}
                    >

                    <div>

                        <div class="delivery-date-option">
                            ${ship100}
                        </div>

                        <div class="delivery-price">
                            ₹100.00 - Shipping
                        </div>

                    </div>

                </label>


                <label class="delivery-option">

                    <input
                        type="radio"
                        name="delivery-${prod.id}"
                        value="200.00"
                        ${savedDelivery==='200.00'?'checked':''}

                    >

                    <div>

                        <div class="delivery-date-option">
                            ${ship200}
                        </div>

                        <div class="delivery-price">
                            ₹ 200.00 - Shipping
                        </div>

                    </div>

                </label>

            </div>

        </div>

    </div>    
            `
        })
        document.querySelector('.cart-main').innerHTML=html;
    }

    cartPage(cart);



    function orderSummary()
    {
        if (cart.length===0)
        {
            return
        }
        let cartCost=0;
        let beforeTax=0;
        let cartItems=0
        cart.forEach((count)=>{
            cartItems+=count.qty;
            let price=Number(count.price.replace("Rs","").replace(',',""));
            cartCost +=(price * count.qty);
        })
        beforeTax=shippingCost+cartCost
        document.querySelector(".cart-items").innerHTML=`Items (${cartItems}):`;
        document.querySelector(".cart-cost").innerHTML=
        `₹ ${cartCost.toFixed(2)}`;
        document.querySelector(".cart-shipping").innerHTML=
        `₹ ${shippingCost.toFixed(2)}`;
        document.querySelector(".cart-before-tax").innerHTML=
        `₹ ${(beforeTax).toFixed(2)}`;
        document.querySelector(".cart-estimated-tax").innerHTML=
        `₹ ${(beforeTax*0.1).toFixed(2)}`;
        finalbill=(beforeTax+beforeTax*0.1).toFixed(2);
        localStorage.setItem('Final Bill',JSON.stringify(finalbill));
        document.querySelector(".cart-total").innerHTML=
        `₹ ${(JSON.parse(localStorage.getItem('Final Bill')))}`;
        document.querySelector(".checkout-count").innerHTML=`${cartItems} Items`;
    }   

    orderSummary();


    function deliveryPrice() {
        shippingCost = 0;

        cart.forEach((prod) => {
            const selected = document.querySelector(
                `input[name="delivery-${prod.id}"]:checked`
            );
            selected ? shippingCost += Number(selected.value) :0;
        });
        document.querySelector('.cart-shipping').innerHTML=`₹ ${shippingCost}`; 
        localStorage.setItem('shipping-cost',JSON.stringify(shippingCost));
        orderSummary();
        
    }
    

    function deleteCart()
    {
        document.querySelectorAll('.delete-button').forEach((button)=>{
            button.addEventListener('click',()=>
            {
                let id=button.dataset.id;
                const index = cart.findIndex((prod) => prod.id == id);
                if(index!==-1)
                {
                cart.splice(index,1);
                localStorage.removeItem(`delivery-${id}`);
                }
                localStorage.setItem('cart-items',JSON.stringify(cart));
                cartPage(cart);
                deliveryPrice();
                initializeCartButtons();
            }) 
        })
    }

    deleteCart();  

    function updateDelivery(radio) {

        const prodid = Number(radio.name.replace("delivery-", ""));

        // Save selected delivery option
        localStorage.setItem(`delivery-${prodid}`, radio.value);

        // Find product in cart
        const product = cart.find((prod) => prod.id === prodid);

        if (product) {
            // Add/update delivery date directly in cart
            product.deliveryDate = deliveryDate(radio.value);

            // Save updated cart
            localStorage.setItem(
                'cart-items',
                JSON.stringify(cart)
            );
        }

        // Display delivery date
        const cartItem = radio.closest('.cart-item');

        cartItem.querySelector('.delivery-date').innerHTML =
            `Delivery Date: ${deliveryDate(radio.value)}`;

        deliveryPrice();
    }

    function radioListener(){
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        if(radio.checked)
        {
            updateDelivery(radio);
        }
        radio.addEventListener('change', ()=>
        {
        updateDelivery(radio);
    });
    });
    }
    radioListener();



    function updateButton()
    {
        document.querySelectorAll(".update-button").
        forEach((button)=>{
            button.addEventListener('click',()=>{
                const id=Number(button.dataset.id);
                let cartItem=cart.find((item)=>{return item.id===id})
                let found=true;
                while(found)
                {                
                let quantityNumber=prompt(`Enter the Quantity of ${cartItem.name}`);
                if (quantityNumber === null) {
                    found = false;
                }
                else{
                let quantity=Number(quantityNumber);

                if(quantity>0 &&  Number.isInteger(quantity))
                {
                    cartItem.qty=Number(quantity);
                    localStorage.setItem('cart-items',JSON.stringify(cart));
                    found=false;
                }
                
                else
                {
                    alert("Quantity cannot be 0 or less thn 0")
                }
            }
                }
                cartPage(cart);
                initializeCartButtons();
                
            })
        })
    }
    function initializeCartButtons() {
        radioListener();
        deleteCart();
        updateButton();
    }
    updateButton();

    function placeOrder() {

    document.querySelector(".place-order").addEventListener('click', () => {

        const finalBill =
            JSON.parse(localStorage.getItem('Final Bill'));


        let bill =
            JSON.parse(localStorage.getItem('Final Bills')) || [];


        bill.push(finalBill);


        localStorage.setItem(
            'Final Bills',
            JSON.stringify(bill)
        );

        const newOrder = saveOrder();

        cart.forEach((prod) => {
            localStorage.removeItem(`delivery-${prod.id}`);
        });

        shippingCost = 0;
        localStorage.removeItem('shipping-cost');

    
    });
}

    placeOrder();
    if(!cart.length>0)
    {
        document.querySelector('.cart-main').innerHTML = `
                <div class="message">
                    Your cart is Empty
                </div>

                <a href="../index.html" target="_self">
                    <button class="view">
                        View Products
                    </button>
                </a>
            `;
        document.querySelector('.place-order').disabled = true;
    }
    else{
        document.querySelector('.place-order').disabled = false;
    }
