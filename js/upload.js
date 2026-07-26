// =====================================
// BDIMarket Place
// upload.js V2
// =====================================

import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// =====================================
// Elements
// =====================================

const uploadForm = document.getElementById("uploadForm");

// =====================================
// Check Login
// =====================================

onAuthStateChanged(auth,(user)=>{

if(!user){

alert("Please login first.");

window.location.href="login.html";

}

});

// =====================================
// Upload Product
// =====================================

uploadForm?.addEventListener("submit", async(e)=>{

e.preventDefault();

const product={

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
Number(document.getElementById("productStock").value||0),

moq:
Number(document.getElementById("productMOQ").value||1),

image:
document.getElementById("productImage").value.trim(),

seller:
auth.currentUser?.email || "",

createdAt:
serverTimestamp()

};

try{

await addDoc(

collection(db,"products"),

product

);
// =====================================
// Upload Success
// =====================================

alert("✅ Product uploaded successfully!");

uploadForm.reset();

// Redirect to Products Page

window.location.href = "products.html";

}catch(error){

console.error("Upload Error:", error);

alert("❌ Upload failed!\n\n" + error.message);

}

});

// =====================================
// Page Ready
// =====================================

console.log("✅ upload.js V2 Ready");
