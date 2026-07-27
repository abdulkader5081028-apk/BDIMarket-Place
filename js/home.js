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
// ======================================================
// Flash Deals
// ======================================================

async function loadFlashDeals() {

    try {

        const q = query(
            collection(db, "products"),
            where("flashDeal", "==", true),
            limit(8)
        );

        const snapshot = await getDocs(q);

        flashDealsContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            flashDealsContainer.innerHTML +=
                createProductCard(doc.data());

        });

    } catch (error) {

        console.error("Flash Deals Error:", error);

        flashDealsContainer.innerHTML =
            "<div class='loading'>Unable to load Flash Deals.</div>";

    }

}

// ======================================================
// Featured Products
// ======================================================

async function loadFeaturedProducts() {

    try {

        const q = query(
            collection(db, "products"),
            where("featured", "==", true),
            limit(8)
        );

        const snapshot = await getDocs(q);

        featuredProducts.innerHTML = "";

        snapshot.forEach((doc) => {

            featuredProducts.innerHTML +=
                createProductCard(doc.data());

        });

    } catch (error) {

        console.error(error);

        featuredProducts.innerHTML =
            "<div class='loading'>Unable to load products.</div>";

    }

}

// ======================================================
// New Arrivals
// ======================================================

async function loadNewArrivals() {

    try {

        const q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc"),
            limit(8)
        );

        const snapshot = await getDocs(q);

        newArrivalProducts.innerHTML = "";

        snapshot.forEach((doc) => {

            newArrivalProducts.innerHTML +=
                createProductCard(doc.data());

        });

    } catch (error) {

        console.error(error);

        newArrivalProducts.innerHTML =
            "<div class='loading'>Unable to load new products.</div>";

    }

}

// ======================================================
// Best Sellers
// ======================================================

async function loadBestSellers() {

    try {

        const q = query(
            collection(db, "products"),
            where("bestSeller", "==", true),
            limit(8)
        );

        const snapshot = await getDocs(q);

        bestSellerProducts.innerHTML = "";

        snapshot.forEach((doc) => {

            bestSellerProducts.innerHTML +=
                createProductCard(doc.data());

        });

    } catch (error) {

        console.error(error);

        bestSellerProducts.innerHTML =
            "<div class='loading'>Unable to load best sellers.</div>";

    }

}
// ======================================================
// Marketplace Statistics
// ======================================================

async function loadMarketplaceStats() {

    try {

        const productSnapshot = await getDocs(
            collection(db, "products")
        );

        const userSnapshot = await getDocs(
            collection(db, "users")
        );

        const orderSnapshot = await getDocs(
            collection(db, "orders")
        );

        const totalProducts =
            document.getElementById("totalProducts");

        const totalSuppliers =
            document.getElementById("totalSuppliers");

        const totalOrders =
            document.getElementById("totalOrders");

        const totalCustomers =
            document.getElementById("totalCustomers");

        if (totalProducts)
            totalProducts.textContent =
                productSnapshot.size;

        if (totalSuppliers)
            totalSuppliers.textContent =
                userSnapshot.size;

        if (totalOrders)
            totalOrders.textContent =
                orderSnapshot.size;

        if (totalCustomers)
            totalCustomers.textContent =
                userSnapshot.size;

    }

    catch (error) {

        console.error(
            "Marketplace Stats Error:",
            error
        );

    }

}

// ======================================================
// Initialize Home Page
// ======================================================

async function initializeHomePage() {

    await Promise.all([

        loadFlashDeals(),

        loadFeaturedProducts(),

        loadNewArrivals(),

        loadBestSellers(),

        loadMarketplaceStats()

    ]);

}

// ======================================================
// Page Load
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeHomePage();

});
