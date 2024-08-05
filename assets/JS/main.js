const baseUrl = "https://dummyjson.com/products/category";
const apiUrls = [
  `${baseUrl}/laptops`,
  `${baseUrl}/mens-shirts`,
  `${baseUrl}/mens-watches`,
  `${baseUrl}/womens-dresses`,
  `${baseUrl}/womens-bags`,
  `${baseUrl}/smartphones?skip=4`,
];

export const products = [];
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

const displayProducts = async () => {
  const allProducts = await fatchAllProducts();
  products.push(...allProducts);
  document.dispatchEvent(new Event("productsLoaded"));
  products.forEach((product) => {
    createProduct(product);
  });
  displayCategories();
};

// function of addToCart and saving it to local storage
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

const createProduct = (product) => {
  const { title, images, price, description, category, id } = product;
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
    category === "smartphones" ? ["w-30", "vh-30"] : ["w-75", "vh-30"];
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
  eyeIconLink.addEventListener("click", () => navigateToDetails(id));
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
  if (window.location.href.includes("index.html")) {
    card.appendChild(productWrapper);
  }
};

// Create a function to search products
const searchProducts = (searchTerm) => {
  const productsWrapper = document.getElementById("card");
  productsWrapper.innerHTML = "";

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  filteredProducts.forEach((product) => {
    createProduct(product);
  });
};

// Get the search input field
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Function to handle search input and button click
function handleSearchEvent(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  const productsWrapper = document.getElementById("card");
  productsWrapper.innerHTML = "";

  if (searchTerm === "" && e.type === "click") {
    // Show all products if the input field is empty and the button is clicked
    products.forEach((product) => {
      createProduct(product);
    });
  } else {
    searchProducts(searchTerm); // Show filtered products if the input field is not empty
  }
}

// Attach event listeners to the search button
if (searchInput) {
  searchInput.addEventListener("input", handleSearchEvent);
}

// Filter Products By Categories by js

const displayCategories = () => {
  const categories = [...new Set(products.map((product) => product.category))];
  const categoriesWrapper = document.getElementById("categories-warapper");
  categories.forEach((category) => {
    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "form-check";
    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input filter";
    checkbox.type = "checkbox";
    checkbox.value = category;
    checkbox.id = category;

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = category;
    label.textContent = category;

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    if (window.location.href.includes("index.html")) {
      categoriesWrapper.appendChild(checkboxWrapper);
    }
    // Attach an event listener to the checkbox
    checkbox.addEventListener("click", () => {
      const checkedCategories = [];
      const productsWrapper = document.getElementById("card");
      productsWrapper.innerHTML = "";

      // Get all the checked categories
      const categoryCheckboxes = document.querySelectorAll(".filter");
      categoryCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkedCategories.push(checkbox.value);
        }
      });

      // Filter the products based on the checked categories
      const filteredProducts = products.filter((product) => {
        return checkedCategories.includes(product.category);
      });

      // If no categories are checked, show all products
      if (checkedCategories.length === 0) {
        products.forEach((product) => {
          createProduct(product);
        });
      } else {
        filteredProducts.forEach((product) => {
          createProduct(product);
        });
      }
    });
  });
};

// Sort Products By Price
const priceCheckboxes = document.querySelectorAll(
  '#allPrices input[type="checkbox"]'
);

// Add an event listener to the price checkboxes
priceCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const checkedPrices = [];
    const productsWrapper = document.getElementById("card");
    productsWrapper.innerHTML = "";

    // Get the checked prices
    priceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedPrices.push(checkbox.id);
      }
    });

    // If neither checkbox is checked, display all products in their natural order
    if (checkedPrices.length === 0) {
      products.forEach((product) => {
        createProduct(product);
      });
    } else {
      // Create a copy of the products array
      const productsCopy = products.slice();

      // Sort the copy of the products array based on the checked prices
      if (checkedPrices.includes("asc")) {
        productsCopy.sort((a, b) => a.price - b.price);
      } else if (checkedPrices.includes("des")) {
        productsCopy.sort((a, b) => b.price - a.price);
      }

      // Create the products from the sorted copy of the array
      productsCopy.forEach((product) => {
        createProduct(product);
      });
    }
  });
});
const navigateToDetails = (productId) => {
  window.location.href = `product-details.html?id=${productId}`;
};
document.addEventListener("DOMContentLoaded", displayProducts);
