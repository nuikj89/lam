let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    if (email.value.trim() === "" || password.value.trim() === "") {
        alert("Please fill in all fields");
        return;
    }
    if (!isValidEmail(email.value.trim())) {
        alert("Please enter a valid email address");
        return;
    }
    if (!localStorage.getItem("users")) {
        alert("No user found");
    } else {
        let users = JSON.parse(localStorage.getItem("users"));
        let existingUser = users.find(
            (index) =>
                index.email.toLowerCase() === email.value.trim().toLowerCase() &&
                index.password === password.value.trim()
        );
        if (existingUser) {
            localStorage.setItem("currentUser", JSON.stringify(existingUser));
            location.href = "./main.html";
        } else {
            alert("Email or password is incorrect");
        }
    }
});
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
