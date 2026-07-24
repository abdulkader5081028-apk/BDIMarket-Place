// =====================================
// BDIMarket Home
// Version 3.0
// =====================================

// ---------- HTML Elements ----------

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const sideMenu = document.getElementById("sideMenu");

const overlay = document.getElementById("overlay");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const cartCount = document.getElementById("cartCount");

// =====================================
// Side Menu
// =====================================

function openMenu(){

sideMenu.classList.add("active");

overlay.classList.add("active");

}

function closeSideMenu(){

sideMenu.classList.remove("active");

overlay.classList.remove("active");

}

if(menuBtn){

menuBtn.addEventListener("click",openMenu);

}

if(closeMenu){

closeMenu.addEventListener("click",closeSideMenu);

}

if(overlay){

overlay.addEventListener("click",closeSideMenu);

}

// =====================================
// Cart Counter
// =====================================

function updateCartCounter(){

const cart = JSON.parse(

localStorage.getItem("cart")

) || [];

const total = cart.reduce(

(sum,item)=>sum+(item.quantity||1),

0

);

if(cartCount){

cartCount.textContent = total;

}

}

updateCartCounter();







