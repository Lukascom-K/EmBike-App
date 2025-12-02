<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin - EMBike</title>

    <link rel="stylesheet" href="views/css/global.css">
    <link rel="stylesheet" href="views/css/admin.css">
</head>

<body>

<div class="page">

    <img src="views/img/embike.png" class="logo-small">

    <div class="admin-header">
        <h2 class="admin-title">Painel do Administrador</h2>
        <p class="admin-subtitle">Gerencie o sistema EMBike</p>
    </div>

    <div class="box">
        <h3>Estatísticas</h3>

        <div class="stat-line">
            <span>Total de Bikes:</span>
            <strong><?= $totalBikes ?></strong>
        </div>

        <div class="stat-line">
            <span>Empréstimos Ativos:</span>
            <strong><?= $emprestimosAtivos ?></strong>
        </div>

        <div class="stat-line">
            <span>Usuários Registrados:</span>
            <strong><?= $totalUsuarios ?></strong>
        </div>
    </div>

    <a href="index.php?rota=admin_bikes" class="btn-yellow">Gerenciar Bikes</a>
    <a href="index.php?rota=admin_emprestimos" class="btn-yellow">Gerenciar Empréstimos</a>
    <a href="index.php?rota=admin_users" class="btn-yellow">Gerenciar Usuários</a>

    <a href="index.php?rota=logout" class="btn-exit">Sair</a>

</div>

</body>
</html>
