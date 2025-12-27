document.addEventListener("DOMContentLoaded", function(){

    // LOGIN
    const loginContainer = document.getElementById("loginContainer");
    const chatApp = document.getElementById("chatApp");
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const chatTitle = document.getElementById("chatTitle");

    let username = "";
    loginBtn.addEventListener("click", () => {
        const name = usernameInput.value.trim();
        if(name){
            username = name;
            loginContainer.style.display = "none";
            chatApp.style.display = "flex";
        }
    });

    // GRUPOS
    let grupos = {};
    let grupoActual = null;
    const gruposContainer = document.getElementById("gruposContainer");
    const mensajesDiv = document.getElementById("mensajes");

    function mostrarGrupos(){
        gruposContainer.innerHTML = "";
        for(const nombre in grupos){
            const btn = document.createElement("button");
            btn.textContent = nombre;
            btn.onclick = () => entrarGrupo(nombre);
            gruposContainer.appendChild(btn);
        }
    }

    document.getElementById("crearGrupoBtn").addEventListener("click", () => {
        const nombre = prompt("Nombre del grupo:");
        if(nombre && !grupos[nombre]){
            grupos[nombre] = [];
            mostrarGrupos();
        }
    });

    function entrarGrupo(nombre){
        grupoActual = nombre;
        chatTitle.textContent = "Grupo: " + nombre;
        mostrarMensajes();
    }

    // MENSAJES
    function mostrarMensajes(){
        mensajesDiv.innerHTML = "";
        if(!grupoActual) return;
        grupos[grupoActual].forEach(msg => {
            agregarMensaje(msg.mensaje, msg.usuario, msg.archivo, false);
        });
    }

    function agregarMensaje(texto, tipo, archivo=null, efectoEscribir=true){
        const nuevoMensaje = document.createElement("div");
        nuevoMensaje.classList.add("mensaje", tipo);

        if(archivo){
            if(archivo.type.startsWith("image/")){
                const img = document.createElement("img");
                img.src = URL.createObjectURL(archivo);
                nuevoMensaje.appendChild(img);
            }
            if(archivo.type.startsWith("video/")){
                const video = document.createElement("video");
                video.src = URL.createObjectURL(archivo);
                video.controls = true;
                nuevoMensaje.appendChild(video);
            }
        }

        const p = document.createElement("p");
        if(efectoEscribir && tipo==="sistema"){
            let i=0;
            const interval = setInterval(()=>{
                p.textContent += texto.charAt(i);
                i++;
                if(i>=texto.length) clearInterval(interval);
            },30);
        } else {
            p.textContent = texto;
        }
        nuevoMensaje.appendChild(p);
        mensajesDiv.appendChild(nuevoMensaje);
        mensajesDiv.scrollTop = mensajesDiv.scrollHeight;

        if(grupoActual){
            grupos[grupoActual].push({usuario: tipo, mensaje: texto, archivo});
        }

        setTimeout(()=>nuevoMensaje.remove(), 10000);
    }

    // ENVIAR
    const enviarBtn = document.getElementById("enviarBtn");
    const mensajeInput = document.getElementById("mensaje");

    enviarBtn.addEventListener("click", ()=>{
        if(!grupoActual) return alert("Primero entra a un grupo");
        const texto = mensajeInput.value.trim();
        if(texto){
            agregarMensaje(texto, "usuario");
            mensajeInput.value = "";
            setTimeout(()=>agregarMensaje("Respuesta automática: "+texto,"sistema"),500);
        }
    });

    mensajeInput.addEventListener("keypress", e=>{
        if(e.key==="Enter") enviarBtn.click();
    });

    // SUBIR ARCHIVO (IMAGEN / VIDEO)
    document.getElementById("subirArchivo").addEventListener("change", e=>{
        const file = e.target.files[0];
        if(file) agregarMensaje("", "usuario", file, false);
    });

    // CAMBIAR COLORES
    document.getElementById("cambiarColorBtn").addEventListener("click", ()=>{
        const colorFondo = prompt("Color fondo chat:", "#f9f9f9");
        const colorUsuario = prompt("Color burbuja usuario:", "#000dff");
        const colorSistema = prompt("Color burbuja sistema:", "#e0e0ff");

        mensajesDiv.style.backgroundColor = colorFondo;
        document.querySelectorAll(".mensaje.usuario").forEach(m=>m.style.backgroundColor=colorUsuario);
        document.querySelectorAll(".mensaje.sistema").forEach(m=>m.style.backgroundColor=colorSistema);
    });

});
