import { getProducts } from "../utils/productsApi.js";

const container = document.querySelector("#products");

const init = async () => {
    if(!container) return;

    container.innerHTML = "<p>Loading...</p>";

    const products = await getProducts();
    console.log(products);

    container.innerHTML = products.map(product => `
        <div>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        </div>
    `).join("");
}
init();