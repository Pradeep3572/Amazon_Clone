import { getCartCount } from "./cart-data.js";
document.querySelector(".cart-value").innerHTML = getCartCount();
let item = JSON.parse(localStorage.getItem("tracker"));
console.log(item);
if (!item) {
    document.querySelector(".product-name-tracker").innerHTML =
        "No product selected";
    throw new Error("No tracker item found");
}
document.querySelector(".arrival").innerHTML =
    `Arriving on ${item.deliveryDate}`;
document.querySelector(".product-name-tracker").innerHTML =
    item.name;
document.querySelector(".quantity").innerHTML =
    `Quantity: ${item.qty}`;
document.querySelector(".prod-img").innerHTML =
    `<img class="trac-img" src="../Images/${item.image}">`;
const order = dayjs(item.orderDateTime);
const deliveryDate = item.deliveryDate.split(", ")[1];
let deliveryYear = order.year();
const deliveryMonthDay = dayjs(
    `${deliveryDate} ${deliveryYear}`,
    "MMMM D YYYY"
);
if (deliveryMonthDay.isBefore(order, "day")) {
    deliveryYear++;
}
const delivery = dayjs(
    `${deliveryDate} ${deliveryYear} 00:00`,
    "MMMM D YYYY HH:mm"
);
const now = dayjs();
const totalMinutes = delivery.diff(order, "minute");
const elapsedMinutes = now.diff(order, "minute");
let progress =
    (elapsedMinutes / totalMinutes) * 100;
progress = Math.min(
    100,
    Math.max(0, progress)
);

const property =
    document.querySelector(".progress1");

property.value = progress;
if (progress <= 33) {
    document.querySelector(".stage1").style.color ="blue";

}
else if (progress <= 66) {

    document.querySelector(".stage1").style.color ="blue";
    document.querySelector(".stage2").style.color ="blue";

}
else {

    document.querySelector(".stage1").style.color ="blue";
    document.querySelector(".stage2").style.color ="blue";
    document.querySelector(".stage3").style.color ="blue";
}