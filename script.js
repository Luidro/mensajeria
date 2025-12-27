// Referencia a /mensajes en Firebase
const mensajesRef = ref(db, "mensajes");

// Enviar mensaje
document.getElementById("enviarBtn").addEventListener("click", () => {
    const texto = document.getElementById("mensajeInput").value;

    if (texto.trim() === "") return;

    push(mensajesRef, {
        texto: texto,
        fecha: Date.now()
    });

    document.getElementById("mensajeInput").value = "";
});

// Mostrar mensajes en tiempo real
onValue(mensajesRef, (snapshot) => {
    const mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = "";

    snapshot.forEach((child) => {
        const data = child.val();
        const p = document.createElement("p");
        p.textContent = data.texto;
        mensajesDiv.appendChild(p);
    });
});
