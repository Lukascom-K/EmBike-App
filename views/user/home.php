<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>EMBike - Usuário</title>

    <link rel="stylesheet" href="views/css/global.css">
    <link rel="stylesheet" href="views/css/user.css">
</head>

<body>

<div class="page">

    <img src="views/img/embike.png" class="logo-small">

    <h2 class="title">Minha Conta</h2>
    <p class="subtitle">Gerencie seus empréstimos</p>

    <div class="user-section">
        <h3>Seu Empréstimo Atual</h3>

        <?php if ($emprestimoAtivo): ?>
            <div class="bike-card">
                <p><strong>Modelo:</strong> <?= $emprestimoAtivo['modelo'] ?></p>
                <p><strong>Código:</strong> <?= $emprestimoAtivo['codigo'] ?></p>
                <p><strong>Retirada:</strong> <?= $emprestimoAtivo['data_emprestimo'] ?></p>

                <a href="index.php?rota=emprestimo_devolver&id=<?= $emprestimoAtivo['id'] ?>" class="btn-small">
                    Devolver
                </a>
            </div>
        <?php else: ?>
            <p>Nenhuma bike em uso no momento.</p>
        <?php endif; ?>
    </div>

    <div class="user-section">
        <h3>Bikes Disponíveis</h3>

        <?php foreach ($bikesLivres as $b): ?>
            <div class="bike-card">
                <p><strong><?= $b['modelo'] ?></strong></p>
                <p>Código: <?= $b['codigo'] ?></p>

                <a href="index.php?rota=emprestimo_store&id_bike=<?= $b['id'] ?>" class="btn-small">
                    Alugar
                </a>
            </div>
        <?php endforeach; ?>

        <?php if (empty($bikesLivres)): ?>
            <p>Nenhuma bike disponível no momento.</p>
        <?php endif; ?>
    </div>

    <div class="user-section">
        <h3>Histórico</h3>

        <?php foreach ($historico as $h): ?>
            <div class="history-item">
                <p><strong><?= $h['modelo'] ?> (<?= $h['codigo'] ?>)</strong></p>
                <p>Retirada: <?= $h['data_emprestimo'] ?></p>

                <?php if ($h['status'] !== 'ativo'): ?>
                    <p>Devolução: <?= $h['data_devolucao'] ?></p>
                <?php endif; ?>

                <p class="status
                    <?= $h['status'] == 'ativo' ? 'status-ativo' : '' ?>
                    <?= $h['status'] == 'finalizado' ? 'status-finalizado' : '' ?>
                    <?= $h['status'] == 'atrasado' ? 'status-atrasado' : '' ?>
                ">
                    <?= ucfirst($h['status']) ?>
                </p>
            </div>
        <?php endforeach; ?>

        <?php if (empty($historico)): ?>
            <p>Ainda não há histórico.</p>
        <?php endif; ?>
    </div>

    <a href="index.php?rota=logout" class="btn-exit">Sair</a>

</div>

</body>
</html>
