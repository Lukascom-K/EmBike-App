<h1>Novo Empréstimo</h1>

<form method="POST" action="index.php?rota=emprestimo_store">

    Usuário:
    <select name="usuario_id" required>
        <option value="">Selecione</option>
        <?php foreach ($usuarios as $u): ?>
            <option value="<?= $u['id'] ?>"><?= $u['nome'] ?> (<?= $u['email'] ?>)</option>
        <?php endforeach; ?>
    </select>
    <br><br>

    Bike:
    <select name="bike_id" required>
        <option value="">Selecione</option>
        <?php foreach ($bikes as $b): ?>
            <option value="<?= $b['id'] ?>"><?= $b['modelo'] ?> - <?= $b['codigo'] ?></option>
        <?php endforeach; ?>
    </select>
    <br><br>

    <button type="submit">Registrar Empréstimo</button>
</form>

<br>
<a href="index.php?rota=admin_emprestimos">Voltar</a>
