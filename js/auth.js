import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const signupForm = document.getElementById("signup-form");

if (signupForm) {

signupForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirm-password").value;

if(password !== confirmPassword){

alert("Passwords do not match!");
return;

}

try{

await createUserWithEmailAndPassword(auth,email,password);

alert("Account created successfully!");

window.location.href="login.html";

}catch(error){

alert(error.message);

}

});

}
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

try {

await signInWithEmailAndPassword(auth, email, password);

alert("Login Successful!");

window.location.href = "index.html";

} catch (error) {

alert(error.message);

}

});

}
// ========================
// Login Session
// ========================

onAuthStateChanged(auth, (user) => {

if(user){

console.log("User Logged In:", user.email);

}else{

console.log("No User Logged In");

}

});
