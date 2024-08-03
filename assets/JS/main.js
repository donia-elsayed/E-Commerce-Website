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
const displayCategories = () => {
  const categories = [...new Set(products.map((product) => product.category))];
  categories.forEach((category) => {
    const categoriesWrapper = document.getElementById("categories-warapper");
    categoriesWrapper.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
        <label class="form-check-label" for="${category}">
            ${category}
        </label>
      </div>`;
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
  const classes = category === "smartphones" ? ["w-40", "vh-35"] : ["w-75"];
  classes.forEach((cls) => productImg.classList.add(cls));
  imgWrapper.appendChild(productImg);

  productWrapper.appendChild(imgWrapper);
  // Create the icon wrapper
  const iconsWrapper = document.createElement("div");
  iconsWrapper.classList.add("d-flex", "flex-column");
  iconsWrapper.innerHTML = `
      <a href="#"><i class="fa-solid fa-heart mb-2"></i></a>
      <a href="#"><i class="fa-solid fa-eye"></i></a>`;
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
