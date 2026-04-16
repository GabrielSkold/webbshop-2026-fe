const header = document.querySelector(".site-header");

header.innerHTML = `
    <nav class="underheader">
        <ul class="brand-links">
            <li><a href="products.html?dropStatus=Upcoming">Nike</a></li>
            <li><a href="products.html?dropStatus=Live">Jordan</a></li>
            <li><a href="products.html?dropStatus=Upcoming">Adidas</a></li>
            <li><a href="products.html?dropStatus=Live">New Balance</a></li>
            <li><a href="products.html?dropStatus=Upcoming">Asics</a></li>
            <li><a href="products.html?dropStatus=Live">Vans</a></li>
            
            <li><a href="products.html?dropStatus=Upcoming">Nike</a></li>
            <li><a href="products.html?dropStatus=Live">Jordan</a></li>
            <li><a href="products.html?dropStatus=Upcoming">Adidas</a></li>
            <li><a href="products.html?dropStatus=Live">New Balance</a></li>
            <li><a href="products.html?dropStatus=Upcoming">Asics</a></li>
            <li><a href="products.html?dropStatus=Live">Vans</a></li>
        </ul>
    </nav>
    <nav class="overheader">
        <a href="index.html" class="logo">SOLE SEARCH.</a>
        <div class="header-links">
            <a href="products.html?dropStatus=Upcoming">Upcoming</a>
            <a href="products.html">New in</a>
            <a href="products.html?dropStatus=Live">Live</a>
        </div>
        <div class="nav-links">
            <div class="nav-icons">
                <a id="cart-link" href="shoppingcart.html"><i class="fa-solid fa-cart-shopping"></i>(0)</a>
                <a id="user-link" href="loginpage.html"><img src="/public/user-icon.png" alt="user"></a>
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




