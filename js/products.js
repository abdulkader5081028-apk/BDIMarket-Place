// =====================================
// BDIMarket Place
// products.js (Version 5)
// =====================================

import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ===============================
// HTML Elements
// ===============================

const productsContainer =
document.getElementById("products-container");

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const sortProducts =
document.getElementById("sortProducts");

// ===============================
// Global Product Array
// ===============================

let allProducts = [];

// ===============================
// Load Products
// ===============================

async function loadProducts(){

if(!productsContainer) return;

productsContainer.innerHTML = `

<div class="loading">

Loading Products...

</div>

`;

try{

const snapshot = await getDocs(
collection(db,"products")
);

allProducts = [];

snapshot.forEach((doc)=>{

allProducts.push({

id:doc.id,
...doc.data()

});

});

renderProducts(allProducts);

}catch(error){

console.error(error);

productsContainer.innerHTML = `

<div class="loading">

Failed to load products.

</div>

`;

}

}

// ===============================
// Start
// ===============================



// ===============================
// Render Products
// ===============================

function renderProducts(products){

if(!productsContainer) return;

if(products.length===0){

productsContainer.innerHTML=`

<div class="loading">

No products found.

</div>

`;

return;

}

productsContainer.innerHTML="";

products.forEach(product=>{

const card=document.createElement("div");

card.className="product-card";

card.innerHTML=`

<div class="product-image">

<img src="${product.image || 'images/no-image.png'}" alt="${product.name || 'Product'}">

</div>

<div class="product-info">

<h3 class="product-title">

${product.name || "Unnamed Product"}

</h3>

<p class="product-company">

${product.company || "BDIMarket Seller"}

</p>

<p class="product-price">

$${product.price || 0}

</p>

<div class="product-actions">

<button
class="product-btn add-cart-btn"
data-id="${product.id}">

🛒 Add to Cart

</button>

<a
href="product.html?id=${product.id}"
class="product-btn">

View Details

</a>

</div>

</div>

`;

productsContainer.appendChild(card);

});

attachCartEvents();

}

// ===============================
// Cart Button
// ===============================

function attachCartEvents(){

const buttons=document.querySelectorAll(".add-cart-btn");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const id=button.dataset.id;

addToCart(id);

});

});

}
// ===============================
// Add To Cart
// ===============================

function addToCart(productId){

const product = allProducts.find(

item => item.id === productId

);

if(!product) return;

let cart = JSON.parse(

localStorage.getItem("cart")

) || [];

const existing = cart.find(

item => item.id === productId

);

if(existing){

existing.quantity += 1;

}else{

cart.push({

id: product.id,

name: product.name,

price: product.price,

image: product.image || "",

quantity: 1

});

}

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

alert("✅ Product added to cart!");

}

// ===============================
// Search Products
// ===============================

function searchProducts(){

const keyword = searchInput.value

.trim()

.toLowerCase();

const filtered = allProducts.filter(product =>

(product.name || "")

.toLowerCase()

.includes(keyword)

);

renderProducts(filtered);

}

if(searchBtn){

searchBtn.addEventListener(

"click",

searchProducts

);

}

if(searchInput){

searchInput.addEventListener(

"keyup",

searchProducts

);

}

// ===============================
// Sort Products
// ===============================

if(sortProducts){

sortProducts.addEventListener(

"change",

()=>{

let products = [...allProducts];

switch(sortProducts.value){

case "low":

products.sort(

(a,b)=>

(a.price||0)-(b.price||0)

);

break;

case "high":

products.sort(

(a,b)=>

(b.price||0)-(a.price||0)

);

break;

case "name":

products.sort(

(a,b)=>

(a.name||"")

.localeCompare(b.name||"")

);

break;

default:

break;

}

renderProducts(products);

}

);

}

// ===============================
// Ready
// ===============================

document.addEventListener(

"DOMContentLoaded",

()=>{

loadProducts();

console.log("✅ Products Page Ready");

}

);
