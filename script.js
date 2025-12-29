const loginBox = document.getElementById("loginBox");
const menuBox = document.getElementById("menuBox");

const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const welcomeTitle = document.getElementById("welcomeTitle");

loginBtn.onclick = () => {
    const name = usernameInput.value.trim();

    if (name === "") {
        alert("Debes escribir un nombre");
        return;
    }

    // ocultar login
    loginBox.classList.add("hidden");

    // mostrar menú
    menuBox.classList.remove("hidden");

    // poner nombre
    welcomeTitle.textContent = "Bienvenido, " + name;
};

// botones (solo prueba)
document.getElementById("joinGroupBtn").onclick = () => alert("Unirse a grupo");
document.getElementById("createGroupBtn").onclick = () => alert("Crear grupo");
document.getElementById("myGroupsBtn").onclick = () => alert("Mis grupos");
