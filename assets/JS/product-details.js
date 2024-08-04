import products from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  // Use a timeout or event to ensure that `products` is loaded
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    const product = products[index];
    const productWrapper = document.getElementById("product-details");
    if (product) {
      const productImages = product.images.map((image, index) => {
        return `<img class="w-75" src="${image}" alt="Product position${index + 1}">`;
    }).join('');
    const productData = `<div class="col-lg-2 col-3 d-flex flex-column justify-content-between" id="secondary-images">
                          ${productImages}
                    </div>
                    <div class="col-lg-6 col-md-7 col-9">
                        <img class="w-75" src="${product.images[0]}" id="main-image" alt="Havic main image">
                    </div>
                    <div class="col-lg-4 product__description">
                        <h2 class="h3 mb-2" id="product-title">${product.title}</h2>
                        <span class="d-block mb-1">
                            <i class="fa-solid fa-star star__icon active"></i>
                            <i class="fa-solid fa-star star__icon active"></i>
                            <i class="fa-solid fa-star star__icon active"></i>
                            <i class="fa-solid fa-star star__icon active"></i>
                            <i class="fa-solid fa-star star__icon"></i>
                            <span class="text-secondary">(150 Reviews)</span>
                            <span>|</span>
                            <span class="text-success">In Stock</span>
                        </span>
                        <span class="d-block h4" id="product-price">${product.price}</span>
                        <p class="fw-semibold fs-6 col-12 col-lg-10" id="product-description">${product.description}</p>
                        <hr>
                        <div class="colours__selection mb-3">
                            <span class="h5 fw-normal">Colours:</span>
                            <span class="rounded-circle active ms-3 circle color1"></span>
                            <span class="rounded-circle ms-2 circle color2"></span>
                        </div>
                        <div class="d-flex gap-2 align-items-center mb-4">
                            <div class="d-flex">
                                <button class="border-0 py-2 px-3 fs-5 btn__count rounded-start">&minus;</button>
                                <span class="py-2 px-3 fw-semibold fs-5 btn__count">2</span>
                                <button class="border-0 py-2 px-3 fs-5 text-light rounded-end btn__buy-now">&plus;</button>
                            </div>
                            <button class="btn btn__buy-now btn-lg px-3 px-lg-5 text-light" type="button">Buy
                                Now</button>
                            <i class="fa-regular fa-heart fs-4 border border-1 border-dark p-2 rounded-3"></i>
                        </div>
                    </div>`;
      productWrapper.innerHTML = productData;
    } else {
      console.error("Product not found.");
      setTimeout(() => {
      location.reload();
    }, 1000);
    }
  }, 500);
});
