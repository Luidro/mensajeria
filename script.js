document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById("loginContainer");
    const chatContainer = document.getElementById("chatContainer");
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const chatTitle = document.getElementById("chatTitle");

    const enviarBtn = document.getElementById("enviarBtn");
    const mensajeInput = document.getElementById("mensaje");
    const mensajesDiv = document.getElementById("mensajes");

    let username = "";

    // LOGIN
    loginBtn.addEventListener("click", function() {
        const nombre = usernameInput.value.trim();
        if(nombre !== ""){
            username = nombre;
            chatTitle.textContent = "Chat de " + username;
            loginContainer.style.display = "none";
            chatContainer.style.display = "flex";
        }
    });

    // FUNCIONES DE MENSAJE
    function agregarMensaje(texto, tipo) {
        const nuevoMensaje = document.createElement("p");
        nuevoMensaje.textContent = texto;
        nuevoMensaje.classList.add("mensaje", tipo);
        mensajesDiv.appendChild(nuevoMensaje);
        mensajesDiv.scrollTop = mensajesDiv.scrollHeight; // scroll automático

        // Desaparecer mensaje después de 10 segundos
        setTimeout(() => {
            nuevoMensaje.remove();
        }, 10000); // 10000 ms = 10 segundos
    }

    // ENVIAR MENSAJE
    enviarBtn.addEventListener("click", function() {
        const texto = mensajeInput.value.trim();
        if (texto !== "") {
            agregarMensaje(texto, "usuario");
            mensajeInput.value = "";

            // Respuesta simulada del sistema
            setTimeout(() => {
                agregarMensaje("Respuesta automática: " + texto, "sistema");
            }, 500);
        }
    });

    // Enviar con Enter
    mensajeInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            enviarBtn.click();
        }
    });
});

</html>



