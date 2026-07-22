import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// URL থেকে Product ID নেওয়া
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("product-details");

async function loadProduct() {

    if (!productId) {
        container.innerHTML = `
            <h2 style="text-align:center;">
                Product Not Found
            </h2>
        `;
        return;
    }

    try {

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            container.innerHTML = `
                <h2 style="text-align:center;">
                    Product Not Found
                </h2>
            `;
            return;

        }

        const product = docSnap.data();

        container.innerHTML = `

<div class="product-details-card">

<div class="product-details-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-details-info">

<h1>${product.name}</h1>

<h2>$${product.price}</h2>

<p><strong>Brand:</strong> ${product.brand}</p>

<p><strong>Company:</strong> ${product.company}</p>

<p><strong>Seller:</strong> ${product.seller}</p>

<p><strong>Country:</strong> ${product.country}</p>

<p><strong>City:</strong> ${product.city}</p>

<p><strong>MOQ:</strong> ${product.moq}</p>

<p><strong>Stock:</strong> ${product.stock}</p>

<p><strong>Shipping:</strong> ${product.shipping}</p>

<p><strong>Delivery:</strong> ${product.delivery}</p>

<p><strong>Email:</strong> ${product.email}</p>

<p><strong>Phone:</strong> ${product.phone}</p>

<p><strong>Website:</strong> ${product.website}</p>

<p><strong>Description:</strong></p>

<p>${product.description}</p>

</div>

</div>

        `;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Failed to load product.
            </h2>
        `;

    }

}

loadProduct();
