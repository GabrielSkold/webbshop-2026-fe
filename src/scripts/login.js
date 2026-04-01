const forgotBtn = document.querySelector(".forgotBtn");
const mainForgot = document.querySelector(".forgot-main")

forgotBtn.addEventListener("click", () => {
    const oldPassword = document.querySelector("#password").value;
    const newPassword = document.querySelector("#newPassword").value;

    if(oldPassword === newPassword){
        alert ("You have to use a new password!");
    }
    else {
        mainForgot.innerHTML = `
        <h1>New password successful!</h1>
        <div id="forgot-container" class="forgot-wrapper">
        <form id="forgotForm" class="forgot-form">
          <div class="form-group">
            <p>Please check your email for confirmation!</p>
          </div>
          <div class="form-group">
            <label for="confirmation">Authentication code</label>
            <input 
                type="number" 
                minlength="6" 
                maxlength="6" 
                placeholder="Enter code" required
            />
          </div>
        </form>
      </div>`
    }
})

