// ======================================
// BDIMarket Place - seller.js
// Part 1
// ======================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================================
// HTML Elements
// ======================================

const productsContainer =
document.getElementById("sellerProducts");

const totalProducts =
document.getElementById("totalProducts");

// ======================================
// Current User
// ======================================

let currentUser = null;

// ======================================
// Check Login
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

    await loadSellerProducts();

});
// ======================================
// Load Seller Products
// ======================================

async function loadSellerProducts() {

    productsContainer.innerHTML = `
        <div class="loading">
            Loading Products...
        </div>
    `;

    try {

        const q = query(
            collection(db, "products"),
            where("sellerId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(q);

        totalProducts.textContent = snapshot.size;

        if (snapshot.empty) {

            productsContainer.innerHTML = `
                <div class="empty-products">
                    <h2>No Products Found</h2>
                    <p>Upload your first product.</p>
                </div>
            `;

            return;

        }

        renderProducts(snapshot);

    }

    catch (error) {

        console.error(error);

        productsContainer.innerHTML = `
            <div class="error-message">
                Failed to load products.
            </div>
        `;

    }

}
// ======================================
// Render Seller Products
// ======================================

function renderProducts(snapshot) {

    let html = "";

    snapshot.forEach((docSnap) => {

        const product = docSnap.data();

        html += `

<div class="product-card">

    <div class="product-image">

        <img src="${product.image}" alt="${product.name}">

    </div>

    <div class="product-info">

        <h3>${product.name}</h3>

        <p><strong>Price:</strong> $${product.price}</p>

        <p><strong>Category:</strong> ${product.category}</p>

        <p><strong>Stock:</strong> ${product.stock}</p>

        <div class="product-actions">

            <a
                href="product.html?id=${docSnap.id}"
                class="product-btn">

                View

            </a>

            <button
                class="delete-btn"
                data-id="${docSnap.id}">

                🗑 Delete

            </button>

        </div>

    </div>

</div>

`;

    });

    productsContainer.innerHTML = html;

}
// ======================================
// Delete Product
// ======================================

import {
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn")) return;

    const productId = e.target.dataset.id;

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(doc(db, "products", productId));

        alert("✅ Product deleted successfully.");

        await loadSellerProducts();

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to delete product.");

    }

});

// ======================================
// Ready
// ======================================

console.log("✅ seller.js loaded successfully");
