// =====================================
// BDIMarket Place
// cart.js - Part 1
// =====================================

const cartContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

// LocalStorage থেকে Cart Load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================================
// Render Cart
// =====================================

function renderCart() {

if (cart.length === 0) {

cartContainer.innerHTML = `
<div class="empty-cart">
<h2>Your Cart is Empty</h2>
<p>Add some products to continue shopping.</p>
<a href="products.html" class="btn btn-primary">
Browse Products
</a>
</div>
`;

subtotalElement.textContent = "$0";
totalElement.textContent = "$0";

updateCartCount();

return;

}

let html = "";
let subtotal = 0;

cart.forEach((item, index) => {

const price = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;

const qty = item.qty || 1;

subtotal += price * qty;

html += `
<div class="cart-item">

<img src="${item.image}"
alt="${item.name}"
class="cart-image">

<div class="cart-info">

<h3>${item.name}</h3>

<p>$${price}</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">-</button>

<span>${qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>
`;

});

cartContainer.innerHTML = html;

subtotalElement.textContent = "$" + subtotal.toFixed(2);

totalElement.textContent = "$" + subtotal.toFixed(2);

updateCartCount();

}
// =====================================
// Increase Quantity
// =====================================

window.increaseQty = function(index){

cart[index].qty = (cart[index].qty || 1) + 1;

saveCart();

};

// =====================================
// Decrease Quantity
// =====================================

window.decreaseQty = function(index){

if((cart[index].qty || 1) > 1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

saveCart();

};

// =====================================
// Remove Item
// =====================================

window.removeItem = function(index){

if(confirm("Remove this product from cart?")){

cart.splice(index,1);

saveCart();

}

};

// =====================================
// Save Cart
// =====================================

function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

renderCart();

}

// =====================================
// Cart Counter
// =====================================

function updateCartCount(){

if(!cartCount) return;

let totalQty = 0;

cart.forEach(item=>{

totalQty += item.qty || 1;

});

cartCount.textContent = totalQty;

}

// =====================================
// Checkout Button
// =====================================

const checkoutBtn = document.querySelector(
'a[href="checkout.html"]'
);

if(checkoutBtn){

checkoutBtn.addEventListener("click",(e)=>{

if(cart.length===0){

e.preventDefault();

alert("🛒 Your cart is empty.");

return;

}

});

}

// =====================================
// Start
// =====================================

renderCart();

console.log("✅ Cart Loaded Successfully");
