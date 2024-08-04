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



// Search, Filter And Sort Function

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
  e.preventDefault(); // Add this line to prevent the default behavior for button click
  const searchTerm = searchInput.value.trim();
  const productsWrapper = document.getElementById("card");
  productsWrapper.innerHTML = ""; // Clear the products wrapper

  if (searchTerm === "") {
    // Don't show any products if the input field is empty
  } else {
    searchProducts(searchTerm); // Show filtered products if the input field is not empty
  }
}

// Attach event listeners to the search input field and search button
searchInput.addEventListener("input", handleSearchEvent);
searchButton.addEventListener("click", handleSearchEvent);


// // Attach an event listener to the search input field
// searchInput.addEventListener("input", (e) => {
//   const searchTerm = e.target.value.trim();
//   searchProducts(searchTerm);
// });

// // Attach an event listener to the search button
// searchButton.addEventListener("click", (e) => {
//   e.preventDefault(); // Add this line to prevent the default behavior
//   const searchTerm = searchInput.value.trim();
//   const productsWrapper = document.getElementById("card");
//   productsWrapper.innerHTML = ""; // Clear the products wrapper

//   if (searchTerm === "") {
//     // Don't show any products if the input field is empty
//   } else {
//     searchProducts(searchTerm); // Show filtered products if the input field is not empty
//   }
// });



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

    categoriesWrapper.appendChild(checkboxWrapper);


    // Attach an event listener to the checkbox
    checkbox.addEventListener('click', () => {
      const checkedCategories = [];
      const productsWrapper = document.getElementById("card");
      productsWrapper.innerHTML = "";

      // Get all the checked categories
      const categoryCheckboxes = document.querySelectorAll('.filter');
      categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          checkedCategories.push(checkbox.value);
        }
      });

      // Filter the products based on the checked categories
      const filteredProducts = products.filter(product => {
        return checkedCategories.includes(product.category);
      });

      // If no categories are checked, show all products
      if (checkedCategories.length === 0) {
        products.forEach(product => {
          createProduct(product);
        });
      } else {
        filteredProducts.forEach(product => {
          createProduct(product);
        });
      }
    });
  });
};



// Sort Products By Price 

// Get the price checkboxes
const priceCheckboxes = document.querySelectorAll('#allPrices input[type="checkbox"]');

// Add an event listener to the price checkboxes
priceCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    const checkedPrices = [];
    const productsWrapper = document.getElementById("card");
    productsWrapper.innerHTML = "";

    // Get the checked prices
    priceCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedPrices.push(checkbox.id);
      }
    });

    // Sort the products based on the checked prices
    let sortedProducts = products;
    if (checkedPrices.includes('asc')) {
      sortedProducts = products.sort((a, b) => a.price - b.price);
    } else if (checkedPrices.includes('des')) {
      sortedProducts = products.sort((a, b) => b.price - a.price);
    }

    // Create the products
    sortedProducts.forEach(product => {
      createProduct(product);
    });
  });
});

