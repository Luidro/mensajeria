// Obtener pantallas
const loginScreen = document.getElementById("loginScreen");
const menuScreen = document.getElementById("menuScreen");
const joinScreen = document.getElementById("joinScreen");
const createScreen = document.getElementById("createScreen");
const myGroupsScreen = document.getElementById("myGroupsScreen");
const chatScreen = document.getElementById("chatScreen");

// Inputs
const usernameInput = document.getElementById("usernameInput");

// Botones principales
const loginBtn = document.getElementById("loginBtn");
const btnJoin = document.getElementById("btnJoin");
const btnCreate = document.getElementById("btnCreate");
const btnMyGroups = document.getElementById("btnMyGroups");

// Texto bienvenida
const welcomeText = document.getElementById("welcomeText");

// Función para mostrar pantallas
function show(screen) {
    // Ocultar todas
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));

    // Mostrar la solicitada
    screen.classList.remove("hidden");
}

// LOGIN
loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Ingresa un nombre");
        return;
    }

    welcomeText.textContent = "Bienvenido " + username;

    show(menuScreen);
});

// MENÚ PRINCIPAL
btnJoin.addEventListener("click", () => show(joinScreen));
btnCreate.addEventListener("click", () => show(createScreen));
btnMyGroups.addEventListener("click", () => show(myGroupsScreen));

// BOTONES DE REGRESO
document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => {
        show(menuScreen);
    });
});
