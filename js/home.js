// ======================================================
// BDIMarket Place
// Home Page Script
// ======================================================

import { db } from "./firebase.js";

import {

collection,

query,

where,

orderBy,

limit,

getDocs

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================================================
// DOM
// ======================================================

const flashDealsContainer =
document.getElementById("flashDealsContainer");

const featuredProducts =
document.getElementById("featuredProducts");

const newArrivalProducts =
document.getElementById("newArrivalProducts");

const bestSellerProducts =
document.getElementById("bestSellerProducts");

// ======================================================
// Product Card
// ======================================================

function createProductCard(product){

return `

<div class="product-card">

<div class="product-image">

<img src="${product.images?.[0] || 'images/no-image.png'}">

<div class="discount-badge">

${product.discount || 0}% OFF

</div>

</div>

<div class="product-info">

<div class="product-category">

${product.category}

</div>

<h3 class="product-title">

${product.productName}

</h3>

<div class="retail-price">

৳${product.retailPrice}

</div>

<div class="wholesale-price">

Wholesale:

৳${product.wholesalePrice}

</div>

<div class="product-actions">

<button class="cart-btn">

Add to Cart

</button>

<button class="buy-btn">

Buy Now

</button>

</div>

</div>

</div>

`;

}
