<?php require __DIR__ . "/../header.php"; ?>

<h1>Usuários</h1>

<a href="index.php?rota=user_criar" class="btn">+ Novo Usuário</a>

<table border="1" cellpadding="10" style="margin-top: 20px;">
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Tipo</th>
        <th>Ações</th>
    </tr>

    <?php foreach ($usuarios as $u): ?>
        <tr>
            <td><?= $u['id'] ?></td>
            <td><?= $u['nome'] ?></td>
            <td><?= $u['email'] ?></td>
            <td><?= $u['tipo'] ?></td>
            <td>
                <a href="index.php?rota=user_editar&id=<?= $u['id'] ?>">Editar</a> |
                <a href="index.php?rota=user_excluir&id=<?= $u['id'] ?>" onclick="return confirm('Excluir usuário?')">Excluir</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
^<?php
