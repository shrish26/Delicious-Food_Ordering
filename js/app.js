const dishesEl = document.querySelector(".menu .box-container");
const cartItemsEl = document.querySelector(".cart .box-container");
const subtotalEl = document.querySelector(".subtotal");

function renderDishes(){
    dishes.forEach(dish => {
        dishesEl.innerHTML +=`
        <div class="box">
            <div class="image">
                <img src="${dish.imgSrc}" alt="${dish.imgSrc}">
                <a href="#" class="fas fa-heart"></a>
            </div>
            <div class="content">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h3>${dish.name}</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
                <a href="#cart" class="btn" onclick = "addToCart(${dish.id})">add to cart</a>
                <span class="price">₹${dish.price}</span>
            </div>
        </div>
    `
    });
}

renderDishes();
// array
let cart = [];

// add to cart
function addToCart(id){

    if(cart.some((item) => item.id === id)){
        onChangeQuantity("plus",id);
        // alert("Dish is already in cart");
    }else{
        const item = dishes.find((dish) => dish.id === id);
        cart.push({...item,quantity:1});
    }

    updateCart();
}
// Update cart

function updateCart(){
    renderCartitems();
    renderSubtotal();
}

//calculate and render total
function renderSubtotal(){
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems = totalItems + item.quantity;
    });

    subtotalEl.innerHTML = `
    Subtotal (${totalItems} item): ₹${totalPrice}`;

}

function renderPaymentMessage () {
    let orderId=0;
    orderId= parseInt (localStorage.getItem("maxOrderId"))+2;
    subtotalEl.innerHTML += `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Your Payment is successful!</strong> 
        <strong>Your Payment id is: ${orderId}</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>        
        `
    localStorage.setItem("maxOrderId",orderId);
}

function renderCartitems(){
        cartItemsEl.innerHTML = ""; //clear
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="box">
            <div class="image">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>₹</small>${item.price}
            </div>
            
            <div class="units">
                <div class="btn minus" onclick= "onChangeQuantity('minus',${item.id})">-</div>
                <div class="number">${item.quantity}</div>
                <div class="btn plus" onclick= "onChangeQuantity('plus',${item.id})">+</div>
            </div>
        </div>
    `
   
    })
}

function onChangeQuantity (operator, id) {
    cart = cart.map((item) => {

        let quantity = item.quantity;

        if(item.id === id) {
            if(operator === "minus" && quantity > 1){
                quantity--;
            }else if(operator === "plus"){
                quantity++;
            }
        }

    return {
        ...item,
        quantity,
    };    
});

updateCart();
}

