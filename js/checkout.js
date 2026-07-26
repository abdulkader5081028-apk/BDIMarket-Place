// =====================================
// BDIMarket Place
// checkout.js - Part 1
// =====================================

import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// =====================================
// Elements
// =====================================

const checkoutItems =
document.getElementById("checkoutItems");

const checkoutTotal =
document.getElementById("checkoutTotal");

const checkoutForm =
document.getElementById("checkoutForm");

// =====================================
// Load Cart
// =====================================

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

// =====================================
// Render Checkout
// =====================================

function renderCheckout(){

if(cart.length===0){

checkoutItems.innerHTML=`

<p>Your cart is empty.</p>

`;

checkoutTotal.textContent="$0";

return;

}

let html="";

let total=0;

cart.forEach(item=>{

const price =
Number(String(item.price).replace(/[^\d.]/g,""))||0;

const qty=item.qty||1;

total+=price*qty;

html+=`

<div class="checkout-item">

<p>

<strong>${item.name}</strong>

</p>

<p>

${qty} × $${price}

</p>

</div>

`;

});

checkoutItems.innerHTML=html;

checkoutTotal.textContent="$"+total.toFixed(2);

}
// =====================================
// Place Order
// =====================================

checkoutForm?.addEventListener("submit", async (e) => {

e.preventDefault();

if(cart.length===0){

alert("Your cart is empty.");

return;

}

const order={

customerName:
document.getElementById("customerName").value,

customerEmail:
document.getElementById("customerEmail").value,

customerPhone:
document.getElementById("customerPhone").value,

customerAddress:
document.getElementById("customerAddress").value,

items:cart,

total:checkoutTotal.textContent,

status:"Pending",

createdAt:serverTimestamp()

};

try{

await addDoc(

collection(db,"orders"),

order

);

localStorage.removeItem("cart");

alert("✅ Order placed successfully!");

window.location.href="index.html";

}catch(error){

console.error(error);

alert("❌ Failed to place order.");

}

});

// =====================================
// Cart Counter
// =====================================

function updateCartCount(){

const count=document.getElementById("cartCount");

if(!count) return;

let totalQty=0;

cart.forEach(item=>{

totalQty+=item.qty||1;

});

count.textContent=totalQty;

}

// =====================================
// Start
// =====================================

renderCheckout();

updateCartCount();

console.log("✅ Checkout Ready");
