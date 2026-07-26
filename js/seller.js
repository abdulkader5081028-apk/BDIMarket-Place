// =====================================
// BDIMarket Place
// seller.js - Part 1
// =====================================

import { db, auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// =====================================
// Elements
// =====================================

const sellerProducts =
document.getElementById("sellerProducts");

const totalProducts =
document.getElementById("totalProducts");

const totalOrders =
document.getElementById("totalOrders");

const totalRevenue =
document.getElementById("totalRevenue");

const pendingOrders =
document.getElementById("pendingOrders");

// =====================================
// Auth Check
// =====================================

onAuthStateChanged(auth, (user) => {

if (!user) {

window.location.href = "login.html";

return;

}

loadSellerProducts(user.email);

});
// =====================================
// Load Seller Products
// =====================================

async function loadSellerProducts(userEmail){

try{

const snapshot = await getDocs(
collection(db,"products")
);

let html = "";

let productCount = 0;

let revenue = 0;

snapshot.forEach((doc)=>{

const product = doc.data();

// শুধুমাত্র Logged-in Seller-এর Product

if(product.seller !== userEmail){

return;

}

productCount++;

revenue +=
(product.price || 0) *
(product.stock || 0);

html += `

<div class="product-card">

<img
src="${product.image || 'images/no-image.png'}"
alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">

$${product.price || 0}

</p>

<p>

Category:
${product.category || "-"}

</p>

<p>

Stock:
${product.stock || 0}

</p>

<div class="product-actions">

<a
href="product.html?id=${doc.id}"
class="btn btn-outline">

View

</a>

<a
href="upload.html?id=${doc.id}"
class="btn btn-primary">

Edit

</a>

<button
class="btn btn-danger"
onclick="deleteProduct('${doc.id}')">

Delete

</button>

</div>

</div>

</div>

`;

});

if(productCount===0){

sellerProducts.innerHTML=`

<div class="empty-state">

<h3>No Products Found</h3>

<p>

Upload your first product.

</p>

<a
href="upload.html"
class="btn btn-primary">

Upload Product

</a>

</div>

`;

}else{

sellerProducts.innerHTML = html;

}

totalProducts.textContent = productCount;

totalRevenue.textContent =
"$" + revenue.toFixed(2);

// আপাতত Order Data যোগ করা হয়নি

totalOrders.textContent = "0";

pendingOrders.textContent = "0";

}catch(error){

console.error(error);

sellerProducts.innerHTML =

"<p>Failed to load products.</p>";

}

}
// =====================================
// Delete Product
// =====================================

import {
doc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.deleteProduct = async function(productId){

const confirmDelete = confirm(
"Are you sure you want to delete this product?"
);

if(!confirmDelete){

return;

}

try{

await deleteDoc(
doc(db,"products",productId)
);

alert("✅ Product deleted successfully.");

const user = auth.currentUser;

if(user){

loadSellerProducts(user.email);

}

}catch(error){

console.error(error);

alert("❌ Failed to delete product.");

}

};

// =====================================
// Refresh Dashboard
// =====================================

window.addEventListener("focus",()=>{

const user = auth.currentUser;

if(user){

loadSellerProducts(user.email);

}

});

console.log("✅ Seller Dashboard Ready");
