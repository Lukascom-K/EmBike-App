<?php require __DIR__ . "/../header.php"; ?>

<h1>Novo Usuário</h1>

<form method="POST" action="index.php?rota=user_salvar">

    <label>Nome:</label><br>
    <input type="text" name="nome" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Senha:</label><br>
    <input type="password" name="senha" required><br><br>

    <label>Tipo:</label><br>
    <select name="tipo">
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
    </select><br><br>

    <button type="submit" class="btn">Salvar</button>
</form>
