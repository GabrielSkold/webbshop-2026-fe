import { updateCartCount } from "../utils/cartUtils.js";
import { showToast } from "../utils/toast.js";
import { getWishlist, removeFromWishlist } from "../utils/wishlistApi.js";

updateCartCount();

export const updateWishlistCount = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const wishlist = await getWishlist().catch(() => []);
  const wishlistLink = document.querySelector("#wishlist-link");
  if (wishlistLink) {
    wishlistLink.innerHTML = `<i class="fa-solid fa-heart"></i> (${wishlist.length})`;
  }
};

const renderWishlistItems = async () => {
  const wishlistContainer = document.querySelector("#wishlist-container");
  if (!wishlistContainer) return;

  const token = localStorage.getItem("token");
  if (!token) {
    wishlistContainer.innerHTML =
      "<p>You need to be logged in to view your wishlist.</p>";
    return;
  }

  let wishlist = [];
  try {
    wishlist = await getWishlist();
    console.log(wishlist);
  } catch {
    wishlistContainer.innerHTML = "<p>Could not load wishlist.</p>";
    return;
  }

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty</p>";
    return;
  }

  wishlistContainer.innerHTML = wishlist
    .map(
      (item) => `
        <div class="wishlist-item-wrapper">
          <a class="product-href" href="product.html?slug=${item.product.slug}">
            <article class="product-card">
              <div class="product-card__image"
                style="background-image: url('${item.product.images[0]?.url}')">
                  <p class="products-card-drop-status">${item.product.dropStatus}</p>
                  <div>
                    <h3 class="product-card__name">${item.product.name}</h3>
                    <p class="product-card__price">${item.product.price}:-</p>
                  </div>
              </div>
            </article>
          </a>
          <button class="btn-primary remove-wishlist-btn" data-id="${item._id}">
            Remove from wishlist
          </button>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll(".remove-wishlist-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const wrapper = button.closest(".wishlist-item-wrapper");
      wrapper.remove();
      showToast(`Removed from wishlist`);
      try {
        await removeFromWishlist(button.dataset.id);
        await updateWishlistCount();
        await renderWishlistItems();
      } catch {
        showToast("Could not remove item from wishlist.");
      }
    });
  });
};

updateWishlistCount();
renderWishlistItems();
