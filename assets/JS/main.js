const baseUrl = "https://dummyjson.com/products/category";
const apiUrls = [
  `${baseUrl}/smartphones?skip=4`,
  `${baseUrl}/mens-shirts`,
  `${baseUrl}/laptops`,
  `${baseUrl}/womens-dresses`,
  `${baseUrl}/mens-watches`,
  `${baseUrl}/womens-bags`,
];

const fatchAllProducts = async () => {
  const allResult = await Promise.all(
    apiUrls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    })
  );
  const allProducts = allResult.flatMap((result) => result.products || result);
  return allProducts;
};

export const products = [];
const displayProducts = async () => {
  const allProducts = await fatchAllProducts();
  products.push(...allProducts);
  products.forEach((product) => {
    createProduct(product);
  });
  displayCategories();
};

// function of addToCart and saving it to local storage
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
    
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

const displayCategories = () => {
  const categories = [...new Set(products.map((product) => product.category))];
  const categoriesWrapper = document.getElementById("categories-warapper");
  categories.forEach((category) => {
    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("form-check");
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input", "filter");
    checkbox.type = "checkbox";
    checkbox.value = `${category}`;
    checkbox.id = `${category}`;

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.htmlFor = `${category}`;
    label.textContent = `${category}`;

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);

    categoriesWrapper.appendChild(checkboxWrapper);
  });
};

const createProduct = (product) => {
  const { title, images, price, description, category } = product;
  const card = document.getElementById("card");
  // Create the main container
  const productWrapper = document.createElement("div");
  productWrapper.classList.add("col-lg-3", "col-md-6", "col-sm-12");
  // Create the image wrapper
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("product__img__wrapper", "text-center", "rounded-3");
  // Create the image element
  const productImg = document.createElement("img");
  productImg.setAttribute("src", images[0]);
  const classes =
    product.category === "smartphones" ? ["w-40", "vh-35"] : ["w-75"];
  classes.forEach((cls) => productImg.classList.add(cls));
  imgWrapper.appendChild(productImg);

  productWrapper.appendChild(imgWrapper);
  // Create the icon wrapper
  const iconsWrapper = document.createElement("div");
  iconsWrapper.classList.add("d-flex", "flex-column");
  // Create heart icon link
  const heartIconLink = document.createElement("a");
  heartIconLink.setAttribute("href", "#");
  // Create heart icon
  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-solid", "fa-heart", "mb-2");
  // Append heart icon to heartIconLink
  heartIconLink.appendChild(heartIcon);
  // Create eye icon link
  const eyeIconLink = document.createElement("a");
  eyeIconLink.setAttribute("href", "#");
  // Create eye icon
  const eyeIcon = document.createElement("i");
  eyeIcon.classList.add("fa-solid", "fa-eye");
  eyeIconLink.appendChild(eyeIcon);
  iconsWrapper.appendChild(heartIconLink);
  iconsWrapper.appendChild(eyeIconLink);
  imgWrapper.appendChild(iconsWrapper);

  // Create "Add to Cart" button
  const addToCartBtn = document.createElement("button");
  addToCartBtn.setAttribute("type", "button");
  addToCartBtn.classList.add(
    "btn",
    "btn__addToCart",
    "d-block",
    "mx-auto",
    "w-100",
    "mt-2"
  );
  addToCartBtn.innerText = "Add To Cart";
  addToCartBtn.setAttribute("data-id", product.id);
  addToCartBtn.addEventListener("click", () => addToCart(product));
  productWrapper.appendChild(addToCartBtn);

  // Create product details
  const productDetails = document.createElement("div");
  productDetails.classList.add("d-flex", "justify-content-lg-between", "my-3");
  const productTitle = document.createElement("h5");
  productTitle.innerText = `${title}`;
  const productPrice = document.createElement("span");
  productPrice.innerText = `${price}`;
  productPrice.classList.add("product__price");
  productDetails.appendChild(productTitle);
  productDetails.appendChild(productPrice);
  productWrapper.appendChild(productDetails);

  // Create product description
  const productDescription = document.createElement("p");
  productDescription.innerText = `${description}`;
  productWrapper.appendChild(productDescription);
  card.appendChild(productWrapper);
};
displayProducts();
