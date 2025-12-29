// ======== LOGIN ========

const loginContainer = document.getElementById("loginContainer");
const menuContainer = document.getElementById("menuContainer");
const chatContainer = document.getElementById("chatContainer");

const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const welcomeTitle = document.getElementById("welcomeTitle");

let currentUser = null;

// CLICK EN BOTÓN ENTRAR
loginBtn.addEventListener("click", login);

function login() {
    const name = usernameInput.value.trim();

    if (name === "") {
        alert("Por favor, escribe un nombre.");
        return;
    }

    currentUser = name;

    // Cambiar pantalla
    loginContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");

    // Poner el nombre
    welcomeTitle.textContent = "Bienvenido " + currentUser;
}


// ======== MENÚ ========

document.getElementById("joinGroupBtn").addEventListener("click", () => {
    menuContainer.classList.add("hidden");
    chatContainer.classList.remove("hidden");
});

document.getElementById("backToMenu").addEventListener("click", () => {
    chatContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");
});


// ======== CHAT ========

document.getElementById("sendBtn").addEventListener("click", () => {
    const msgInput = document.getElementById("msgInput");
    const message = msgInput.value.trim();

    if (message === "") return;

    const messagesDiv = document.getElementById("messages");

    const msgElement = document.createElement("p");
    msgElement.textContent = `${currentUser}: ${message}`;
    messagesDiv.appendChild(msgElement);

    msgInput.value = "";
});
