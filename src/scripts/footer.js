const footer = document.querySelector(".site-footer");

footer.innerHTML = `
    <div class="footer-content">
        <div class="footer-links">
        <a href="/news.html">News</a>
            <a href="/about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
        <div class="footer-links">
            <a href="policypage.html">Terms & Policies</a>
            <a href="/delivery.html">Shipping & Delivery</a>
            <a href="/returns.html">Returns & Exchanges</a>
            </div>
            <div class="footer-links">
            <a href="/help.html">Help</a>
            <a href="/guide.html">Size guide</a>
            <a href="/payment.html">Payment methods</a>
        </div>
    </div>`;

document.body.append(footer);