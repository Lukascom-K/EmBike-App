<?php require __DIR__ . "/../header.php"; ?>

<h1>Editar Usuário</h1>

<form method="POST" action="index.php?rota=user_atualizar">

    <input type="hidden" name="id" value="<?= $usuario['id'] ?>">

    <label>Nome:</label><br>
    <input type="text" name="nome" value="<?= $usuario['nome'] ?>" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" value="<?= $usuario['email'] ?>" required><br><br>

    <label>Senha (deixe vazio para manter):</label><br>
    <input type="password" name="senha"><br><br>

    <label>Tipo:</label><br>
    <select name="tipo">
        <option value="user" <?= $usuario['tipo']=="user" ? "selected":"" ?>>Usuário</option>
        <option value="admin" <?= $usuario['tipo']=="admin" ? "selected":"" ?>>Administrador</option>
    </select><br><br>

    <button type="submit" class="btn">Salvar</button>
</form>
