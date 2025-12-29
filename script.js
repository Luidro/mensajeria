<script>
document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------
       ELEMENTOS DEL LOGIN
    ------------------------------------ */
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("usernameInput");

    const loginContainer = document.getElementById("loginContainer");
    const menuContainer = document.getElementById("menuContainer");
    const chatContainer = document.getElementById("chatContainer");

    const welcomeTitle = document.getElementById("welcomeTitle");


    /* ------------------------------------
       BOTÓN: ENTRAR (LOGIN)
    ------------------------------------ */
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username === "") {
            alert("Escribe un nombre de usuario");
            return;
        }

        // Guardamos el usuario en memoria temporal
        window.currentUser = username;

        // Cambiar pantalla
        welcomeTitle.textContent = "Bienvenido " + username;
        loginContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
    });


    /* ------------------------------------
       BOTONES DEL MENÚ PRINCIPAL
    ------------------------------------ */
    const joinGroupBtn = document.getElementById("joinGroupBtn");
    const createGroupBtn = document.getElementById("createGroupBtn");
    const myGroupsBtn = document.getElementById("myGroupsBtn");

    joinGroupBtn.addEventListener("click", () => {
        alert("Aquí abriremos la ventana para UNIRSE a un grupo (lo hacemos con Firebase).");
    });

    createGroupBtn.addEventListener("click", () => {
        alert("Aquí abriremos la ventana para CREAR un grupo (lo hacemos con Firebase).");
    });

    myGroupsBtn.addEventListener("click", () => {
        alert("Aquí mostraremos los grupos del usuario (también con Firebase).");
    });


    /* ------------------------------------
       CHAT
    ------------------------------------ */
    const backToMenu = document.getElementById("backToMenu");
    const sendBtn = document.getElementById("sendBtn");
    const msgInput = document.getElementById("msgInput");
    const messagesBox = document.getElementById("messages");


    // Botón volver
    backToMenu.addEventListener("click", () => {
        chatContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
        messagesBox.innerHTML = ""; // limpiar chat
    });


    // Enviar mensaje
    sendBtn.addEventListener("click", () => {
        const msg = msgInput.value.trim();
        if (msg === "") return;

        const div = document.createElement("div");
        div.classList.add("msg");
        div.textContent = window.currentUser + ": " + msg;

        messagesBox.appendChild(div);
        msgInput.value = "";
        messagesBox.scrollTop = messagesBox.scrollHeight;
    });


    /* ------------------------------------
       FUNCIÓN PARA ABRIR EL CHAT (cuando Firebase esté listo)
    ------------------------------------ */
    window.openChat = (groupName) => {
        document.getElementById("chatTitle").textContent = groupName;
        menuContainer.classList.add("hidden");
        chatContainer.classList.remove("hidden");
    };

});
</script>
