<link rel="stylesheet" href="views/css/style.css">

<div class="navbar">
    <div class="logo-text">EMBIKE</div>

    <div class="menu">
        <a href="index.php?rota=admin_dashboard">Dashboard</a>
        <a href="index.php?rota=admin_bikes" style="color:#ffd857;">Bikes</a>
        <a href="index.php?rota=admin_emprestimos">Empréstimos</a>
        <a href="index.php?rota=logout" style="color:#ff6b6b;">Sair</a>
    </div>
</div>

<div class="admin-content">

    <h1>Editar Bike</h1>
    <p>Altere as informações desta bike.</p>

    <div class="table-card">

        <form method="POST" action="index.php?rota=bike_update">

            <input type="hidden" name="id" value="<?= $bike['id'] ?>">

            <label>Modelo</label>
            <input class="input" type="text" name="modelo" value="<?= $bike['modelo'] ?>" required>

            <label>Código</label>
            <input class="input" type="text" name="codigo" value="<?= $bike['codigo'] ?>" required>

            <label>Status</label>
            <select name="status" class="input">
                <option value="disponivel" <?= $bike['status']=='disponivel'?'selected':'' ?>>Disponível</option>
                <option value="ocupada" <?= $bike['status']=='ocupada'?'selected':'' ?>>Ocupada</option>
                <option value="manutencao" <?= $bike['status']=='manutencao'?'selected':'' ?>>Manutenção</option>
            </select>

            <button class="btn-primary" style="margin-top:20px;">Salvar</button>

        </form>

    </div>

</div>
