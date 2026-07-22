const cartContainer = document.getElementById("cart-container");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));

}

function renderCart(){

if(cart.length===0){

cartContainer.innerHTML=`

<div class="feature-card">

<h2>

🛒 Your Cart is Empty

</h2>

<p>

Add products to start shopping.

</p>

<a href="products_new.html"

class="btn btn-primary">

Browse Products

</a>

</div>

`;

return;

}

let total=0;

cartContainer.innerHTML="";
  cart.forEach((item,index)=>{

const subtotal=item.price*item.quantity;

total+=subtotal;

cartContainer.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${item.image}" alt="${item.name}">

</div>

<div class="product-info">

<h3 class="product-title">

${item.name}

</h3>

<p class="product-price">

$${item.price}

</p>

<p>

Quantity:

<strong>

${item.quantity}

</strong>

</p>

<p>

Subtotal:

<strong>

$${subtotal}

</strong>

</p>

<div class="product-actions">

<button
class="btn btn-primary"
onclick="increaseQuantity(${index})">

+

</button>

<button
class="btn btn-primary"
onclick="decreaseQuantity(${index})">

-

</button>

<button
class="btn"
style="background:#ff3b30;color:white;"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

</div>

`;

});

cartContainer.innerHTML+=`

<div class="feature-card">

<h2>

Total: $${total}

</h2>

<a href="#"

class="btn btn-primary">

Proceed To Checkout

</a>

</div>

`;
  function increaseQuantity(index){

cart[index].quantity++;

saveCart();

renderCart();

}

function decreaseQuantity(index){

if(cart[index].quantity>1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

saveCart();

renderCart();

}

function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

}

/* Make functions available to HTML onclick */

window.increaseQuantity=increaseQuantity;

window.decreaseQuantity=decreaseQuantity;

window.removeItem=removeItem;

/* Initial Load */

renderCart();
