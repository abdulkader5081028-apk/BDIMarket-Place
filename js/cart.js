// ======================================
// BDIMarket Place - cart.js
// Part 1
// ======================================

import { auth, db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// ======================================
// HTML Elements
// ======================================

const cartContainer =
document.getElementById("cartContainer");

const emptyCart =
document.getElementById("emptyCart");

const totalItems =
document.getElementById("totalItems");

const subtotalPrice =
document.getElementById("subtotalPrice");

const shippingPrice =
document.getElementById("shippingPrice");

const totalPrice =
document.getElementById("totalPrice");

const checkoutBtn =
document.getElementById("checkoutBtn");

const clearCartBtn =
document.getElementById("clearCart");

// ======================================
// Current User
// ======================================

let currentUser = null;

// ======================================
// Auth State
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        cartContainer.innerHTML = `
            <div class="error-message">
                <h2>Please Login First</h2>
            </div>
        `;

        return;

    }

    currentUser = user;

    await loadCart();

});

// ======================================
// Load Cart
// ======================================

async function loadCart() {

    cartContainer.innerHTML = `
        <div class="loading">
            Loading Cart...
        </div>
    `;

    const q = query(
        collection(db, "cart"),
        where("userId", "==", currentUser.uid)
    );

    const snapshot = await getDocs(q);

    renderCart(snapshot);

}
// ======================================
// Render Cart
// ======================================

function renderCart(snapshot) {

    if (snapshot.empty) {

        cartContainer.innerHTML = "";

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        totalItems.textContent = "0";
        subtotalPrice.textContent = "$0.00";
        shippingPrice.textContent = "$0.00";
        totalPrice.textContent = "$0.00";

        return;

    }

    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    let html = "";

    let total = 0;

    let items = 0;

    snapshot.forEach((docSnap) => {

        const item = docSnap.data();

        const quantity = Number(item.quantity || 1);

        const price = Number(item.price || 0);

        total += price * quantity;

        items += quantity;

        html += `

<div class="cart-item">

    <div class="cart-image">

        <img src="${item.image}" alt="${item.name}">

    </div>

    <div class="cart-info">

        <h3>${item.name}</h3>

        <p>Price: $${price}</p>

        <p>Quantity: ${quantity}</p>

    </div>

    <div class="cart-actions">

        <button
            class="remove-cart"
            data-id="${docSnap.id}">

            🗑 Remove

        </button>

    </div>

</div>

`;

    });

    cartContainer.innerHTML = html;

    totalItems.textContent = items;

    subtotalPrice.textContent =
        "$" + total.toFixed(2);

    shippingPrice.textContent = "$0.00";

    totalPrice.textContent =
        "$" + total.toFixed(2);

}
// ======================================
// Remove From Cart
// ======================================

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("remove-cart")) return;

    const cartId = e.target.dataset.id;

    const confirmDelete = confirm(
        "Remove this product from cart?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(doc(db, "cart", cartId));

        await loadCart();

    }

    catch (error) {

        console.error(error);

        alert("Failed to remove product.");

    }

});

// ======================================
// Clear Cart
// ======================================

if (clearCartBtn) {

    clearCartBtn.addEventListener("click", async () => {

        if (!confirm("Clear all cart items?")) return;

        try {

            const q = query(
                collection(db, "cart"),
                where("userId", "==", currentUser.uid)
            );

            const snapshot = await getDocs(q);

            for (const item of snapshot.docs) {

                await deleteDoc(
                    doc(db, "cart", item.id)
                );

            }

            await loadCart();

            alert("Cart cleared successfully.");

        }

        catch (error) {

            console.error(error);

            alert("Failed to clear cart.");

        }

    });

}

// ======================================
// Checkout
// ======================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (!currentUser) {

            alert("Please login first.");

            return;

        }

        alert("Checkout system will be added in the next update.");

    });

}

// ======================================
// Ready
// ======================================

console.log("✅ cart.js loaded successfully");
