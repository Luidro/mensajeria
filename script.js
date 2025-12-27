document.addEventListener("DOMContentLoaded", function(){

    // LOGIN
    const loginContainer = document.getElementById("loginContainer");
    const grupoScreen = document.getElementById("grupoScreen");
    const chatApp = document.getElementById("chatApp");
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const bienvenida = document.getElementById("bienvenida");
    let username = "";

    loginBtn.addEventListener("click", () => {
        const name = usernameInput.value.trim();
        if(name){
            username = name;
            loginContainer.style.display="none";
            grupoScreen.style.display="block";
            bienvenida.textContent = "Bienvenido, " + username;
        }
    });

    // GRUPOS
    let grupos = {};          // Almacena los mensajes de cada grupo
    let misGrupos = [];       // Grupos que el usuario ha creado o se unió
    let grupoActual = null;
    const listaGrupos = document.getElementById("listaGrupos");

    function mostrarGrupos() {
        listaGrupos.innerHTML = "";
        for(const nombre in grupos){
            const grupoDiv = document.createElement("div");
            grupoDiv.style.display="flex"; 
            grupoDiv.style.gap="5px"; 
            grupoDiv.style.marginBottom="5px";

            const nombreBtn = document.createElement("button");
            nombreBtn.textContent = nombre;
            nombreBtn.onclick = ()=> entrarGrupo(nombre);

            const unirseBtn = document.createElement("button");
            unirseBtn.textContent = "Unirse";
            unirseBtn.onclick = ()=> {
                if(!misGrupos.includes(nombre)) misGrupos.push(nombre);
                entrarGrupo(nombre);
            };

            grupoDiv.appendChild(nombreBtn);
            grupoDiv.appendChild(unirseBtn);
            listaGrupos.appendChild(grupoDiv);
        }
    }

    // CREAR GRUPO
    document.getElementById("btnCrear").addEventListener("click", ()=>{
        const nombre = prompt("Nombre del grupo:");
        if(nombre && !grupos[nombre]){
            grupos[nombre] = [];
            if(!misGrupos.includes(nombre)) misGrupos.push(nombre);
            mostrarGrupos();
        }
    });

    // UNIRSE A GRUPO
    document.getElementById("btnUnirse").addEventListener("click", ()=>{
        const gruposDisponibles = Object.keys(grupos).filter(g => !misGrupos.includes(g));
        if(gruposDisponibles.length === 0) return alert("No hay grupos disponibles para unirse.");
        const nombre = prompt("Grupos disponibles: " + gruposDisponibles.join(", ") + "\nEscribe el nombre para unirte:");
        if(nombre && gruposDisponibles.includes(nombre)){
            misGrupos.push(nombre);
            entrarGrupo(nombre);
        } else {
            alert("Grupo no válido.");
        }
    });

    // MIS GRUPOS
    document.getElementById("btnMisGrupos").addEventListener("click", ()=>{
        if(misGrupos.length === 0) return alert("No tienes grupos creados o unidos.");
        const nombre = prompt("Tus grupos: " + misGrupos.join(", ") + "\nEscribe el nombre para entrar:");
        if(nombre && misGrupos.includes(nombre)){
            entrarGrupo(nombre);
        } else {
            alert("Grupo no válido.");
        }
    });

    // ENTRAR A GRUPO
    function entrarGrupo(nombre){
        grupoActual = nombre;
        grupoScreen.style.display="none";
        chatApp.style.display="flex";
        document.getElementById("chatTitle").textContent = "Grupo: "+nombre;
        mostrarMensajes();
    }

    // CHAT
    const mensajesDiv = document.getElementById("mensajes");

    function mostrarMensajes(){
        mensajesDiv.innerHTML="";
        if(!grupoActual) return;
        grupos[grupoActual].forEach(msg => {
            agregarMensaje(msg.mensaje,msg.usuario,msg.archivo,false);
        });
    }

    function agregarMensaje(texto,tipo,archivo=null,efectoEscribir=false){
        const nuevoMensaje = document.createElement("div");
        nuevoMensaje.classList.add("mensaje",tipo);

        if(archivo){
            if(archivo.type.startsWith("image/")){
                const img = document.createElement("img"); 
                img.src=URL.createObjectURL(archivo); 
                nuevoMensaje.appendChild(img);
            }
            if(archivo.type.startsWith("video/")){
                const video = document.createElement("video"); 
                video.src=URL.createObjectURL(archivo); 
                video.controls=true; 
                nuevoMensaje.appendChild(video);
            }
        }

        const p=document.createElement("p");
        p.textContent=texto; 
        nuevoMensaje.appendChild(p);
        mensajesDiv.appendChild(nuevoMensaje);
        mensajesDiv.scrollTop=mensajesDiv.scrollHeight;

        if(grupoActual){ grupos[grupoActual].push({usuario:tipo,mensaje:texto,archivo}); }
    }

    // ENVIAR MENSAJE
    const enviarBtn = document.getElementById("enviarBtn");
    const mensajeInput = document.getElementById("mensaje");

    enviarBtn.addEventListener("click", ()=>{
        if(!grupoActual) return alert("Primero entra a un grupo");
        const texto = mensajeInput.value.trim();
        if(texto){ 
            agregarMensaje(texto,"usuario"); 
            mensajeInput.value=""; 
        }
    });

    mensajeInput.addEventListener("keypress", e=>{ if(e.key==="Enter") enviarBtn.click(); });

    // BOTÓN "+" OPCIONES
    const opcionesBtn = document.getElementById("opcionesBtn");
    const menuOpciones = document.getElementById("menuOpciones");

    opcionesBtn.addEventListener("click", ()=> {
        menuOpciones.style.display = menuOpciones.style.display==="none" ? "flex":"none";
    });

    document.getElementById("subirArchivo").addEventListener("change", e=>{
        const file=e.target.files[0]; if(file) agregarMensaje("", "usuario", file,false);
    });

    document.getElementById("subirVideo").addEventListener("change", e=>{
        const file=e.target.files[0]; if(file) agregarMensaje("", "usuario", file,false);
    });

    document.getElementById("emojiBtn").addEventListener("click", ()=> alert("Aquí se puede abrir selector de emojis"));

    document.getElementById("archivo").addEventListener("change", e=>{
        const file=e.target.files[0]; if(file) agregarMensaje("Archivo: "+file.name,"usuario",file,false);
    });

});
