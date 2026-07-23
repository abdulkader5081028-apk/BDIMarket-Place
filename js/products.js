import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const container = document.getElementById("products-container");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// ==========================
// CART FUNCTIONS
// ==========================

function addToCart(productId, product){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(item => item.id === productId);

if(existing){

existing.quantity++;

}else{

cart.push({

id: productId,
name: product.name,
price: Number(product.price),
image: product.image,
quantity: 1

});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

showToast("✅ Product Added To Cart");

}

function updateCartCount(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const total = cart.reduce((sum,item)=>sum+item.quantity,0);

const cartBtn = document.querySelector(".cart-btn");

if(cartBtn){

cartBtn.innerHTML = `🛒 Cart (${total})`;

}

}

function showToast(message){

const oldToast = document.querySelector(".toast-message");

if(oldToast){

oldToast.remove();

}

const toast = document.createElement("div");

toast.className = "toast-message";

toast.textContent = message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}


