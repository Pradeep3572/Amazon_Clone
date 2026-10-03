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
    

let num=-1;
export let item=[
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