function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    // You can perform login validation and authentication here
    // For simplicity, let's just display an alert
    console.log("Login clicked. Username: " + username + ", Password: " + password);
}

function register() {
    var name = document.getElementById("registerName").value;
    var email = document.getElementById("registerEmail").value;
    var username = document.getElementById("registerUsername").value;
    var password = document.getElementById("registerPassword").value;

    // Frontend validation for registration form
    if (name === "" || email === "" || username === "" || password === "") {
        alert("All fields are mandatory. Please fill in all the details.");
        return;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate username (no special characters)
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        alert("Username should not contain special characters.");
        return;
    }

    // Validate password (at least 8 characters, one capital letter, and one numeric)
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password should be at least 8 characters and must contain at least one capital letter and one numeric.");
        return;
    }

    console.log("Register clicked. Name: " + name + ", Email: " + email + ", Username: " + username + ", Password: " + password);
}
module.exports = { login, register };