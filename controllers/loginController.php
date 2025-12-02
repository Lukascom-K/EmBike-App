<?php
require_once __DIR__ . "/../config/db.php";

class LoginController
{
    public function index()
    {
        require __DIR__ . "/../views/login.php";
    }

    public function auth()
    {
        if (!isset($_POST['email']) || !isset($_POST['senha'])) {
            die("Requisição inválida.");
        }

        $email = $_POST['email'];
        $senhaDigitada = $_POST['senha'];

        $db = DB::connect();
        $q = $db->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
        $q->execute([$email]);
        $user = $q->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo "<script>alert('Email inválido!');window.location='index.php?rota=login';</script>";
            exit;
        }

        if ($senhaDigitada != $user['senha']) {
            echo "<script>alert('Senha incorreta!');window.location='index.php?rota=login';</script>";
            exit;
        }

        if (session_status() == PHP_SESSION_NONE) session_start();
        $_SESSION['usuario'] = $user;

        if ($user['tipo'] === 'admin') {
            header("Location: index.php?rota=admin_dashboard");
        } else {
            header("Location: index.php?rota=user_home");
        }
        exit;
    }

    public function logout()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        session_destroy();
        header("Location: index.php?rota=login");
        exit;
    }
}
