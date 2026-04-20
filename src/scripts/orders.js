import { getProfile } from "../utils/userApi.js";
import { getOrdersByUser } from "../utils/ordersApi.js";
import { updateCartCount } from "../utils/cartUtils.js";

updateCartCount();

const container = document.querySelector("#orders-list");

const init = async () => {
  if (!container) return;

  container.innerHTML = "<p>Loading orders...</p>";

  try {
    // 1. Fetch user
    const profile = await getProfile();
    console.log("PROFILE:", profile);

    const userId = profile.data._id;

    // Fetch orders
    const orders = await getOrdersByUser(userId);
    console.log("ORDERS:", orders);

    // Empty list
    if (orders.length === 0) {
      container.innerHTML = "<p>No orders found</p>";
      return;
    }

    // Render
    container.innerHTML = orders
      .map((order) => {
        const itemsHTML = order.items
          .map(
            (item) => `
    <div class="order-item">
      <p>Size: ${item.size}</p>
      <p>Price: ${item.unitPrice}kr</p>
    </div>
  `,
          )
          .join("");

        const total = order.items.reduce((sum, item) => {
          return sum + item.unitPrice * item.quantity;
        }, 0);

        return `
        <div class="order-card">
        <h3>Order ID: ${order._id}</h3>
        <p>Status: ${order.orderStatus}</p>
        <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>

        <div class="order-items">
            ${itemsHTML}
        </div>
        <p><strong>Total:</strong> ${total}kr</p>
        </div>
    `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to load orders:", error);
    container.innerHTML = "<p>Failed to load orders</p>";
  }
};

init();
