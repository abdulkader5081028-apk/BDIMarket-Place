import { db } from "./firebase.js";

import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const form = document.getElementById("upload-form");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const product = {

name: document.getElementById("product-name").value,

category: document.getElementById("category").value,

brand: document.getElementById("brand").value,

description: document.getElementById("description").value,

price: Number(document.getElementById("price").value),

moq: Number(document.getElementById("moq").value),

stock: Number(document.getElementById("stock").value),

company: document.getElementById("company").value,

seller: document.getElementById("seller").value,

country: document.getElementById("country").value,

city: document.getElementById("city").value,

email: document.getElementById("email").value,

phone: document.getElementById("phone").value,

image: document.getElementById("image").value,

shipping: document.getElementById("shipping").value,

delivery: document.getElementById("delivery").value,

website: document.getElementById("website").value,

status: document.getElementById("status").value,

createdAt: new Date()

};

try{

await addDoc(collection(db,"products"),product);

alert("✅ Product Uploaded Successfully!");

form.reset();

}catch(err){

console.error(err);

alert("❌ Upload Failed!");

}

});
