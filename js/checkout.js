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
