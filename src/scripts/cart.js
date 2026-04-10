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