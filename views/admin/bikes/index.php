<link rel="stylesheet" href="views/css/global.css">
<link rel="stylesheet" href="views/css/admin.css">

<div class="navbar">
    <div class="logo-text">EMBIKE</div>
    <div class="menu">
        <a href="index.php?rota=admin_dashboard">Dashboard</a>
        <a href="index.php?rota=admin_bikes" style="color:#ffd857">Bikes</a>
        <a href="index.php?rota=admin_emprestimos">Empréstimos</a>
        <a href="index.php?rota=logout" style="color:#ff6b6b">Sair</a>
    </div>
</div>

<div class="admin-content">

    <h1>Gerenciar Bikes</h1>
    <a class="btn-add" href="index.php?rota=bike_add">+ Adicionar Bike</a>

    <div class="table-card">

        <table>
            <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Código</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>

            <?php foreach ($bikes as $b): ?>
            <tr>
                <td><?= $b['id'] ?></td>
                <td><?= $b['modelo'] ?></td>
                <td><?= $b['codigo'] ?></td>
                <td><?= $b['status'] ?></td>
                <td>
                    <a class="btn-edit" href="index.php?rota=bike_edit&id=<?= $b['id'] ?>">Editar</a>
                    <a class="btn-delete" href="index.php?rota=bike_delete&id=<?= $b['id'] ?>">Excluir</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>

    </div>

</div>
