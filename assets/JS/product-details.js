// Retrieve the index and products array from sessionStorage
const index = parseInt(sessionStorage.getItem('selectedProductIndex'));
const products = JSON.parse(sessionStorage.getItem('products'));

// Use the index to find the corresponding product
const product = products[index];

let productTitle = document.getElementById("product-title");
let productPrice = document.getElementById("product-price");
let productDescription = document.getElementById("product-description");
let productMainImage = document.getElementById("main-image");
let productAsideImages = document.querySelectorAll('#secondary-images img');

//change Product Details
productTitle.innerHTML = product.title;
productPrice.innerHTML = product.price;
productDescription.innerHTML = product.description;
productMainImage.src = product.images[0];


// Loop through the images and update their src attributes
productAsideImages.forEach((img, index) => {
  if (index < product.images.length) {
      img.src = product.images[index];
  }
});
