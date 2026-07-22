import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const productsContainer = document.getElementById("products-container");

async function loadProducts() {

    productsContainer.innerHTML = `
    <div class="loading">
        Loading Products...
    </div>
    `;

    try {

        const q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        productsContainer.innerHTML = "";

        if (snapshot.empty) {

            productsContainer.innerHTML = `
            <h2 style="text-align:center">
            No Products Found
            </h2>
            `;
            return;
        }

        snapshot.forEach((doc) => {

            const product = doc.data();

            productsContainer.innerHTML += `

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="product-price">$${product.price}</p>

<p>${product.company}</p>

<p>${product.country}</p>

<a href="product.html?id=${doc.id}" class="product-btn">
View Details
</a>

</div>

</div>

`;

        });

    } catch (error) {

        console.error(error);

        productsContainer.innerHTML = `
        <h2>
        Failed to load products.
        </h2>
        `;

    }

}

loadProducts();
