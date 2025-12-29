const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const loginBox = document.getElementById("loginBox");
const welcome = document.getElementById("welcome");

loginBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();

    if (name === "") {
        alert("Escribe un nombre de usuario");
        return;
    }

    // Ocultar login
    loginBox.style.display = "none";

    // Mostrar mensaje de bienvenida
    welcome.style.display = "block";
    welcome.textContent = "Bienvenido, " + name + "!";
});
