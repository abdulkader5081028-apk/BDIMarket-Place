‎{ auth, db } from "./firebase.js";
‎
‎import {
‎    collection,
‎    query,
‎    where,
‎    getDocs
‎} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
‎
‎import {
‎    onAuthStateChanged
‎} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
‎
‎// ======================
‎// HTML Elements
‎// ======================
‎
‎const cartContainer =
‎document.getElementById("cartContainer");
‎
‎const totalItems =
‎document.getElementById("totalItems");
‎
‎const subtotalPrice =
‎document.getElementById("subtotalPrice");
‎
‎const shippingPrice =
‎document.getElementById("shippingPrice");
‎
‎const totalPrice =
‎document.getElementById("totalPrice");
‎
‎const emptyCart =
‎document.getElementById("emptyCart");
‎
‎// ======================
‎// Check Login
‎// ======================
‎
‎onAuthStateChanged(auth, (user) => {
‎
‎    if (!user) {
‎
‎        cartContainer.innerHTML = `
‎            <h2>Please login first.</h2>
‎        `;
‎
‎        return;
‎    }
‎
‎    loadCart(user.uid);
‎
‎});
‎
‎// ======================
‎// Load Cart
‎// ======================
‎
‎async function loadCart(uid) {
‎
‎    cartContainer.innerHTML = `
‎        <div class="loading">
‎            Loading Cart...
‎        </div>
‎    `;
‎
‎    try {
‎
‎        const q = query(
‎            collection(db, "cart"),
‎            where("userId", "==", uid)
‎        );
‎
‎        const snapshot = await getDocs(q);
‎
‎        if (snapshot.empty) {
‎
‎            cartContainer.innerHTML = "";
‎
‎            emptyCart.style.display = "block";
‎
‎            totalItems.textContent = "0";
‎
‎            subtotalPrice.textContent = "$0.00";
‎
‎            shippingPrice.textContent = "$0.00";
‎
‎            totalPrice.textContent = "$0.00";
‎
‎            return;
‎
‎        }
‎
‎  let html = "";
‎
‎let total = 0;
‎
‎let items = 0;
‎
‎snapshot.forEach((doc) => {
‎
‎    const item = doc.data();
‎
‎    items++;
‎
‎    const price = Number(item.price) || 0;
‎
‎    const quantity = Number(item.quantity) || 1;
‎
‎    total += price * quantity;
‎
‎    html += `
‎
‎    <div class="cart-item">
‎
‎        <div class="cart-image">
‎
‎            <img src="${item.image}" alt="${item.name}">
‎
‎        </div>
‎
‎        <div class="cart-info">
‎
‎            <h3>${item.name}</h3>
‎
‎            <p>$${price}</p>
‎
‎            <p>
‎
‎                Quantity :
‎                <strong>${quantity}</strong>
‎
‎            </p>
‎
‎        </div>
‎
‎        <div class="cart-actions">
‎
‎            <button
‎                class="remove-cart"
‎                data-id="${doc.id}">
‎
‎                🗑 Remove
‎
‎            </button>
‎
‎        </div>
‎
‎    </div>
‎
‎    `;
‎
‎});
‎
‎cartContainer.innerHTML = html;
‎
‎totalItems.textContent = items;
‎
‎subtotalPrice.textContent =
‎"$" + total.toFixed(2);
‎
‎shippingPrice.textContent =
‎"$0.00";
‎
‎totalPrice.textContent =
‎"$" + total.toFixed(2);
‎
‎emptyCart.style.display = "none";
‎
‎    }
‎
‎    catch (error) {
‎
‎        console.error(error);
‎
‎    }
‎
‎}
‎import {
‎    deleteDoc,
‎    doc
‎} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
‎
‎// ======================
‎// Remove From Cart
‎// ======================
‎
‎document.addEventListener("click", async (e) => {
‎
‎    if (!e.target.classList.contains("remove-cart")) return;
‎
‎    const cartId = e.target.dataset.id;
‎
‎    const confirmDelete = confirm(
‎        "Remove this product from your cart?"
‎    );
‎
‎    if (!confirmDelete) return;
‎
‎    try {
‎
‎        await deleteDoc(doc(db, "cart", cartId));
‎
‎        const user = auth.currentUser;
‎
‎        if (user) {
‎
‎            loadCart(user.uid);
‎
‎        }
‎
‎    }
‎
‎    catch (error) {
‎
‎        console.error(error);
‎
‎        alert("Failed to remove product.");
‎
‎    }
‎
‎});
‎
‎// ======================
‎// Checkout
‎// ======================
‎
‎const checkoutBtn =
‎document.getElementById("checkoutBtn");
‎
‎if (checkoutBtn) {
‎
‎    checkoutBtn.addEventListener("click", () => {
‎
‎        const user = auth.currentUser;
‎
‎        if (!user) {
‎
‎            alert("Please login first.");
‎
‎            return;
‎
‎        }
‎
‎        alert("Checkout feature will be added in the next step.");
‎
‎    });
‎
‎}
‎
‎console.log("Cart System Loaded Successfully");
‎// ================================
‎// Initialize Cart
‎// ================================
‎
‎document.addEventListener("DOMContentLoaded", () => {
‎    loadCart();
‎});
‎
‎// ================================
‎// Clear Cart (Optional)
‎// ================================
‎
‎const clearCartBtn = document.getElementById("clearCart");
‎
‎if (clearCartBtn) {
‎    clearCartBtn.addEventListener("click", async () => {
‎
‎        if (!confirm("Are you sure you want to clear your cart?")) return;
‎
‎        try {
‎
‎            const snapshot = await getDocs(collection(db, "cart"));
‎
‎            for (const docItem of snapshot.docs) {
‎                await deleteDoc(doc(db, "cart", docItem.id));
‎            }
‎
‎            alert("Cart cleared successfully.");
‎
‎            loadCart();
‎
‎        } catch (error) {
‎
‎            console.error(error);
‎
‎            alert("Failed to clear cart.");
‎
‎        }
‎
‎    });
‎}
