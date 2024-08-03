const storedProductsJSON = localStorage.getItem('allProducts');
const storedProducts = JSON.parse(storedProductsJSON);

if (storedProducts) {
  console.log('Stored products:', storedProducts);
} else {
  console.warn('No stored products found.');
}


// // shopping-cart.js
// const storedCartJSON = localStorage.getItem('cart');
// const cart = JSON.parse(storedCartJSON) || []; // Initialize as an empty array if no data is stored

// // Now you can use the 'cart' array in your shopping cart logic
// console.log('Cart contents:', cart);




function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('product__tbody');
  
    if (cart.length === 0) {
      cartList.innerHTML = '';
    } else {
      cart.forEach(element => {
        createProduct2(element)
      });
      
    }
  }
 document.addEventListener('DOMContentLoaded', displayCart);




// Add Product to Cart Functions:
//   storedProducts.forEach((product) => {
//   const { title, images, price ,category } = product;
//   if (titleOfProduct === title) {
//   createProduct2(title, price , images , category )}
// );



function createProduct2(product) {
    const {title, price , image , category} = product
  // Create the necessary elements
  const tr = document.createElement("tr");
  tr.classList.add("align-middle");

  const td1 = document.createElement("td");
  const img = document.createElement("img");
  img.src = image;
  img.alt = ` photo of ${title}`;
  category === "smartphones"
    ? img.classList.add("product__img1")
    : img.classList.add("product__img2");
  td1.appendChild(img);
  const span = document.createElement("span");
  span.textContent = title;
  td1.appendChild(span);

  const td2 = document.createElement("td");
  td2.textContent = `${price}$`;

  const td3 = document.createElement("td");
  const minusButton = document.createElement("button");
  minusButton.type = "button";
  minusButton.classList.add("btn", "border-secondary", "text-center");
  minusButton.textContent = "-";
  const quantitySpan = document.createElement("span");
  quantitySpan.classList.add("text-center", "m-2");
  quantitySpan.textContent = "0";
  const plusButton = document.createElement("button");
  plusButton.type = "button";
  plusButton.classList.add("btn", "border-secondary", "text-center");
  plusButton.textContent = "+";
  td3.appendChild(minusButton);
  td3.appendChild(quantitySpan);
  td3.appendChild(plusButton);

  const td4 = document.createElement("td");
  td4.textContent = `${price}$`;

  // Append the elements to the table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  // Create the <tbody> element
  const tbodyElement = document.createElement("tbody");
  tbodyElement.id = "product__tbody";

  tbodyElement.appendChild(tr);

  // Find the parent table element (assuming it has the ID "product__table")
  const tableElement = document.getElementById("product__table");

  // Append the <tbody> element to the table
  tableElement.appendChild(tbodyElement);
}