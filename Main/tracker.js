import { getCartCount } from "./cart-data.js";
document.querySelector(".cart-value").innerHTML=getCartCount();
let item=JSON.parse(localStorage.getItem('tracker'));
console.log(item);
document.querySelector(".arrival").innerHTML=`Arriving on ${item.deliveryDate}`;
document.querySelector(".product-name-tracker").innerHTML=`${item.name}`;
document.querySelector(".quantity").innerHTML=`${item.qty}`;
document.querySelector(".prod-img").innerHTML=`<img class="trac-img" src="../Images/${item.image}">`;
document.querySelector(".quantity").innerHTML=`Quantity: ${item.qty}`;
const currentYear = dayjs().year();

let deliveryDate = item.deliveryDate.split(", ");

const order = dayjs(
    `${item.orderDate} ${currentYear}`,
    "MMMM D YYYY"
);

const delivery = dayjs(
    `${deliveryDate[1]} ${currentYear}`,
    "MMMM D YYYY"
);

const today = dayjs();

const totalDays = delivery.diff(order, "day");
const elapsedDays = today.diff(order, "day");

// Keep progress between 0 and 100
const progress = Math.min(
    100,
    Math.max(0, (elapsedDays / totalDays) * 100)
);

console.log("Total days:", totalDays);
console.log("Elapsed days:", elapsedDays);
console.log("Progress:", progress);

document.querySelector(".progress").style.width = `${progress}%`;

if (progress <= 33) {
    document.querySelector(".stage1").style.color = "blue";
}
else if (progress <= 66) {
    document.querySelector(".stage1").style.color = "blue";
    document.querySelector(".stage2").style.color = "blue";
}
else {
    document.querySelector(".stage1").style.color = "blue";
    document.querySelector(".stage2").style.color = "blue";
    document.querySelector(".stage3").style.color = "blue";
}