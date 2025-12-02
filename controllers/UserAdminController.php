<?php
require_once __DIR__ . "/../config/db.php";

class UserAdminController
{
    private function verificarLogin()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'admin') {
            header("Location: index.php?rota=login");
            exit;
        }
    }

    public function listar()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $query = $db->query("SELECT id, nome, email, tipo FROM usuarios");
        $usuarios = $query->fetchAll(PDO::FETCH_ASSOC);
        require __DIR__ . "/../views/admin/users.php";
    }

    public function criar()
    {
        $this->verificarLogin();
        require __DIR__ . "/../views/admin/usersCreate.php";
    }

    public function salvar()
    {
        $this->verificarLogin();
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $tipo = $_POST['tipo'];

        $db = DB::connect();
        $query = $db->prepare("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)");
        $query->execute([$nome, $email, $senha, $tipo]);

        header("Location: index.php?rota=admin_users");
        exit;
    }

    public function editar()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $id = $_GET['id'];
        $query = $db->prepare("SELECT * FROM usuarios WHERE id = ?");
        $query->execute([$id]);
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        require __DIR__ . "/../views/admin/usersEdit.php";
    }

    public function atualizar()
    {
        $this->verificarLogin();
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $tipo = $_POST['tipo'];

        $db = DB::connect();

        if (!empty($_POST['senha'])) {
            $senha = $_POST['senha'];
            $query = $db->prepare("UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?");
            $query->execute([$nome, $email, $senha, $tipo, $id]);
        } else {
            $query = $db->prepare("UPDATE usuarios SET nome = ?, email = ?, tipo = ? WHERE id = ?");
            $query->execute([$nome, $email, $tipo, $id]);
        }

        header("Location: index.php?rota=admin_users");
        exit;
    }

    public function excluir()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $id = $_GET['id'];
        $query = $db->prepare("DELETE FROM usuarios WHERE id = ?");
        $query->execute([$id]);
        header("Location: index.php?rota=admin_users");
        exit;
    }
}
