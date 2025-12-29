document.addEventListener("DOMContentLoaded", () => {

    const loginContainer = document.getElementById("loginContainer");
    const menuContainer = document.getElementById("menuContainer");
    const chatContainer = document.getElementById("chatContainer");

    const usernameInput = document.getElementById("usernameInput");
    const loginBtn = document.getElementById("loginBtn");

    let currentUser = "";

    // LOGIN
    loginBtn.addEventListener("click", () => {
        const name = usernameInput.value.trim();
        if (name === "") {
            alert("Escribe un nombre");
            return;
        }

        currentUser = name;

        loginContainer.style.display = "none";
        menuContainer.style.display = "flex";

        document.getElementById("welcomeTitle").innerText =
            "Bienvenido, " + currentUser;
    });

});
