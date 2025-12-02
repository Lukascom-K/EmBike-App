<?php
require_once __DIR__ . "/../config/db.php";

class AdminController
{
    private function verificarLogin()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'admin') {
            header("Location: index.php?rota=login");
            exit;
        }
    }

    public function dashboard()
    {
        $this->verificarLogin();
        $db = DB::connect();

        $totalBikes = $db->query("SELECT COUNT(*) AS total FROM bikes")->fetch(PDO::FETCH_ASSOC)['total'];
        $emprestimosAtivos = $db->query("SELECT COUNT(*) AS total FROM emprestimos WHERE status = 'ativo'")->fetch(PDO::FETCH_ASSOC)['total'];
        $totalUsuarios = $db->query("SELECT COUNT(*) AS total FROM usuarios WHERE tipo = 'user'")->fetch(PDO::FETCH_ASSOC)['total'];

        require __DIR__ . "/../views/admin/dashboard.php";
    }
}
