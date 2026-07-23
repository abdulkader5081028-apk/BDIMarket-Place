import { db } from "./firebase.js";

import {
    doc,
    getDoc
    collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================
// Get Product ID
// ======================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// ======================
// HTML Elements
// ======================

const productImage = document.getElementById("productImage");

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productCategory = document.getElementById("productCategory");

const productDescription = document.getElementById("productDescription");

const productStock = document.getElementById("productStock");

// ======================
// Load Product
// ======================

async function loadProduct() {

    if (!productId) {

        alert("Product not found.");

        return;

    }

    try {

        const productRef = doc(db, "products", productId);

        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {

            alert("Product not found.");

            return;

        }

        const product = productSnap.data();
fillProductDetails(product);
        productImage.src = product.image;

        productName.textContent = product.name;

        productPrice.textContent = "$" + product.price;

        productCategory.textContent = product.category;

        productDescription.textContent = product.description;

        productStock.textContent =
            product.stock > 0
                ? "✅ In Stock"
                : "❌ Out of Stock";

    }

    catch (error) {

        console.error(error);

        alert("Failed to load product.");

    }

}

loadProduct();
// ======================
// Related Products
// ======================

async function loadRelatedProducts() {

    const container =
        document.getElementById("relatedProducts");

    try {

        const snapshot =
            await getDocs(collection(db, "products"));

        let html = "";

        snapshot.forEach((doc) => {

            const item = doc.data();

            if (doc.id === productId) return;

            html += `

            <div class="product-card">

                <img src="${item.image}" alt="${item.name}">

                <div class="product-info">

                    <h3>${item.name}</h3>

                    <p class="price">$${item.price}</p>

                    <a href="product_v2.html?id=${doc.id}" class="hero-btn">

                        View Details

                    </a>

                </div>

            </div>

            `;

        });

        container.innerHTML = html;

    }

    catch (error) {

        console.error(error);

    }

}
// ======================
// Fill Product Information
// ======================

function fillProductDetails(product) {

    document.getElementById("sellerName").textContent =
        product.seller || "Unknown Seller";

    document.getElementById("sellerCompany").textContent =
        product.company || "BDIMarket Place Supplier";

    document.getElementById("sellerLocation").textContent =
        product.location || "Bangladesh";

    document.getElementById("sellerVerified").textContent =
        product.verified ? "✔ Verified Supplier" : "Not Verified";

    document.getElementById("productBrand").textContent =
        product.brand || "N/A";

    document.getElementById("productModel").textContent =
        product.model || "N/A";

    document.getElementById("productOrigin").textContent =
        product.origin || "N/A";

    document.getElementById("minimumOrder").textContent =
        product.minimumOrder || "1 Piece";

    document.getElementById("availability").textContent =
        product.stock > 0 ? "Available" : "Out Of Stock";

}
loadRelatedProducts();

Complete product_v2.html (Product Details Page)
// ======================
// Buttons
// ======================

const cartButton =
document.getElementById("addToCart");

const wishlistButton =
document.getElementById("addToWishlist");

if (cartButton) {

    cartButton.addEventListener("click", () => {

        alert("Add To Cart feature will be connected with Firebase in next step.");

    });

}

if (wishlistButton) {

    wishlistButton.addEventListener("click", () => {

        alert("Wishlist feature will be connected with Firebase in next step.");

    });

}

// ======================
// Share Product
// ======================

if (navigator.share) {

    const shareButton =
    document.createElement("button");

    shareButton.textContent = "📤 Share";

    shareButton.className = "hero-btn";

    document.querySelector(".product-buttons")
        .appendChild(shareButton);

    shareButton.addEventListener("click", async () => {

        await navigator.share({

            title: document.getElementById("productName").textContent,

            url: window.location.href

        });

    });

}

console.log("Product Details Loaded Successfully");
