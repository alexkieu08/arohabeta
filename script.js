// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // The CSS animation handles the sun moving automatically
    // The hover and focus interactions for the inputs are handled in CSS as well.
    // If any vanilla JS interactions are explicitly needed for form submissions:
    const usernameInput = document.querySelector('.username-input .text-input');
    const passwordInput = document.querySelector('.password-input .text-input');

    // Add simple logging to show JS functionality for the "typing in it" request (though standard HTML inputs handle this)
    if(usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            console.log("Username input changed:", e.target.value);
        });
    }

    if(passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            console.log("Password input changed length:", e.target.value.length);
        });
    }
});
