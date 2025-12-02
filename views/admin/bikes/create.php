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

    <h1>Adicionar Nova Bike</h1>
    <p>Cadastre um novo modelo no sistema.</p>

    <div class="table-card">

        <form method="POST" action="index.php?rota=bike_store">

            <label>Modelo</label>
            <input class="input" type="text" name="modelo" required>

            <label>Código</label>
            <input class="input" type="text" name="codigo" required>

            <button class="btn-primary" style="margin-top:20px;">Salvar</button>

        </form>

    </div>

</div>
