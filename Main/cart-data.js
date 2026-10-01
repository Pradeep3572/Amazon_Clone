    export let cart =
        JSON.parse(localStorage.getItem('cart-items')) || [];

    export function getCartCount() {
        return cart.reduce((total, product) => {
            return total + product.qty;
        }, 0);
    }

    export let placedOrder =
        JSON.parse(localStorage.getItem('placed-order')) || [];

    export let presentDate = JSON.parse(localStorage.getItem('date'));
    
    export function saveOrder() 
    {
    presentDate = dayjs().format('MMMM D');

    const newOrder = structuredClone(cart);

    placedOrder.push(newOrder);

    localStorage.setItem(
        'placed-order',
        JSON.stringify(placedOrder)
    );

    localStorage.setItem(
        'date',
        JSON.stringify(presentDate)
    );

    cart.length = 0;

    localStorage.setItem(
        'cart-items',
        JSON.stringify(cart)
    );

    return newOrder;
}
    