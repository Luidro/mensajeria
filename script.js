document.addEventListener("DOMContentLoaded", () => {

    const loginScreen = document.getElementById("loginScreen");
    const menuScreen = document.getElementById("menuScreen");

    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("usernameInput");
    const welcomeText = document.getElementById("welcomeText");

    // LOGIN
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();

        if (username === "") {
            alert("Ingresa un nombre");
            return;
        }

        // Mostrar menú
        welcomeText.textContent = "Bienvenido " + username;
        loginScreen.classList.add("hidden");
        menuScreen.classList.remove("hidden");
    });

});
