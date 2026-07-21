import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

if (!user) {

alert("Please login first!");

window.location.href = "login.html";

}

});
