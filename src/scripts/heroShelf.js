import { getProducts } from "../utils/productsApi.js";

const VISIBLE = 5;
let activeIndex = 0;
let products = [];
let countdownInterval = null;

let shelfEl, countdownEl, nameEl, shopBtn;

function updateInfo() {
  const product = products[activeIndex];
  if (!product) return;

  if (nameEl) nameEl.textContent = [product.brand, product.name].filter(Boolean).join(" · ");
  if (shopBtn) shopBtn.href = `product.html?slug=${product.slug}`;

  clearInterval(countdownInterval);

  if (product.dropStatus === "Upcoming" && product.dropAt) {
    const raw = product.dropAt?.$date ?? product.dropAt;
    const tick = () => {
      const diff = Math.max(0, new Date(raw) - new Date());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countdownEl.textContent = `${String(d).padStart(2, "0")}d  ${String(h).padStart(2, "0")}h  ${String(m).padStart(2, "0")}m  ${String(s).padStart(2, "0")}s`;
    };
    tick();
    countdownInterval = setInterval(tick, 1000);
  } else if (product.dropStatus === "DropEnd" && product.dropEnd) {
    const raw = product.dropEnd?.$date ?? product.dropEnd;
    countdownEl.textContent = `Drop Ended (${new Date(raw).toLocaleDateString("sv-SE")})`;
  } else {
    countdownEl.textContent = product.dropStatus || "";
  }
}

function buildShelf() {
  shelfEl.innerHTML = "";

  const half = Math.floor(VISIBLE / 2);
  const start = Math.min(Math.max(activeIndex - half, 0), Math.max(products.length - VISIBLE, 0));
  const end = Math.min(start + VISIBLE, products.length);

  products.slice(start, end).forEach((product, i) => {
    const globalIndex = start + i;
    const item = document.createElement("div");
    item.className = "shelf-item" + (globalIndex === activeIndex ? " active" : "");

    const img = document.createElement("img");
    img.src = product.imageUrl;
    item.appendChild(img);

    item.addEventListener("click", () => {
      if (globalIndex === activeIndex) {
        window.location.href = `product.html?slug=${product.slug}`;
      } else {
        activeIndex = globalIndex;
        buildShelf();
        updateInfo();
      }
    });

    shelfEl.appendChild(item);
  });

  updateInfo();
}

export async function initHeroShelf() {
  shelfEl = document.getElementById("hero-shelf");
  countdownEl = document.getElementById("hero-countdown");
  nameEl = document.getElementById("name");
  shopBtn = document.getElementById("hero-shop-btn");
  if (!shelfEl) return;

  const allProducts = await getProducts();
  products = allProducts
    .filter((p) => p.dropStatus === "Upcoming")
    .map((p) => ({
      imageUrl: p.images?.[0]?.url || "",
      name: p.name,
      brand: p.brand,
      slug: p.slug,
      dropStatus: p.dropStatus,
      dropAt: p.dropAt,
      dropEnd: p.dropEnd,
    }))
    .sort((a, b) => {
      const aDate = new Date(a.dropAt?.$date ?? a.dropAt);
      const bDate = new Date(b.dropAt?.$date ?? b.dropAt);
      return aDate - bDate;
    });

  if (!products.length) {
    document.querySelector(".hero-shelf-section")?.remove();
    return;
  }

  buildShelf();

  document.getElementById("hero-prev").addEventListener("click", () => {
    if (activeIndex <= 0) return;
    activeIndex--;
    buildShelf();
  });

  document.getElementById("hero-next").addEventListener("click", () => {
    if (activeIndex >= products.length - 1) return;
    activeIndex++;
    buildShelf();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") document.getElementById("hero-prev").click();
    if (e.key === "ArrowRight") document.getElementById("hero-next").click();
  });
}
