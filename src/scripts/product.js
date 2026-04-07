import { getProducts } from "../utils/productsApi.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let selectedSize = null;

const container = document.querySelector("#product-detail");
const imageElement = container.querySelector(".product-detail__image");
const titleElement = container.querySelector("h1");
const priceElement = container.querySelector("p");
const addToCartButton = container.querySelector("#addToCartBtn");
const sizeSelect = container.querySelector("#size-selector");
const productStatus = container.querySelector("#product-status");

const getProductById = async (id) => {
  const products = await getProducts();
  const product = products.find((product) => product._id === id);

  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  imageElement.innerHTML = `<img src="${product.images[0].url}" alt="${product.name}" />`;
  titleElement.textContent = product.name;
  priceElement.textContent = `$${product.price}`;

  // Initial state innan size är vald
  addToCartButton.disabled = true;
  addToCartButton.textContent = "Select size";
  productStatus.textContent = "Choose a size";

  // Rendera size-knappar
  sizeSelect.innerHTML = product.sizes
    .map(
      (size) => `
        <button data-size="${size.size}">
          ${size.size}
        </button>
      `
    )
    .join("");

  const sizeButtons = sizeSelect.querySelectorAll("button");

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // removes active from all buttons
        sizeButtons.forEach(btn => btn.classList.remove("active"));
        
        // adds active state if button is clicked
        button.classList.add("active");

        // Saves selected size
        selectedSize = button.dataset.size;
        console.log("Selected size:", selectedSize);

        // finds the right selected size
        const selectedSizeObject = product.sizes.find(
            (size) => String(size.size) === selectedSize
        );

        console.log("Selected size object:", selectedSizeObject);

        // updates UI depending on stock
        if (selectedSizeObject.stock > 0) {
            productStatus.textContent = `In stock: ${selectedSizeObject.stock} left`;
            addToCartButton.disabled = false;
            addToCartButton.textContent = "Add to cart";
        } else {
            productStatus.textContent = "Out of stock";
            addToCartButton.disabled = true;
            addToCartButton.textContent = "Out of stock";
        }
    })
  });

  addToCartButton.addEventListener("click", () => {
    if (!selectedSize) return;
    console.log(`Added ${product.name}, size ${selectedSize} to the cart`);

    const item = {
        productId: product._id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: 1
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart === null) {
        cart = []
    }

    const existingItem = cart.find(cartItem =>
        cartItem.productId === item.productId && 
        cartItem.size === item.size
    );

    if(existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  });

  console.log("product object:", product);
  console.log("product.stock:", product.stock);
  console.log("sizes:", product.sizes);
};

getProductById(id);