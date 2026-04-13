export const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalCount = cart.reduce((sum, item) => {
    return sum + (item.quantity || 0);
  }, 0);

  const cartLink = document.querySelector("#cart-link");

  if (cartLink) {
    cartLink.textContent = `Cart (${totalCount})`;
  }
};

const renderCartItems = () => {
  const cartContainer = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");

  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";

    if (cartTotal) {
      cartTotal.textContent = "";
    }
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}"/>
            <h3>${item.name}</h3>
            <p>Size: ${item.size}</p>
            <p>Price: ${item.price}kr</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        </div>   
    `,
    )
    .join("");

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cartTotal) {
    cartTotal.textContent = `Total: ${total}kr`;
  }
  const removeItem = document.querySelectorAll(".remove-btn");

  removeItem.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });
  });
};

updateCartCount();
renderCartItems();
