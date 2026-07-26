// =====================================
// BDIMarket Place
// auth.js - Part 1
// =====================================

import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// =====================================
// Elements
// =====================================

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

// =====================================
// Signup
// =====================================

signupForm?.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("signupEmail").value.trim();
const password = document.getElementById("signupPassword").value;

try {

await createUserWithEmailAndPassword(auth, email, password);

alert("✅ Account created successfully!");

window.location.href = "login.html";

} catch (error) {

alert(error.message);

}

});

// =====================================
// login
// =====================================
<a href="login.html" class="login-link"asyncn</a>
loginForm?.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value;

try {

await signInWithEmailAndPassword(auth, email, password);

alert("✅ Login successful!");

window.location.href = "index.html";

} catch (error) {

alert(error.message);

}

});

// =====================================
// Logout
// =====================================
<a href="#" id="logoutBtn" class="logout-link" style="display:none;">
Logout
</a>
logoutBtn?.addEventListener("click", async () => {

try {

await signOut(auth);

alert("✅ Logged out successfully.");

window.location.href = "login.html";

} catch (error) {

alert(error.message);

}

});

// =====================================
// Auth State
// =====================================

onAuthStateChanged(auth, (user) => {

const loginLinks = document.querySelectorAll(".login-link");
const logoutLinks = document.querySelectorAll(".logout-link");
const userName = document.getElementById("<span id="userName">Guest</span>");

if (user) {

loginLinks.forEach(link => {
link.style.display = "none";
});

logoutLinks.forEach(link => {
link.style.display = "inline-block";
});

if (userName) {
userName.textContent = user.email;
}

} else {

loginLinks.forEach(link => {
link.style.display = "inline-block";
});

logoutLinks.forEach(link => {
link.style.display = "none";
});

if (userName) {
userName.textContent = "Guest";
}

}

});

// =====================================
// Protected Pages
// =====================================

const protectedPages = [

"seller.html",

"upload.html",

"checkout.html"

];

const currentPage = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, (user) => {

if (!user && protectedPages.includes(currentPage)) {

alert("Please login first.");

window.location.href = "login.html";

}

});

console.log("✅ Authentication Ready");
