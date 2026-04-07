document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector("#logoutBtn");

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "/loginpage.html"
    });
});