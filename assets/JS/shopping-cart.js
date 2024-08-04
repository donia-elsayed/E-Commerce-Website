const displayCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("product__tbody");

  if (cart.length === 0) {
    cartList.innerHTML = "<p class='my-2 text-danger'>No products Exist</p>";
  } else {
    cart.forEach((element) => {
    createProduct(element);
    });
  }
  updateCartTotal();
};

const createProduct = (product) => {
  const { title, price, images } = product;
  const tr = document.createElement("tr");
  tr.classList.add("align-middle");

  const tdDetails = document.createElement("td");
  const img = document.createElement("img");
  img.src = images[0];
  img.alt = ` photo of ${title}`;
  img.classList.add("w-25");
  tdDetails.appendChild(img);
  const span = document.createElement("span");
  span.textContent = title;
  tdDetails.classList.add("w-35");
  tdDetails.appendChild(span);

  const tdPrice = document.createElement("td");
  tdPrice.textContent = `${price}$`;

  const tdQuantity = document.createElement("td");
  const minusButton = document.createElement("button");
  minusButton.type = "button";
  minusButton.classList.add("btn", "border-secondary", "text-center");
  minusButton.textContent = "-";

  const quantitySpan = document.createElement("span");
  quantitySpan.classList.add("text-center", "m-2");
  quantitySpan.textContent = product.quantity;

  const plusButton = document.createElement("button");
  plusButton.type = "button";
  plusButton.classList.add("btn", "border-secondary", "text-center");
  plusButton.textContent = "+";
  tdQuantity.appendChild(minusButton);
  tdQuantity.appendChild(quantitySpan);
  tdQuantity.appendChild(plusButton);

  const tdSubtotal = document.createElement("td");
  tdSubtotal.textContent = `${price * product.quantity}$`;

  const tdIcon = document.createElement("td");
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-trash", "fs-4", "remove-icon");
  tdIcon.appendChild(removeIcon);
  // Append the elements to the table row
  tr.appendChild(tdDetails);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdSubtotal);
  tr.appendChild(tdIcon);

  const tbodyElement = document.getElementById("product__tbody");
  tbodyElement.appendChild(tr);

  const tableElement = document.getElementById("product__table");
  tableElement.appendChild(tbodyElement);

  let quantity = 1;
  
  // Event listener for the plus button
  plusButton.addEventListener('click', () => {
    product.quantity++;
    quantitySpan.textContent = product.quantity;
    tdSubtotal.textContent = `${price * product.quantity}$`;
    updateCart(product);
    updateCartTotal();
  });

  // Event listener for the minus button
  minusButton.addEventListener('click', () => {
    if (product.quantity > 1) {
      product.quantity--;
      quantitySpan.textContent = product.quantity;
      tdSubtotal.textContent = `${price * product.quantity}$`;
      updateCart(product);
      updateCartTotal();
    }
  });

  // Event listener for the remove icon
  removeIcon.addEventListener('click', () => {
    removeFromCart(product);
    tr.remove();
    updateCartTotal();
  });
};


const updateCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => 
    item.id === product.id ? { ...item, quantity: product.quantity } : item
  );
  localStorage.setItem("cart", JSON.stringify(cart));
};

const removeFromCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.title !== product.title);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateCartTotal = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cart.forEach(item => {
    total += item.price * (item.quantity || 1);
  });
  document.getElementById("total").textContent = `$${total}`;
  
  document.getElementById("total2").textContent = `$${total}`;
};

document.addEventListener("DOMContentLoaded", displayCart);
