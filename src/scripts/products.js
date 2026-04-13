import { getProducts } from "../utils/productsApi.js";
import { updateCartCount } from "./cart.js";
updateCartCount();
const container = document.querySelector("#products");

const init = async () => {
  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";
  try {
    const products = await getProducts();
    if (products.length === 0) {
      container.innerHTML = "No products found.";
      return;
    }
    console.log(products);

    container.innerHTML = products
      .map(
        (product) => `
            <a class="product-href" href="product.html?id=${product._id}">
                <article class="product-card">
                    <img
                        class="product-card__image"
                        src="${product.images}"
                        alt="${product.name}"
                    />
                    <div class="product-card__body">
                        <h3>${product.name}</h3>
                        <p class="product-card__price">$${product.price}</p>
                        <p>${product.dropStatus}</p>
                        <p>${product.dropAt}</p>
                    </div>
                </article>
            </a>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Failed to load products:", error);
    console.log(error);

    container.innerHTML = `
        <p style="color: red;">Failed to load products. Please try again.</p>
        `;
  }
};
init();
