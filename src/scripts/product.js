import { getProducts } from "../utils/productsApi.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id)

const container = document.querySelector("#product-detail");

const imageElement = container.querySelector(".product-detail__image");
const titleElement = container.querySelector("h1");
const priceElement = container.querySelector("p");

const getProductById = async (id) => {
    const products = await getProducts();

    const product = products.find(product => product._id === id);
    console.log(product);
    // safety check
    if (!product) {
        container.innerHTML = "<p>Product not found</p>"
        return;
    }

    imageElement.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
    titleElement.textContent = product.name;
    priceElement.textContent = `$${product.price}`;

    const productStatus = container.querySelector("#product-status");

    if(product.stock > 0) {
        productStatus.textContent = `In stock: (${product.stock}) left`;
    } else {
        productStatus.textContent = "Out of stock";
    }
}
getProductById(id);