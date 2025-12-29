// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const loginBox = document.getElementById("loginBox");

const menuBox = document.getElementById("menuBox");
const welcomeTitle = document.getElementById("welcomeTitle");

let currentUser = "";

loginBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();

    if (name === "") {
        alert("Escribe un nombre de usuario");
        return;
    }

    currentUser = name;

    // Ocultar login y mostrar menú
    loginBox.classList.add("hidden");
    menuBox.classList.remove("hidden");

    welcomeTitle.textContent = "Bienvenido, " + currentUser;
});


// ================= MENÚ (solo mensajes por ahora) =================

document.getElementById("joinGroupBtn").onclick = () => {
    alert("Aquí irá la pantalla para UNIRSE A UN GRUPO");
};

document.getElementById("createGroupBtn").onclick = () => {
    alert("Aquí se podrá CREAR UN GRUPO");
};

document.getElementById("myGroupsBtn").onclick = () => {
    alert("Aquí se verán LOS GRUPOS DEL USUARIO");
};
