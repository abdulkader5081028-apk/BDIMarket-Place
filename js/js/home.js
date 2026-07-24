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

// =====================================
// Search System
// =====================================

function performSearch(){

const keyword = searchInput.value.trim();

if(keyword===""){

alert("Please enter a product name.");

searchInput.focus();

return;

}

window.location.href =
`products.html?search=${encodeURIComponent(keyword)}`;

}

if(searchBtn){

searchBtn.addEventListener("click",performSearch);

}

if(searchInput){

searchInput.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

performSearch();

}

});

}

// =====================================
// Hero Slider
// =====================================

const heroSlides = document.querySelectorAll(".hero-slide");

let currentSlide = 0;

function showSlide(index){

if(heroSlides.length===0)return;

heroSlides.forEach(slide=>{

slide.style.display="none";

});

heroSlides[index].style.display="flex";

}

function nextSlide(){

if(heroSlides.length===0)return;

currentSlide++;

if(currentSlide>=heroSlides.length){

currentSlide=0;

}

showSlide(currentSlide);

}

showSlide(currentSlide);

setInterval(nextSlide,5000);

// =====================================
// Page Ready
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

updateCartCounter();

console.log("✅ Home Loaded Successfully");

});

// =====================================
// Future Ready Functions
// =====================================

// Wishlist Counter (Reserved)

function updateWishlistCounter(){

const wishlist = JSON.parse(

localStorage.getItem("wishlist")

) || [];

console.log("Wishlist:",wishlist.length);

}

// =====================================
// Featured Products (Firebase Ready)
// =====================================

async function loadFeaturedProducts(){

const container = document.getElementById(

"featuredProducts"

);

if(!container) return;

// products.js পরে এখানে Firebase থেকে
// Featured Products Load করবে.

console.log(

"Featured Products Ready"

);

}

// =====================================
// Scroll To Top
// =====================================

const scrollTopBtn = document.createElement("button");

scrollTopBtn.innerHTML="⬆";

scrollTopBtn.className="scroll-top-btn";

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

});

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// =====================================
// Initialize
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

updateCartCounter();

updateWishlistCounter();

loadFeaturedProducts();

console.log("🚀 BDIMarket Home Ready");

});





