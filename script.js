/***********************
 *      LOGIN
 ***********************/
const loginContainer = document.getElementById("loginContainer");
const menuContainer = document.getElementById("menuContainer");
const chatContainer = document.getElementById("chatContainer");

const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");

let currentUser = "";
let currentGroup = "";

// LOGIN
loginBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (name === "") return alert("Escribe un nombre");

    currentUser = name;

    loginContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");

    document.getElementById("welcomeTitle").innerText = "Bienvenido, " + currentUser;
});


/***********************
 *     BOTONES MENÚ
 ***********************/
document.getElementById("joinGroupBtn").onclick = () => {
    let g = prompt("ID del grupo:");
    if (!g) return;

    currentGroup = g;
    openChat();
};

document.getElementById("createGroupBtn").onclick = () => {
    let g = prompt("Nombre del grupo nuevo:");
    if (!g) return;

    currentGroup = g;
    alert("Grupo creado: " + g);
    openChat();
};

document.getElementById("myGroupsBtn").onclick = () => {
    alert("Aún no tienes grupos guardados.");
};


/***********************
 *      ABRIR CHAT
 ***********************/
function openChat() {
    menuContainer.classList.add("hidden");
    chatContainer.classList.remove("hidden");

    document.getElementById("chatTitle").innerText = currentGroup;
}


/***********************
 *      VOLVER
 ***********************/
document.getElementById("backToMenu").onclick = () => {
    chatContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");
};


/***********************
 *  ENVIAR MENSAJE (demo)
 ***********************/
document.getElementById("sendBtn").onclick = () => {
    let msg = document.getElementById("msgInput").value.trim();
    if (msg === "") return;

    let box = document.getElementById("messages");

    let p = document.createElement("p");
    p.innerHTML = `<b>${currentUser}:</b> ${msg}`;

    box.appendChild(p);
    document.getElementById("msgInput").value = "";
};
