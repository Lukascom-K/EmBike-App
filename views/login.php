<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>EMBike - Login</title>

    <link rel="stylesheet" href="views/css/global.css">
</head>

<body>

<div class="page">

    <img src="views/img/embike.png" class="logo-big">

    <h2 class="title">Bem-vindo</h2>
    <p class="subtitle">Acesse sua conta para continuar</p>

    <form method="POST" action="index.php?rota=auth">

        <input type="email" name="email" class="input" placeholder="Email" required>

        <input type="password" name="senha" class="input" placeholder="Senha" required>

        <button type="submit" class="btn-yellow">Entrar</button>
    </form>

    <p class="footer-text">© EMBike • Mobilidade Inteligente</p>
</div>

</body>
</html>
