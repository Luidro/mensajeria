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
    let grupos = {};
    let grupoActual = null;
    const listaGrupos = document.getElementById("listaGrupos");

    function mostrarGrupos() {
        listaGrupos.innerHTML = "";
        for(const nombre in grupos){
            const grupoDiv = document.createElement("div");
            grupoDiv.style.display="flex"; grupoDiv.style.gap="5px"; marginBottom="5px";

            const nombreBtn = document.createElement("button");
            nombreBtn.textContent = nombre;
            nombreBtn.onclick = ()=> entrarGrupo(nombre);

            const unirseBtn = document.createElement("button");
            unirseBtn.textContent = "Unirse";
            unirseBtn.onclick = ()=> entrarGrupo(nombre);

            grupoDiv.appendChild(nombreBtn);
            grupoDiv.appendChild(unirseBtn);
            listaGrupos.appendChild(grupoDiv);
        }
    }

    document.getElementById("btnCrear").addEventListener("click", ()=>{
        const nombre = prompt("Nombre del grupo:");
        if(nombre && !grupos[nombre]){
            grupos[nombre] = [];
            mostrarGrupos();
        }
    });

    document.getElementById("btnUnirse").addEventListener("click", ()=> {
        alert("Haz clic en 'Unirse' en los botones de la lista de grupos");
    });

    document.getElementById("btnMisGrupos").addEventListener("click", ()=>{
        alert("Aquí se mostrarán tus grupos creados o a los que perteneces");
    });

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
                const img = document.createElement("img"); img.src=URL.createObjectURL(archivo); nuevoMensaje.appendChild(img);
            }
            if(archivo.type.startsWith("video/")){
                const video = document.createElement("video"); video.src=URL.createObjectURL(archivo); video.controls=true; nuevoMensaje.appendChild(video);
            }
        }

        const p=document.createElement("p");
        p.textContent=texto; nuevoMensaje.appendChild(p);
        mensajesDiv.appendChild(nuevoMensaje);
        mensajesDiv.scrollTop=mensajesDiv.scrollHeight;

        if(grupoActual){ grupos[grupoActual].push({usuario:tipo,mensaje:texto,archivo}); }
    }

    const enviarBtn = document.getElementById("enviarBtn");
    const mensajeInput = document.getElementById("mensaje");

    enviarBtn.addEventListener("click", ()=>{
        if(!grupoActual) return alert("Primero entra a un grupo");
        const texto = mensajeInput.value.trim();
        if(texto){ agregarMensaje(texto,"usuario"); mensajeInput.value=""; }
    });

    mensajeInput.addEventListener("keypress", e=>{ if(e.key==="Enter") enviarBtn.click(); });

    // OPCIONES BOTÓN "+"
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

