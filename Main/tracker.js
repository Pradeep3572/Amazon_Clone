import { getCartCount } from "./cart-data.js";
document.querySelector(".cart-value").innerHTML=getCartCount();
let item=JSON.parse(localStorage.getItem('tracker'));
console.log(item);
document.querySelector(".arrival").innerHTML=`Arriving on ${item.deliveryDate}`;
document.querySelector(".product-name-tracker").innerHTML=`${item.name}`;
document.querySelector(".quantity").innerHTML=`${item.qty}`;
document.querySelector(".prod-img").innerHTML=`<img class="trac-img" src="../Images/${item.image}">`;
document.querySelector(".quantity").innerHTML=`Quantity: ${item.qty}`;