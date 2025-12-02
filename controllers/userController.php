<?php
require_once __DIR__ . "/../config/db.php";

class UserController
{
    private function verificarLogin()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'user') {
            header("Location: index.php?rota=login");
            exit;
        }
    }

    public function home()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $idUser = $_SESSION['usuario']['id'];

        $q1 = $db->prepare("
            SELECT e.*, b.modelo, b.codigo
            FROM emprestimos e
            JOIN bikes b ON b.id = e.bike_id
            WHERE e.usuario_id = ?
            AND e.status = 'ativo'
            LIMIT 1
        ");
        $q1->execute([$idUser]);
        $emprestimoAtivo = $q1->fetch(PDO::FETCH_ASSOC);

        $q2 = $db->query("SELECT * FROM bikes WHERE status = 'disponivel'");
        $bikesLivres = $q2->fetchAll(PDO::FETCH_ASSOC);

        $q3 = $db->prepare("
            SELECT e.*, b.modelo, b.codigo
            FROM emprestimos e
            JOIN bikes b ON b.id = e.bike_id
            WHERE e.usuario_id = ?
            ORDER BY e.data_emprestimo DESC
        ");
        $q3->execute([$idUser]);
        $historico = $q3->fetchAll(PDO::FETCH_ASSOC);

        require __DIR__ . "/../views/user/home.php";
    }
}
