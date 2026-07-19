// js/auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// --- সাইনআপ (Sign Up) লজিক ---
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully!");
                window.location.href = "login.html"; // সফল হলে লগইন পেজে নিয়ে যাবে
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}

// --- লগইন (Log In) লজিক ---
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Logged in successfully!");
                window.location.href = "seller-dashboard.html"; // সফল হলে ড্যাশবোর্ডে নিয়ে যাবে
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}
