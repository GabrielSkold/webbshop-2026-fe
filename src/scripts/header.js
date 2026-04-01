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
                <li><a href="shoppingcart.html"><i class="fa-solid fa-cart-shopping"></i></a></li>
                <li><a href="loginpage.html"><i class="fa-solid fa-user"></i></a></li>
                <li><a href="admin.html">Admin</a></li>
            </ul>
            <button class="hamburgermenu"><i class="fa-solid fa-bars"></i></button>
        </div>
    </nav>
    <nav class="underheader">
        <ul class="brand-links">
            <li><a href="products.html">Home</a></li>
            <li><a href="products.html">Men</a></li>
            <li><a href="products.html">Women</a></li>
            <li><a href="products.html">All shoes</a></li>
            <li><a href="products.html">Upcoming</a></li>
            <li><a href="products.html">New in</a></li>
        </ul>
    </nav>`;

document.body.append(header);
