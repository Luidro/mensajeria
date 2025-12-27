document.addEventListener("DOMContentLoaded", function() {
    // Elementos login
    const loginContainer = document.getElementById("loginContainer");
    const chatContainer = document.getElementById("chatContainer");
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const chatTitle = document.getElementById("chatTitle");

    // Elementos chat
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

    // FUNCIONES MENSAJE
    function agregarMensaje(texto, tipo, efectoEscribir=false) {
        const nuevoMensaje = document.createElement("p");
        nuevoMensaje.classList.add("mensaje", tipo);
        mensajesDiv.appendChild(nuevoMensaje);
        mensajesDiv.scrollTop = mensajesDiv.scrollHeight;

        if(efectoEscribir){
            let i = 0;
            const interval = setInterval(() => {
                nuevoMensaje.textContent += texto.charAt(i);
                i++;
                if(i >= texto.length) clearInterval(interval);
            }, 30); // velocidad de escritura letra por letra
        } else {
            nuevoMensaje.textContent = texto;
        }

        // Desaparecer mensaje después de 10 segundos
        setTimeout(() => {
            nuevoMensaje.remove();
        }, 10000);
    }

    // ENVIAR MENSAJE
    enviarBtn.addEventListener("click", function() {
        const texto = mensajeInput.value.trim();
        if (texto !== "") {
            agregarMensaje(texto, "usuario");
            mensajeInput.value = "";

            // Respuesta simulada del sistema con efecto de escritura
            setTimeout(() => {
                agregarMensaje("Respuesta automática: " + texto, "sistema", true);
            }, 500);
        }
    });

    // Enviar con Enter
    mensajeInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") enviarBtn.click();
    });
});
