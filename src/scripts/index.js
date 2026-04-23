import { getProducts } from "../utils/productsApi.js";
import { updateWishlistCount } from "./wishlist.js";
import { initHeroShelf } from "./heroShelf.js";
updateWishlistCount();
initHeroShelf();

const upcomingContainer = document.getElementById("upcoming-products");
const liveContainer = document.getElementById("live-products");

function getStatusLabel(product) {
  if (product.dropStatus === "Upcoming" && product.dropAt) {
    const raw = product.dropAt?.$date ?? product.dropAt;
    return new Date(raw).toLocaleDateString("sv-SE");
  }
  return product.dropStatus;
}

function renderGrid(products, container) {
  container.innerHTML = products
    .map(
      (product) => `
        <a class="product-href" href="product.html?slug=${product.slug}">
          <article class="product-card">
            <div class="product-card__image"
              style="background-image: url('${product.images[0]?.url}')">
                <p class="products-card-drop-status">${getStatusLabel(product)}</p>
                <div>
                  <h3 class="product-card__name">${product.name}</h3>
                  <p class="product-card__price">${product.price}:-</p>
                </div>
            </div>
          </article>
        </a>
      `
    )
    .join("");
}

async function init() {
  try {
    const products = await getProducts();
    const upcoming = products
      .filter((p) => p.dropStatus === "Upcoming")
      .sort((a, b) => {
        const dateA = new Date(a.dropAt?.$date ?? a.dropAt);
        const dateB = new Date(b.dropAt?.$date ?? b.dropAt);
        return dateA - dateB;
      });
    const live = products.filter((p) => p.dropStatus === "Live");

    renderGrid(upcoming, upcomingContainer);
    renderGrid(live, liveContainer);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

init();

