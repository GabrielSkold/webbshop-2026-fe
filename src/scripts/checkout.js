import { getCart, updateCartCount } from "../utils/cartUtils.js";

const checkoutContainer = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");
const placeOrderButton = document.querySelector("#place-order-button");

const renderCheckout = () => {
  if (!checkoutContainer) {
    return;
  }
  const cart = getCart();

  if (cart.length === 0) {
    checkoutContainer.innerHTML = `<p>No items in cart</p>`;

    if (checkoutTotal) {
      checkoutTotal.textContent = "";
    }

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
    return;
  }

  checkoutContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Size: ${item.size}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: ${item.price}kr</p>
    </div>
  `,
    )
    .join("");

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (checkoutTotal) {
    checkoutTotal.textContent = `Total: ${total}kr`;
  }

  if (placeOrderButton) {
    placeOrderButton.disabled = false;
  }
};
updateCartCount();
renderCheckout();
