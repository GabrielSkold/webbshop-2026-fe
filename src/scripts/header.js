const header = document.querySelector(".site-header");

header.innerHTML = `
    <nav class="overheader">
        <a href="index.html" class="logo">SOLE SEARCH <i class="fa-brands fa-tiktok"></i></a>
        <div class="div-links">
            <div class="div-searchbar">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
                <input id="search-bar" placeholder="Search" />
            </div>
            <ul class="nav-links">
                <li><a id="cart-link" href="shoppingcart.html"><i class="fa-solid fa-cart-shopping"></i>(0)</a></li>
                <li><a id="wishlist-link" href="wishlist.html"><i class="fa-solid fa-heart"></i></a></li>
                <li><a id="user-link" href="loginpage.html">Log in</a></li>
            </ul>
            <button class="hamburgermenu"><i class="fa-solid fa-bars"></i></button>
        </div>
    </nav>
    <nav class="underheader">
        <ul class="brand-links">
            <li><a href="products.html">Home</a></li>
            <li class="allShoes">
                <a href="products.html">All shoes</a>
                <ul class="dropdown-allShoes">
                    <li><a href="products.html?dropStatus=Live">Live</a></li>
                    <li><a href="products.html?dropStatus=Upcoming">Upcoming</a></li>
                    <li><a href="products.html">New in</a></li>
                </ul>
            </li>
            <li><a href="products.html?dropStatus=Live">Live</a></li>
            <li><a href="products.html?dropStatus=Upcoming">Upcoming</a></li>
            <li><a href="products.html">New in</a></li>
        </ul>
    </nav>`;

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




