<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Real con Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container" id="loginContainer">
        <h1>Iniciar Sesión</h1>
        <input type="text" id="username" placeholder="Nombre de usuario">
        <button id="loginBtn">Entrar</button>
    </div>

    <div class="chat-container" id="chatContainer" style="display:none;">
        <h1 id="chatTitle">Chat Real</h1>

        <div id="mensajes"></div>

        <div class="input-group">
            <input type="text" id="mensaje" placeholder="Escribe tu mensaje...">
            <button id="enviarBtn">Enviar</button>
        </div>
    </div>

    <script src="script.js" defer></script>
</body>
</html>


