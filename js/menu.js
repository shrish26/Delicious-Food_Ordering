function init () {
    console.log ("In init funciton");
    cart =[];
}

function addToCartCofee () {
    document.getElementById("coffee").style.visibility = "hidden";
}

function addToCartTea () {
    value = document.getElementById("tea").innerText;
    console.log (value);
    localStorage.setItem("cart",value);
    console.log ("cart is :" + localStorage.getItem(cart));
}