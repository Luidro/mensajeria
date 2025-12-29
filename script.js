import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBmIroUmph5yG4OxP6eXhlKQEDl0ueiasM",
  authDomain: "mensajeria-cdfc0.firebaseapp.com",
  databaseURL: "https://mensajeria-cdfc0-default-rtdb.firebaseio.com",
  projectId: "mensajeria-cdfc0",
  storageBucket: "mensajeria-cdfc0.firebasestorage.app",
  messagingSenderId: "573296483646",
  appId: "1:573296483646:web:472c20290720c41097e06f"
};

// Iniciar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let username = "";
let groupID = "global";

// ELEMENTOS
const loginContainer = document.getElementById("loginContainer");
const menuContainer = document.getElementById("menuContainer");
const chatContainer = document.getElementById("chatContainer");

const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");

const sendMsgBtn = document.getElementById("sendMsgBtn");
const msgInput = document.getElementById("msgInput");
const messagesDiv = document.getElementById("messages");
const backToMenu = document.getElementById("backToMenu");

// LOGIN
loginBtn.onclick = () => {
    username = usernameInput.value.trim();
    if (username === "") return alert("Ingresa un nombre");

    loginContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");

    document.getElementById("welcomeTitle").innerText = "Bienvenido " + username;
};

// ENTRAR AL CHAT (modo simple)
document.getElementById("joinGroupBtn").onclick = () => {
    menuContainer.classList.add("hidden");
    chatContainer.classList.remove("hidden");

    startChat();
};

// VOLVER AL MENÚ
backToMenu.onclick = () => {
    chatContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");
};

// ENVIAR MENSAJE
sendMsgBtn.onclick = () => {
    const txt = msgInput.value.trim();
    if (txt === "") return;

    push(ref(db, "grupos/" + groupID), {
        user: username,
        text: txt
    });

    msgInput.value = "";
};

// RECIBIR MENSAJES
function startChat() {
    messagesDiv.innerHTML = "";

    onChildAdded(ref(db, "grupos/" + groupID), data => {
        const msg = data.val();
        const div = document.createElement("div");
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}
