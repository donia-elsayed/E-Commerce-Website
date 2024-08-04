import { products } from "../JS/main.js";

const displayProduct = (product) => {
  const productWrapper = document.getElementById("product-details");
  const imageClass = product.images.length === 3 ? "w-50" : "w-25";
  // Create container for secondary images
  const secondaryImagesContainer = document.createElement("div");
  secondaryImagesContainer.className =
    "col-lg-2 col-3 d-flex flex-column align-items-center";
  secondaryImagesContainer.id = "secondary-images";

  // Create and append image elements for each image
  product.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.className = `${imageClass} mb-2 img__size`;
    img.src = image;
    img.alt = `Product position ${index + 1}`;
    // Add click event for changing main image
    img.onclick = () => changeMainImage(image);
    secondaryImagesContainer.appendChild(img);
  });

  // Create container for the main image
  const mainImageContainer = document.createElement("div");
  mainImageContainer.className = "offset-lg-1 col-lg-4 col-md-6 col my-auto img__container";

  const mainImage = document.createElement("img");
  mainImage.className = "main__img";
  mainImage.src = product.images[0];
  mainImage.id = "main-image";
  mainImage.alt = "Havic main image";
  mainImageContainer.appendChild(mainImage);

  // Create container for product description
  const productDescriptionContainer = document.createElement("div");
  productDescriptionContainer.className = "col-lg-4 product__description";

  const title = document.createElement("h2");
  title.className = "h3 mb-2";
  title.id = "product-title";
  title.textContent = product.title;

  const rating = document.createElement("span");
  rating.className = "d-block mb-1";
  rating.innerHTML = `
    <i class="fa-solid fa-star star__icon active"></i>
    <i class="fa-solid fa-star star__icon active"></i>
    <i class="fa-solid fa-star star__icon active"></i>
    <i class="fa-solid fa-star star__icon active"></i>
    <i class="fa-solid fa-star star__icon"></i>
    <span class="text-secondary">(150 Reviews)</span>
    <span>|</span>
    <span class="text-success">${product.availabilityStatus}</span>
  `;

  const price = document.createElement("span");
  price.className = "d-block h4";
  price.id = "product-price";
  price.textContent = product.price;

  const description = document.createElement("p");
  description.className = "fw-semibold fs-6 col-12 col-lg-10";
  description.id = "product-description";
  description.textContent = product.description;

  const hr = document.createElement("hr");

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex gap-2 align-items-center mb-4";

  const countContainer = document.createElement("div");
  countContainer.className = "d-flex";

  const minusButton = document.createElement("button");
  minusButton.className = "border-0 py-2 px-3 fs-5 btn__count rounded-start";
  minusButton.textContent = "−";

  const count = document.createElement("span");
  count.className = "py-2 px-3 fw-semibold fs-5 btn__count";
  count.textContent = "0";

  const plusButton = document.createElement("button");
  plusButton.className =
    "border-0 py-2 px-3 fs-5 text-light rounded-end btn__buy-now";
  plusButton.textContent = "+";

  countContainer.appendChild(minusButton);
  countContainer.appendChild(count);
  countContainer.appendChild(plusButton);

  const buyNowButton = document.createElement("button");
  buyNowButton.className = "btn btn__buy-now btn-lg px-3 px-lg-5 text-light";
  buyNowButton.type = "button";
  buyNowButton.textContent = "Buy Now";

  const heartIcon = document.createElement("i");
  heartIcon.className =
    "fa-regular fa-heart fs-4 border border-dark p-2 rounded-3";

  buttonContainer.appendChild(countContainer);
  buttonContainer.appendChild(buyNowButton);
  buttonContainer.appendChild(heartIcon);

  productDescriptionContainer.appendChild(title);
  productDescriptionContainer.appendChild(rating);
  productDescriptionContainer.appendChild(price);
  productDescriptionContainer.appendChild(description);
  productDescriptionContainer.appendChild(hr);
  productDescriptionContainer.appendChild(buttonContainer);

  // Append all containers to the productWrapper
  productWrapper.appendChild(secondaryImagesContainer);
  productWrapper.appendChild(mainImageContainer);
  productWrapper.appendChild(productDescriptionContainer);
};

// Function to change the main image
const changeMainImage = (imageUrl) => {
  document.getElementById("main-image").src = imageUrl;
};

document.addEventListener("productsLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  const product = products[index];
  if (product) {
    displayProduct(product);
  }
});
