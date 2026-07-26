// =====================================
// BDIMarket Place
// upload.js - Part 1
// =====================================

import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const uploadForm =
document.getElementById("uploadForm");

// =====================================
// Upload Product
// =====================================

uploadForm?.addEventListener("submit", async (e) => {

e.preventDefault();

const product = {

name:
document.getElementById("productName").value.trim(),

price:
Number(document.getElementById("productPrice").value),

category:
document.getElementById("productCategory").value.trim(),

description:
document.getElementById("productDescription").value.trim(),

brand:
document.getElementById("productBrand").value.trim(),

model:
document.getElementById("productModel").value.trim(),

stock:
Number(document.getElementById("productStock").value || 0),

moq:
Number(document.getElementById("productMOQ").value || 1),

image:
document.getElementById("productImage").value.trim(),

seller:
auth.currentUser?.email || "Guest Seller",

status:"Available",

createdAt:serverTimestamp()

};

try{

await addDoc(

collection(db,"products"),

product

);
// =====================================
// Save Product
// =====================================

alert("✅ Product uploaded successfully!");

uploadForm.reset();

window.location.href = "products.html";

}catch(error){

console.error("Upload Error:", error);

alert("❌ Failed to upload product.\n\n" + error.message);

}

});

// =====================================
// Auth Check
// =====================================

auth.onAuthStateChanged?.((user)=>{

if(!user){

alert("Please login first.");

window.location.href="login.html";

}

});

console.log("✅ Upload Page Ready");
