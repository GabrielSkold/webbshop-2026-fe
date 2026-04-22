import { getCart, saveCart, updateCartCount } from "../utils/cartUtils.js";
import { updateWishlistCount } from "./wishlist.js";
updateWishlistCount();
updateCartCount();


const renderCartItems = () => {
  const cartContainer = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");

  if (!cartContainer) return;

  const cart = getCart();
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
        <div class="cart-item-wrapper">
          <article class="product-card">
            <div class="product-card__image"
              style="background-image: url('${item.image}')">
              <span></span>
              <div>
                <h3 class="product-card__name">${item.name}</h3>
                <p class="product-card__price">${item.price}kr</p>
              </div>
            </div>
          </article>
          <div class="cart-item-details">
            <p class="cart-item-size">Size: ${item.size}</p>
            <div class="cart-item-qty">
              <button class="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>
          </div>
          <button class="btn-primary remove-btn" data-index="${index}">Remove from cart</button>
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
  const removeButtons = cartContainer.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart.splice(index, 1);

      saveCart(cart);
      updateCartCount();
      renderCartItems();
    });
  });

  const increaseButtons = cartContainer.querySelectorAll(".increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cart = getCart();
      const index = Number(button.dataset.index);
      cart[index].quantity++;

      saveCart(cart);
      updateCartCount();
      renderCartItems();
    });
  });

  const decreaseButtons = cartContainer.querySelectorAll(".decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cart = getCart();
      const index = Number(button.dataset.index);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      }

      saveCart(cart);
      updateCartCount();
      renderCartItems();
    });
  });
};

updateCartCount();
renderCartItems();
