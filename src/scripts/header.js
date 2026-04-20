const header = document.querySelector(".site-header");

header.innerHTML = `
    <nav class="underheader">
        <ul class="brand-links">
            <li><a href="products.html?brand=Nike">Nike</a></li>
            <li><a href="products.html?brand=Jordan">Jordan</a></li>
            <li><a href="products.html?brand=Adidas">Adidas</a></li>
            <li><a href="products.html?brand=New Balance">New Balance</a></li>
            <li><a href="products.html?brand=Crocs">Crocs</a></li>
            <li><a href="products.html?brand=Nike">Nike</a></li>
            <li><a href="products.html?brand=Jordan">Jordan</a></li>
            <li><a href="products.html?brand=Adidas">Adidas</a></li>
            <li><a href="products.html?brand=New Balance">New Balance</a></li>
            <li><a href="products.html?brand=Crocs">Crocs</a></li>
        </ul>
    </nav>
    <nav class="overheader">
        <a href="index.html" class="logo">SOLE SEARCH.</a>
        <div class="header-links">
            <a href="products.html?dropStatus=Upcoming">Upcoming</a>
            <a href="products.html?dropStatus=Live">Live</a>
            <a href="products.html">All Sneakers</a>
        </div>
        <div class="nav-links">
            <div class="nav-icons">
                <a id="cart-link" href="shoppingcart.html"><i class="fa-solid fa-cart-shopping"></i>(0)</a>
                <a id="user-link" href="loginpage.html"><img src="/public/user-icon.png" alt="user"></a>
                <li><a id="wishlist-link" href="wishlist.html"><i class="fa-solid fa-heart"></i></a></li>
                <a href="admin.html">Admin</a>
            </div>
            <button class="hamburgermenu"><i class="fa-solid fa-bars"></i></button>
        </div>
    </nav>
`;

document.body.append(header);

document.addEventListener("DOMContentLoaded", () => {
    const userLink = document.getElementById("user-link");

    const token = localStorage.getItem("token");

    if(token) {
        userLink.href = "/profilepage.html";
        const loginLogo = document.querySelector("#user-link")
        loginLogo.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
});




