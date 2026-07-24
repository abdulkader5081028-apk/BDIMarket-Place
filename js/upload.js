// ======================================
// BDIMarket Place - upload.js
// Part 1
// ======================================

import { auth, db, storage } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// ======================================
// Login Check
// ======================================

let currentUser = null;

onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

});

// ======================================
// Form Elements
// ======================================

const form =
document.getElementById("uploadForm");

const submitBtn =
form.querySelector("button[type='submit']");
// ======================================
// Upload Product
// ======================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;

    submitBtn.textContent = "Uploading...";

    try {

        const name =
        document.getElementById("productName").value.trim();

        const price =
        Number(document.getElementById("productPrice").value);

        const category =
        document.getElementById("productCategory").value;

        const description =
        document.getElementById("productDescription").value.trim();

        const company =
        document.getElementById("companyName").value.trim();

        const country =
        document.getElementById("country").value.trim();

        const moq =
        Number(document.getElementById("moq").value);

        const stock =
        Number(document.getElementById("stock").value);

        const imageFile =
        document.getElementById("productImage").files[0];

        if (!imageFile) {

            alert("Please select an image.");

            submitBtn.disabled = false;

            submitBtn.textContent = "📤 Upload Product";

            return;

        }

        // Upload Image

        const imageRef = ref(
            storage,
            `products/${Date.now()}_${imageFile.name}`
        );

        await uploadBytes(imageRef, imageFile);

        const imageUrl =
        await getDownloadURL(imageRef);
      // ======================================
// Save Product To Firestore
// ======================================

        await addDoc(collection(db, "products"), {

            name,
            price,
            category,
            description,

            company,
            country,

            moq,
            stock,

            image: imageUrl,

            sellerId: currentUser.uid,

            sellerEmail: currentUser.email,

            createdAt: serverTimestamp()

        });

        alert("✅ Product uploaded successfully.");

        form.reset();

        window.location.href = "seller.html";

    }

    catch (error) {

        console.error(error);

        alert("❌ " + error.message);

    }

    finally {

        submitBtn.disabled = false;

        submitBtn.textContent = "📤 Upload Product";

    }

});
// ======================================
// Validation
// ======================================

        if (!name) {
            throw new Error("Product name is required.");
        }

        if (price <= 0) {
            throw new Error("Enter a valid price.");
        }

        if (!category) {
            throw new Error("Please select a category.");
        }

        if (!description) {
            throw new Error("Product description is required.");
        }

        if (!company) {
            throw new Error("Company name is required.");
        }

        if (!country) {
            throw new Error("Country is required.");
        }

        if (stock < 1) {
            throw new Error("Stock must be at least 1.");
        }

        if (moq < 1) {
            throw new Error("MOQ must be at least 1.");
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(imageFile.type)) {
            throw new Error(
                "Only JPG, PNG and WEBP images are allowed."
            );
        }

        if (imageFile.size > 2 * 1024 * 1024) {
            throw new Error(
                "Image size must be under 2 MB."
            );
        }
