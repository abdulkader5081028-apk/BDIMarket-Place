// ======================================================
// BDIMarket Place
// Upload Product
// ======================================================

import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================================================
// DOM
// ======================================================

const uploadForm = document.getElementById("uploadForm");
const uploadMessage = document.getElementById("uploadMessage");

// ======================================================
// Login Check
// ======================================================

if (!auth.currentUser) {

  alert("Please login first.");

  window.location.href = "login.html";

}

// ======================================================
// Upload Product
// ======================================================

uploadForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    if (!auth.currentUser) {

      uploadMessage.textContent = "❌ Please login first.";

      return;

    }

    const product = {

      sellerId: auth.currentUser.uid,

      productName: document.getElementById("productName").value,

      description: document.getElementById("description").value,

      category: document.getElementById("category").value,

      brand: document.getElementById("brand").value,

      retailPrice: Number(document.getElementById("retailPrice").value),

      wholesalePrice: Number(document.getElementById("wholesalePrice").value),

      minimumOrder: Number(document.getElementById("minimumOrder").value),

      stock: Number(document.getElementById("stock").value),

      country: document.getElementById("country").value,

      currency: document.getElementById("currency").value,

      image: document.getElementById("imageUrl").value,

      tags: document.getElementById("tags").value,

      productType: document.getElementById("productType").value,

      status: document.getElementById("status").value

    };
        // ======================================================
    // Default Values
    // ======================================================

    product.rating = 0;

    product.reviewCount = 0;

    product.flashDeal = false;

    product.featured = false;

    product.bestSeller = false;

    product.verified = false;

    product.createdAt = new Date();

    // ======================================================
    // Save Product
    // ======================================================

    await addDoc(
      collection(db, "products"),
      product
    );

    // ======================================================
    // Success
    // ======================================================

    uploadMessage.textContent =
      "✅ Product uploaded successfully.";

    uploadMessage.style.color = "green";

    uploadForm.reset();

  } catch (error) {

    console.error(error);

    uploadMessage.textContent =
      "❌ Upload failed. Please try again.";

    uploadMessage.style.color = "red";

  }

});
