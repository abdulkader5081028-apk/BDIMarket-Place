import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const container = document.getElementById("product-details");

async function loadProduct(){

container.innerHTML = `

<div class="loading">

Loading Product...

</div>

`;

if(!productId){

container.innerHTML = `

<div class="error-message">

<h2>

Product Not Found

</h2>

</div>

`;

return;

}

try{

const docRef = doc(db,"products",productId);

const docSnap = await getDoc(docRef);

if(!docSnap.exists()){

container.innerHTML = `

<div class="error-message">

<h2>

Product Not Found

</h2>

</div>

`;

return;

}

const product = docSnap.data();
container.innerHTML = `

<div class="product-details-card">

<div class="product-details-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-details-info">

<h1>

${product.name}

</h1>

<div class="product-rating">

⭐⭐⭐⭐⭐

<span>(4.8)</span>

</div>

<h2>

$${product.price}

</h2>

<p>

<strong>Company:</strong>

${product.company || "Unknown"}

</p>

<p>

<strong>Brand:</strong>

${product.brand || "Unknown"}

</p>

<p>

<strong>Seller:</strong>

${product.seller || "Unknown"}

</p>

<p>

<strong>Country:</strong>

${product.country || "-"}

</p>

<p>

<strong>City:</strong>

${product.city || "-"}

</p>

<p>

<strong>MOQ:</strong>

${product.moq || "1"}

</p>

<p>

<strong>Stock:</strong>

${product.stock || "Available"}

</p>

<p>

<strong>Shipping:</strong>

${product.shipping || "-"}

</p>

<p>

<strong>Delivery:</strong>

${product.delivery || "-"}

</p>

<hr>

<h3>

Description

</h3>

<p>

${product.description || "No description available."}

</p>

<div class="product-actions">

<button
class="product-btn"
id="add-cart-btn">

🛒 Add To Cart

</button>

<a
href="products_new.html"
class="product-btn">

⬅ Back

</a>

</div>

</div>

</div>

`;
// ==========================
// ADD TO CART
// ==========================

document.getElementById("add-cart-btn").addEventListener("click",()=>{

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(item=>item.id===productId);

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

localStorage.setItem("cart",JSON.stringify(cart));

alert("✅ Product Added To Cart");

});

}catch(error){

console.error(error);

container.innerHTML = `

<div class="error-message">

<h2>

❌ Failed To Load Product

</h2>

<p>

Please try again later.

</p>

</div>

`;

}

}

loadProduct();
