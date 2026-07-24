// =====================================
// BDIMarket Place
// product.js (Version 1)
// =====================================

import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// =====================================
// HTML Elements
// =====================================

const productImage = document.getElementById("productImage");

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productCategory = document.getElementById("productCategory");

const productStock = document.getElementById("productStock");

const productDescription = document.getElementById("productDescription");

const sellerName = document.getElementById("sellerName");

const sellerCompany = document.getElementById("sellerCompany");

const sellerCountry = document.getElementById("sellerCountry");

const productBrand = document.getElementById("productBrand");

const productModel = document.getElementById("productModel");

const productOrigin = document.getElementById("productOrigin");

const minimumOrder = document.getElementById("minimumOrder");

const availability = document.getElementById("availability");

// =====================================
// Get Product ID
// =====================================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// =====================================
// Load Product
// =====================================

async function loadProduct(){

if(!productId){

productName.textContent = "Product Not Found";

return;

}

try{

const productRef = doc(db,"products",productId);

const productSnap = await getDoc(productRef);

if(!productSnap.exists()){

productName.textContent = "Product Not Found";

return;

}

const product = productSnap.data();

// ===============================
// Product Information
// ===============================

productImage.src =
product.image || "images/no-image.png";

productName.textContent =
product.name || "Unnamed Product";

productPrice.textContent =
`$${product.price || 0}`;

productCategory.textContent =
product.category || "General";

productStock.textContent =
product.stock || "Available";

productDescription.textContent =
product.description ||
"No description available.";

// ===============================
// Seller Information
// ===============================

sellerName.textContent =
product.sellerName || "Unknown Seller";

sellerCompany.textContent =
product.company || "BDIMarket Seller";

sellerCountry.textContent =
product.country || "Bangladesh";

// ===============================
// Specifications
// ===============================

productBrand.textContent =
product.brand || "-";

productModel.textContent =
product.model || "-";

productOrigin.textContent =
product.origin || "-";

minimumOrder.textContent =
product.minimumOrder || "1 Piece";

availability.textContent =
product.availability || "In Stock";

}catch(error){

console.error(error);

productName.textContent =
"Failed to load product.";

}

}
