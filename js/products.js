import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const container = document.getElementById("products-container");

async function loadProducts() {

    container.innerHTML += `
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

        container.innerHTML = "";

        if (snapshot.empty) {

            container.innerHTML = `
                <h2 style="text-align:center;">
                    No Products Found
                </h2>
            `;

            return;
        }

        snapshot.forEach((doc) => {

            const product = doc.data();

            container.innerHTML += `

<div class="product-card">

    <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-info">

        <h3 class="product-title">
            ${product.name}
        </h3>

        <p class="product-price">
            $${product.price}
        </p>

        <p>
            <strong>Company:</strong>
            ${product.company}
        </p>

        <p>
            <strong>Country:</strong>
            ${product.country}
        </p>

        <a href="product.html?id=${doc.id}" class="product-btn">
            View Details
        </a>

    </div>

</div>

`;

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Failed to load products.
            </h2>
        `;

    }

}

loadProducts();
