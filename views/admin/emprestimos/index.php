<link rel="stylesheet" href="views/css/global.css">
<link rel="stylesheet" href="views/css/admin.css">

<div class="navbar">
    <div class="logo-text">EMBIKE</div>
    <div class="menu">
        <a href="index.php?rota=admin_dashboard">Dashboard</a>
        <a href="index.php?rota=admin_bikes">Bikes</a>
        <a href="index.php?rota=admin_emprestimos" style="color:#ffd857">Empréstimos</a>
        <a href="index.php?rota=logout" style="color:#ff6b6b">Sair</a>
    </div>
</div>

<div class="admin-content">

    <h1>Controle de Empréstimos</h1>

    <div class="loan-list">

        <?php foreach ($emprestimos as $e): ?>

        <?php
            $statusClass = $e['status'] == 'ativo' ? 'status-ativo' :
                           ($e['status'] == 'finalizado' ? 'status-finalizado' : 'status-atrasado');
        ?>

        <div class="loan-card">
            <div class="loan-header">
                <h3><?= $e['modelo'] ?> (<?= $e['codigo'] ?>)</h3>
                <span class="status-pill <?= $statusClass ?>"><?= ucfirst($e['status']) ?></span>
            </div>

            <div class="loan-body">
                <p>Usuário: <b><?= $e['usuario'] ?></b></p>
                <p>Retirado em: <?= $e['data_emprestimo'] ?></p>

                <?php if ($e['status'] != 'ativo'): ?>
                    <p>Devolvido em: <?= $e['data_devolucao'] ?></p>
                <?php endif; ?>
            </div>

            <?php if ($e['status'] == 'ativo'): ?>
                <a class="btn-small" href="index.php?rota=emprestimo_devolver&id=<?= $e['id'] ?>">
                    Registrar Devolução
                </a>
            <?php endif; ?>
        </div>

        <?php endforeach; ?>

    </div>
</div>
