import products from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  // Use a timeout or event to ensure that `products` is loaded
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    const product = products[index];

    if (product) {
      let productTitle = document.getElementById("product-title");
      let productPrice = document.getElementById("product-price");
      let productDescription = document.getElementById("product-description");
      let productMainImage = document.getElementById("main-image");
      let productAsideImages = document.querySelectorAll('#secondary-images img');

      productTitle.innerHTML = product.title;
      productPrice.innerHTML = product.price;
      productDescription.innerHTML = product.description;
      productMainImage.src = product.images[0];

      productAsideImages.forEach((img, index) => {
        if (index < product.images.length) {
          img.src = product.images[index];
        }
      });
    } else {
      console.error("Product not found.");
      setTimeout(() => {
      location.reload();
    }, 1000);
    }
  }, 500);
});
