import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================
// Get Product ID
// ======================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// ======================
// HTML Elements
// ======================

const productImage = document.getElementById("productImage");

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productCategory = document.getElementById("productCategory");

const productDescription = document.getElementById("productDescription");

const productStock = document.getElementById("productStock");

// ======================
// Load Product
// ======================

async function loadProduct() {

    if (!productId) {

        alert("Product not found.");

        return;

    }

    try {

        const productRef = doc(db, "products", productId);

        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {

            alert("Product not found.");

            return;

        }

        const product = productSnap.data();

        productImage.src = product.image;

        productName.textContent = product.name;

        productPrice.textContent = "$" + product.price;

        productCategory.textContent = product.category;

        productDescription.textContent = product.description;

        productStock.textContent =
            product.stock > 0
                ? "✅ In Stock"
                : "❌ Out of Stock";

    }

    catch (error) {

        console.error(error);

        alert("Failed to load product.");

    }

}

loadProduct();
