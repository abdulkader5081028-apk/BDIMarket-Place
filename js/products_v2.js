import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const productsContainer = document.getElementById("productsContainer");
const productCount = document.getElementById("productCount");

async function loadProducts() {

    productsContainer.innerHTML = `
        <div class="loading">
            Loading Products...
        </div>
    `;

    try {

        const snapshot = await getDocs(collection(db, "products"));

        if (snapshot.empty) {

            productsContainer.innerHTML = `
                <div class="no-products">
                    <h3>No Products Found</h3>
                    <p>There are no products available.</p>
                </div>
            `;

            productCount.textContent = "0 Products";

            return;
        }

        let html = "";

        snapshot.forEach((doc) => {

            const product = doc.data();

            html += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="price">$${product.price}</p>

                    <p>${product.category}</p>

                    <a href="product_v2.html?id=${doc.id}" class="hero-btn">
                        View Details
                    </a>

                </div>

            </div>
            `;

        });

        productsContainer.innerHTML = html;

        productCount.textContent =
            `${snapshot.size} Products Found`;

    }

    catch (error) {

        console.error(error);

        productsContainer.innerHTML = `
            <div class="no-products">
                Failed To Load Products.
            </div>
        `;

    }

}


// ======================
// Search + Filter System
// ======================

let allProducts = [];

function renderProducts(products) {

    if (products.length === 0) {

        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>Try another keyword or filter.</p>
            </div>
        `;

        productCount.textContent = "0 Products";

        return;
    }

    let html = "";

    products.forEach((product) => {

        html += `
        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">$${product.price}</p>

                <p>${product.category}</p>

                <a href="product_v2.html?id=${product.id}" class="hero-btn">
                    View Details
                </a>

            </div>

        </div>
        `;
    });

    productsContainer.innerHTML = html;

    productCount.textContent =
        `${products.length} Products Found`;

}

async function loadProducts() {

    productsContainer.innerHTML = `
        <div class="loading">
            Loading Products...
        </div>
    `;

    try {

        const snapshot =
            await getDocs(collection(db, "products"));

        allProducts = [];

        snapshot.forEach((doc) => {

            allProducts.push({
                id: doc.id,
                ...doc.data()
            });

        });

        renderProducts(allProducts);

    }

    catch (error) {

        console.error(error);

    }

}

// ======================
// Live Search
// ======================

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const keyword =
    searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>

        product.name.toLowerCase().includes(keyword)

    );

    renderProducts(filtered);

});

// ======================
// Category Filter
// ======================

const categoryFilter =
document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {

    const category =
    categoryFilter.value;

    if (category === "") {

        renderProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product =>

        product.category === category

    );

    renderProducts(filtered);

});

loadProducts();
