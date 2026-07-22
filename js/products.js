import { db } from "./firebase.js";

import {

collection,

getDocs,

query,

orderBy

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const container = document.getElementById("products-container");

// =========================
// CART FUNCTIONS
// =========================

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

alert("✅ Product Added To Cart");

}
async function loadProducts(){

container.innerHTML=`

<div class="loading">

Loading Products...

</div>

`;

try{

const q=query(

collection(db,"products"),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

container.innerHTML="";

if(snapshot.empty){

container.innerHTML=`

<h2 class="error-message">

No Products Found

</h2>

`;

return;

}
let productsHTML = "";
  snapshot.forEach(docSnap)  container.innerHTML = productsHTML;

document.querySelectorAll(".add-cart-btn").forEach(button=>{

button.addEventListener("click",()=>{

const id = button.dataset.id;

const docData = snapshot.docs.find(d=>d.id===id);

const product = docData.data();

addToCart(id, product);

});

});
=>{
const product=docSnap.data();

productsHTML +=`

<div class="product-card">

<div class="discount-badge">

NEW

</div>

<div class="wishlist-btn">

❤

</div>

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3 class="product-title">

${product.name}

</h3>

<div class="product-rating">

⭐⭐⭐⭐⭐

<span class="rating-count">

(4.8)

</span>

</div>

<p class="product-price">

$${product.price}

</p>

<p class="product-company">

🏢 ${product.company || "Unknown Company"}

</p>

<p class="product-country">

🌍 ${product.country || "Unknown Country"}

</p>

<p>

MOQ: ${product.moq || 1}

</p>

<div class="product-actions">

<a href="product.html?id=${docSnap.id}"

class="product-btn">

View Details

</a>

<button
class="cart-small-btn"
onclick='addToCart("${docSnap.id}", ${JSON.stringify(product)})'>

🛒

</button>

</a>

</div>

</div>

</div>

`;

});
  
}catch(error){

console.error("Error Loading Products:",error);

container.innerHTML=`

<div class="error-message">

<h2>

❌ Failed to Load Products

</h2>

<p>

Please try again later.

</p>

</div>

`;

}

}

loadProducts();
