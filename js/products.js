import { db } from "./firebase.js";

import {

collection,

getDocs,

query,

orderBy

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const container = document.getElementById("products-container");

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
snapshot.forEach((docSnap)=>{

const product=docSnap.data();

container.innerHTML+=`

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

<a href="#"

class="cart-small-btn">

🛒

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
